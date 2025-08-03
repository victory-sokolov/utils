/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        globals: true,
        isolate: false,
        environment: 'jsdom',
        threads: 4,
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
            ],
        },
        resolve: {
            conditions: ['source'],
        },
    },
});
