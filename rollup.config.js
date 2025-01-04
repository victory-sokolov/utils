import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const entries = ['src/index.ts'];

const plugins = [
    alias({
        entries: [{ find: /^node:(.+)$/, replacement: '$1' }],
    }),
    resolve({
        preferBuiltins: true,
    }),
    json(),
    commonjs(),
    esbuild({
        target: 'node16',
        minify: true,
    }),
];

export default [
    ...entries.map((input) => ({
        input,
        output: [
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.mjs'),
                format: 'esm',
                sourcemap: true,
            },
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.cjs'),
                format: 'cjs',
                sourcemap: true,
            },
        ],
        external: [],
        plugins,
    })),
    ...entries.map((input) => ({
        input,
        output: [
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.d.mts'),
                format: 'esm',
            },
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.d.ts'),
                format: 'esm',
            },
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.d.cts'),
                format: 'cjs',
            },
        ],
        external: [],
        plugins: [dts({ respectExternal: true })],
    })),
    {
        input: 'src/node/index.ts',
        output: [
            {
                file: 'dist/node/index.cjs',
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: 'dist/node/index.esm',
                format: 'esm',
                sourcemap: true,
            },
        ],
        external: ['fs', 'path'],
        plugins,
    },
];
