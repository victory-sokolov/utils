import { describe, expect, it } from 'vitest';
import { bytesToSize } from '../src/base';

describe('bytesToSize', () => {
    it('should return "0" when given 0 bytes', () => {
        expect(bytesToSize(0)).toBe('0');
    });

    it('should correctly convert bytes to kilobytes', () => {
        expect(bytesToSize(1024)).toBe('1 KB');
        expect(bytesToSize(2048)).toBe('2 KB');
        expect(bytesToSize(3072)).toBe('3 KB');
        expect(bytesToSize(1536)).toBe('2 KB');
    });

    it('should correctly convert bytes to megabytes', () => {
        expect(bytesToSize(1048576)).toBe('1 MB');
        expect(bytesToSize(2097152)).toBe('2 MB');
        expect(bytesToSize(3145728)).toBe('3 MB');
        expect(bytesToSize(1572864)).toBe('2 MB');
    });

    it('should correctly convert bytes to gigabytes', () => {
        expect(bytesToSize(1073741824)).toBe('1 GB');
        expect(bytesToSize(2147483648)).toBe('2 GB');
        expect(bytesToSize(3221225472)).toBe('3 GB');
        expect(bytesToSize(1610612736)).toBe('2 GB');
    });

    it('should correctly convert bytes to terabytes', () => {
        expect(bytesToSize(1099511627776)).toBe('1 TB');
        expect(bytesToSize(2199023255552)).toBe('2 TB');
        expect(bytesToSize(3298534883328)).toBe('3 TB');
        expect(bytesToSize(1649267441664)).toBe('2 TB');
    });
});
