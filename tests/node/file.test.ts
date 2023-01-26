import path from 'path';
import { readdir, stat } from 'fs/promises';
import { readdirRecursive } from '../../src/node';
import { jest } from '@jest/globals';

jest.mock('fs/promises', () => {
    return {
        readdir: jest.fn().mockReturnValueOnce(['file1.txt', 'file2.txt', 'dir']),
        stat: jest.fn(),
    };
});

describe('readdirRecursive', () => {
    it.skip('should return a list of files in a directory', async () => {
        const dir = './test';

        // (readdir as jest.MockedFunction<any>).mockReturnValueOnce(['file1', 'file2', 'dir']);
        const mockedExistsSync = <jest.Mock<typeof stat>>stat;
        mockedExistsSync.mockImplementation((filePath: string) => {
            if (filePath.endsWith('dir')) {
                return {
                    isDirectory: () => true,
                };
            }
            return {
                isDirectory: () => false,
            };
        });

        const result = await readdirRecursive(dir);
        expect(result).toEqual([path.join(dir, 'file1'), path.join(dir, 'file2'), path.join(dir, 'dir')]);
    });
});
