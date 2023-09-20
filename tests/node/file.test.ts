import { vi } from 'vitest';

vi.mock('fs/promises', () => {
    return {
        readdir: vi.fn().mockReturnValueOnce(['file1.txt', 'file2.txt', 'dir']),
        stat: vi.fn(),
    };
});
