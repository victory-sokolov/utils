import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import filesize from 'rollup-plugin-filesize';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import path from 'node:path';

const entries = ['src/index.ts'];

const plugins = [
    alias({
        entries: [
            { find: /^node:(.+)$/, replacement: '$1' },
            { find: /^@\/(.+)\.js$/, replacement: path.resolve('src/$1.ts') },
        ],
    }),
    resolve({
        preferBuiltins: true,
    }),
    json(),
    filesize(),
    commonjs(),
    esbuild({
        minify: true,
        target: 'node16',
    }),
];

export default [
    ...entries.map((input) => ({
        external: [],
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
        plugins,
    })),
    ...entries.map((input) => ({
        external: [],
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
        plugins: [dts({ respectExternal: true })],
    })),
    {
        external: ['fs', 'path'],
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
        plugins,
    },
];
