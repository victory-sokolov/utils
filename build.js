import esbuild from 'esbuild';
import npmDts from 'npm-dts';

const Generator = npmDts.Generator;

new Generator({
  entry: 'src/index.ts',
  output: './dist/index.d.ts',
}).generate();

const sharedConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
};

const esbuildConfig = [
    {
        ...sharedConfig,
        platform: 'node', // for CJS
        outfile: "dist/index.js",
    },
    {
        ...sharedConfig,
        outfile: "dist/index.esm.js",
        platform: 'neutral', // for ESM
        format: "esm",
    }
]

async function build() {
    for (const config of esbuildConfig) {
        try {
            await esbuild.build(config);
        } catch (error) {
            console.error(error);
        }
    }
}

build();
