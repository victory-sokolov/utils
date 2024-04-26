import { pbkdf2Sync, randomBytes } from 'node:crypto';
import { describe, expect, it, vi } from 'vitest';
import { hashString, validateHash } from '../../src';

describe('validate hashString', () => {
    it('should generate a hash with the expected properties', ({ skip }) => {
        // Mock randomBytes and pbkdf2Sync functions
        skip();
        const mockRandomBytes = vi.spyOn(randomBytes, 'toString').mockReturnValue('mocked-salt');
        const mockPbkdf2Sync = vi.spyOn(pbkdf2Sync, 'toString').mockReturnValue('mocked-hash');
        const result = hashString('password', 1000, 32, 'sha256');

        expect(result).toEqual({
            salt: 'mocked-salt',
            hash: 'mocked-hash',
            iterations: 1000,
            keyLen: 32,
        });

        expect(mockRandomBytes).toHaveBeenCalledWith(128, 'base64');
        expect(mockPbkdf2Sync).toHaveBeenCalledWith('password', 'mocked-salt', 1000, 32, 'sha256');

        mockRandomBytes.mockRestore();
        mockPbkdf2Sync.mockRestore();
    });
});

describe('validateHash', () => {
    it('should return true for a valid hash', ({ skip }) => {
        skip();
        const mockPbkdf2Sync = vi.spyOn(pbkdf2Sync, 'toString').mockReturnValue('mocked-hash');
        const result = validateHash('password', 'mocked-hash', 'salt', 1000, 32, 'sha256');

        expect(result).toBe(true);
        expect(mockPbkdf2Sync).toHaveBeenCalledWith('password', 'salt', 1000, 32, 'sha256');

        mockPbkdf2Sync.mockRestore();
    });

    it('should return false for an invalid hash', ({ skip }) => {
        skip();
        const mockPbkdf2Sync = vi.spyOn(pbkdf2Sync, 'toString').mockReturnValue('different-hash');

        const result = validateHash('password', 'mocked-hash', 'salt', 1000, 32, 'sha256');
        expect(result).toBe(false);
        expect(mockPbkdf2Sync).toHaveBeenCalledWith('password', 'salt', 1000, 32, 'sha256');

        mockPbkdf2Sync.mockRestore();
    });
});
