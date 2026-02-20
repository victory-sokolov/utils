import { existsSync, mkdirSync } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

/**
 * Read directory recursively to get all files in the directory
 * @param dir Directory to files
 * @param initialList List of files
 * @returns List of the files from directory
 */
export const readDirRecursive = async (dir: string, initialList: string[] = []): Promise<string[]> => {
    const exclude = new Set(['node_modules', '.venv', '.env']);
    const files = await readdir(dir);
    let fileList = initialList;
    for (const file of files) {
        const filePath = path.join(dir, file);
        const fileStat = await stat(filePath);
        if (fileStat.isDirectory() && !exclude.has(file)) {
            fileList = await readDirRecursive(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    }
    return fileList;
};

/**
 * Check if specified file exists
 * @param filePath File path
 * @returns True if file exists otherwise false
 */
export const isFileExists = async (filePath: string): Promise<boolean> => {
    try {
        await stat(filePath);
        return true;
    } catch {
        return false;
    }
};

/**
 * Create directory if not exists
 * @param dir
 */
export const createDirIfNotExists = (dir: string): void => {
    if (!existsSync(dir)) {
        mkdirSync(dir);
    }
};
