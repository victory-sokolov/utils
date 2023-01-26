import path from 'path';
import { stat, readdir } from 'node:fs/promises';

export const readdirRecursive = async (dir, fileList: string[] = []) => {
    const exclude = ['node_modules', '.venv', '.env'];
    const files = await readdir(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const fileStat = await stat(filePath);
        if (fileStat.isDirectory() && !exclude.includes(file)) {
            fileList = await readdirRecursive(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    }
    return fileList;
};
