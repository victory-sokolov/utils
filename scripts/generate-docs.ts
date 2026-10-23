import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

type DocsMode = 'all' | 'html' | 'markdown' | 'node-markdown';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const typedocBin = path.resolve(rootDir, 'node_modules/typedoc/bin/typedoc');
const mode = (process.argv[2] ?? 'all') as DocsMode;

const configByMode: Record<Exclude<DocsMode, 'all'>, string> = {
    html: 'typedoc.json',
    markdown: 'typedoc.markdown.json',
    'node-markdown': 'typedoc.node.markdown.json',
};

const runTypedoc = (selectedMode: Exclude<DocsMode, 'all'>): void => {
    const configPath = path.resolve(rootDir, configByMode[selectedMode]);
    // Keep the CLI builds sequential and preserve their exit behavior.
    // oxlint-disable-next-line node/no-sync
    const result = spawnSync(process.execPath, [typedocBin, '--options', configPath], {
        cwd: rootDir,
        stdio: 'inherit',
    });

    if (result.status !== 0) {
        throw new Error(`Docs build failed in ${selectedMode} mode`);
    }
};

const run = (): void => {
    if (mode === 'all') {
        runTypedoc('html');
        runTypedoc('markdown');
        runTypedoc('node-markdown');
        return;
    }

    runTypedoc(mode);
};

const printError = (error: unknown): void => {
    if (error instanceof Error) {
        process.stderr.write(`${error.message}\n`);
        return;
    }

    process.stderr.write(`${String(error)}\n`);
};

try {
    run();
} catch (error) {
    printError(error);
    process.exitCode = 1;
}
