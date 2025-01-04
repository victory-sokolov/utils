import { existsSync, mkdirSync } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

/**
 * Read directory recursively to get all files in the directory
 * @param dir Directory to files
 * @param fileList List of files
 * @returns List of the files from directory
 */
export const readDirRecursive = async (dir: string, fileList: string[] = []) => {
    const exclude = ['node_modules', '.venv', '.env'];
    const files = await readdir(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const fileStat = await stat(filePath);
        if (fileStat.isDirectory() && !exclude.includes(file)) {
            fileList = await readDirRecursive(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    }
    return fileList;
};

/**
 * Check if specified file exists
 * @param path File path
 * @returns True if file exists otherwise false
 */
export const isFileExists = async (path: string) => {
    try {
        await stat(path);
        return true;
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        } else {
            throw error;
        }
    }
};

/**
 * Create directory if not exists
 * @param dir
 */
export const createDirIfNotExists = (dir: string) => {
    return !existsSync(dir) ? mkdirSync(dir) : undefined;
};
