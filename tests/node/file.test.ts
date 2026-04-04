import { describe, expect, it } from 'vitest';
import * as fs from 'node:fs/promises';
import * as fsSync from 'node:fs';
import { createDirIfNotExists, isFileExists, readDirRecursive } from '../../src/node/file';
import path from 'node:path';
import { tmpdir } from 'node:os';

describe('readDirRecursive', () => {
    it('should read files from directory recursively', async () => {
        const testDir = path.join(tmpdir(), `test-utils-${Date.now()}`);
        await fs.mkdir(testDir, { recursive: true });
        await fs.writeFile(path.join(testDir, 'file1.txt'), 'content');
        await fs.mkdir(path.join(testDir, 'subdir'), { recursive: true });
        await fs.writeFile(path.join(testDir, 'subdir', 'file2.txt'), 'content');

        const files = await readDirRecursive(testDir);
        expect(files.length).toBe(2);
        expect(files.some(f => f.endsWith('file1.txt'))).toBe(true);
        expect(files.some(f => f.endsWith('file2.txt'))).toBe(true);

        await fs.rm(testDir, { recursive: true, force: true });
    });

    it('should handle nested subdirectories', async () => {
        const testDir = path.join(tmpdir(), `test-utils-${Date.now()}`);
        await fs.mkdir(path.join(testDir, 'a', 'b', 'c'), { recursive: true });
        await fs.writeFile(path.join(testDir, 'a', 'b', 'c', 'deep.txt'), 'content');

        const files = await readDirRecursive(testDir);
        expect(files.some(f => f.endsWith('deep.txt'))).toBe(true);

        await fs.rm(testDir, { recursive: true, force: true });
    });

    it('should handle non-existent directory gracefully', async () => {
        await expect(readDirRecursive('/non/existent/path')).rejects.toThrow('ENOENT');
    });
});

describe('isFileExists', () => {
    it('should return true for existing file', async () => {
        const testDir = path.join(tmpdir(), `test-utils-${Date.now()}`);
        await fs.mkdir(testDir, { recursive: true });
        const testFile = path.join(testDir, 'exists.txt');
        await fs.writeFile(testFile, 'content');

        const exists = await isFileExists(testFile);
        expect(exists).toBe(true);

        await fs.rm(testDir, { recursive: true, force: true });
    });

    it('should return false for non-existent file', async () => {
        const exists = await isFileExists('/non/existent/path/file.txt');
        expect(exists).toBe(false);
    });

    it('should return true for directory path', async () => {
        const testDir = path.join(tmpdir(), `test-utils-${Date.now()}`);
        await fs.mkdir(testDir, { recursive: true });

        const exists = await isFileExists(testDir);
        expect(exists).toBe(true);

        await fs.rm(testDir, { recursive: true, force: true });
    });
});

describe('createDirIfNotExists', () => {
    it('should create directory if it does not exist', () => {
        const testDir = path.join(tmpdir(), `test-utils-${Date.now()}`);

        expect(fsSync.existsSync(testDir)).toBe(false);
        createDirIfNotExists(testDir);
        expect(fsSync.existsSync(testDir)).toBe(true);

        fsSync.rmSync(testDir, { recursive: true, force: true });
    });

    it('should not throw if directory already exists', () => {
        const testDir = path.join(tmpdir(), `test-utils-${Date.now()}`);
        fsSync.mkdirSync(testDir, { recursive: true });

        expect(() => createDirIfNotExists(testDir)).not.toThrow();

        fsSync.rmSync(testDir, { recursive: true, force: true });
    });
});
