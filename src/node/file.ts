import { existsSync, mkdirSync } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

/**
 * Read directory recursively to get all files in the directory
 * @param dir Directory to files
 * @param initialList List of files
 * @returns List of the files from directory
 */
export const readDirRecursive = (dir: string, initialList: string[] = []): Promise<string[]> => {
    const exclude = new Set(['node_modules', '.venv', '.env']);

    return readdir(dir).then(files => {
        const filePaths = files.map(file => path.join(dir, file));

        return Promise.all(
            filePaths.map(filePath =>
                stat(filePath).then(fileStat => {
                    const fileName = path.basename(filePath);
                    if (fileStat.isDirectory() && !exclude.has(fileName)) {
                        return readDirRecursive(filePath, []);
                    }
                    return [filePath];
                }),
            ),
        ).then(results => {
            const allFiles = results.flat();
            return [...initialList, ...allFiles];
        });
    });
};

/**
 * Check if specified file exists
 * @param filePath File path
 * @returns True if file exists otherwise false
 */
export const isFileExists = (filePath: string): Promise<boolean> =>
    stat(filePath)
        .then(() => true)
        .catch(() => false);

/**
 * Create directory if not exists
 * @param dir
 */
export const createDirIfNotExists = (dir: string): void => {
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
};
