/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        coverage: {
            reporter: ['text', 'html'],
            exclude: [
                'node_modules/',
                'eslint.config.js',
                'vite.config.ts',
                'rollup.config.js',
                'release.config.cjs',
                './dist',
                './docs',
                './src/index.ts',
                './src/node/index.ts',
            ],
        },
        environment: 'jsdom',
        globals: true,
        isolate: false,
        resolve: {
            conditions: ['source'],
        },
        threads: 4,
    },
});
