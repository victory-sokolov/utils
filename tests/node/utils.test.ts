import { describe, expect, it } from 'vitest';
import { getCmdArgs } from '../../src/node/utils';

describe('getCmdArgs', () => {
    it('should return command line arguments excluding node and script', () => {
        const originalArgv = process.argv;
        Object.defineProperty(process, 'argv', {
            value: ['node', 'script.js', '--foo', 'bar', '--baz'],
            writable: true,
        });
        expect(getCmdArgs()).toStrictEqual(['--foo', 'bar', '--baz']);
        Object.defineProperty(process, 'argv', { value: originalArgv, writable: true });
    });

    it('should return empty array when no arguments provided', () => {
        const originalArgv = process.argv;
        Object.defineProperty(process, 'argv', {
            value: ['node', 'script.js'],
            writable: true,
        });
        expect(getCmdArgs()).toStrictEqual([]);
        Object.defineProperty(process, 'argv', { value: originalArgv, writable: true });
    });

    it('should return arguments with equal signs', () => {
        const originalArgv = process.argv;
        Object.defineProperty(process, 'argv', {
            value: ['node', 'script.js', '--name=John'],
            writable: true,
        });
        expect(getCmdArgs()).toStrictEqual(['--name=John']);
        Object.defineProperty(process, 'argv', { value: originalArgv, writable: true });
    });
});
