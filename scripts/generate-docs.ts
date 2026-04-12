/* eslint-disable sort-imports */
import { dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

type DocsMode = 'all' | 'html' | 'markdown' | 'node-markdown';
type ProjectReflection = unknown;

interface TypeDocApplication {
    convert(): Promise<ProjectReflection | undefined>;
    generateDocs(project: ProjectReflection, out?: string): Promise<void>;
    generateOutputs(project: ProjectReflection): Promise<void>;
}

interface TypeDocModule {
    Application: {
        bootstrapWithPlugins(config: TypedocConfig): Promise<TypeDocApplication>;
    };
}

const { Application } = (await import(new URL('../node_modules/typedoc/dist/index.js', import.meta.url).href)) as TypeDocModule;

interface TypedocConfig {
    entryPoints?: string[];
    out?: string;
    readme?: string;
    tsconfig?: string;
    [key: string]: unknown;
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(scriptDir, '..');

const mode = (process.argv[2] ?? 'all') as DocsMode;

const normalizeEntryPoints = (config: TypedocConfig): void => {
    if (Array.isArray(config.entryPoints)) {
        config.entryPoints = config.entryPoints.map(entryPoint => resolve(rootDir, entryPoint));
    }
};

const normalizeOut = (config: TypedocConfig): void => {
    if (typeof config.out === 'string' && !config.out.startsWith('/')) {
        config.out = resolve(rootDir, config.out);
    }
};

const normalizeReadme = (config: TypedocConfig): void => {
    if (typeof config.readme === 'string' && config.readme !== 'none' && !config.readme.startsWith('/')) {
        config.readme = resolve(rootDir, config.readme);
    }
};

const normalizeTsconfig = (config: TypedocConfig): void => {
    if (typeof config.tsconfig === 'string') {
        config.tsconfig = resolve(rootDir, config.tsconfig);
        return;
    }

    config.tsconfig = resolve(rootDir, 'tsconfig.json');
};

const normalizeConfig = (config: TypedocConfig): TypedocConfig => {
    normalizeEntryPoints(config);
    normalizeOut(config);
    normalizeReadme(config);
    normalizeTsconfig(config);
    return config;
};

const loadConfig = (relativePath: string): Promise<TypedocConfig> => {
    const absolutePath = resolve(rootDir, relativePath);
    return readFile(absolutePath, 'utf8').then(raw => normalizeConfig(JSON.parse(raw) as TypedocConfig));
};

const buildHtml = (app: TypeDocApplication, project: ProjectReflection, out?: string): Promise<void> => app.generateDocs(project, out);

const buildMarkdown = (app: TypeDocApplication, project: ProjectReflection): Promise<void> => app.generateOutputs(project);

const build = (configPath: string, outputMode: 'html' | 'markdown'): Promise<void> =>
    loadConfig(configPath)
        .then(config => Application.bootstrapWithPlugins(config).then(app => ({ app, config })))
        .then(({ app, config }) => app.convert().then(project => ({ app, config, project })))
        .then(({ app, config, project }) => {
            if (!project) {
                throw new Error(`TypeDoc failed to convert ${configPath}`);
            }

            if (outputMode === 'html') {
                return buildHtml(app, project, config.out);
            }

            return buildMarkdown(app, project);
        });

const runMode = (selectedMode: Exclude<DocsMode, 'all'>): Promise<void> => {
    if (selectedMode === 'html') {
        return build('typedoc.json', 'html');
    }

    if (selectedMode === 'markdown') {
        return build('typedoc.markdown.json', 'markdown');
    }

    if (selectedMode === 'node-markdown') {
        return build('typedoc.node.markdown.json', 'markdown');
    }

    throw new Error(`Unknown documentation mode: ${selectedMode}`);
};

const runAllModes = (): Promise<void> => {
    const scriptPath = fileURLToPath(import.meta.url);
    const childModes = ['html', 'markdown', 'node-markdown'] as const;
    let chain = Promise.resolve();

    for (const childMode of childModes) {
        chain = chain.then(() => {
            const result = spawnSync(process.execPath, [scriptPath, childMode], {
                cwd: rootDir,
                stdio: 'inherit',
            });

            if (result.status !== 0) {
                throw new Error(`Docs build failed in ${childMode} mode`);
            }
        });
    }

    return chain;
};

const run = (): Promise<void> => {
    if (mode === 'all') {
        return runAllModes();
    }

    return runMode(mode);
};

const printError = (error: unknown): void => {
    if (error instanceof Error) {
        process.stderr.write(`${error.message}\n`);
        return;
    }

    process.stderr.write(`${String(error)}\n`);
};

try {
    await run();
} catch (error) {
    printError(error);
    process.exitCode = 1;
}
