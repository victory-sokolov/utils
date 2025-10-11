// @ts-nocheck

import { pbkdf2Sync } from 'node:crypto';
import { describe, expect, it, vi } from 'vitest';
import { hashString, validateHash } from '../../src/node/cryptography';

vi.mock('node:crypto', async (importOriginal) => {
    const actual = await importOriginal<typeof import('node:crypto')>();
    return {
        ...actual,
        randomBytes: vi.fn(() => 'mocked-salt'),
        pbkdf2Sync: vi.fn(() => 'mocked-hash'),
    };
});

describe('validate hashString', () => {
    it('should generate a hash with the expected properties', ({ skip }) => {
        // Mock randomBytes and pbkdf2Sync functions
        skip();
        const result = hashString('password', 1000, 32, 'sha256');

        expect(result).toEqual({
            salt: 'mocked-salt',
            hash: 'mocked-hash',
            iterations: 1000,
            keyLen: 32,
        });
    });
});

describe('validateHash', () => {
    it('should return true for a valid hash', ({ skip }) => {
        skip();
        const mockPbkdf2Sync = vi
            .spyOn(pbkdf2Sync, 'toString')
            .mockReturnValue('mocked-hash');
        const result = validateHash(
            'password',
            'mocked-hash',
            'salt',
            1000,
            32,
            'sha256'
        );

        expect(result).toBe(true);
        expect(mockPbkdf2Sync).toHaveBeenCalledWith(
            'password',
            'salt',
            1000,
            32,
            'sha256'
        );

        mockPbkdf2Sync.mockRestore();
    });

    it('should return false for an invalid hash', ({ skip }) => {
        skip();
        const mockPbkdf2Sync = vi
            .spyOn(pbkdf2Sync, 'toString')
            .mockReturnValue('different-hash');

        const result = validateHash(
            'password',
            'mocked-hash',
            'salt',
            1000,
            32,
            'sha256'
        );
        expect(result).toBe(false);
        expect(mockPbkdf2Sync).toHaveBeenCalledWith(
            'password',
            'salt',
            1000,
            32,
            'sha256'
        );

        mockPbkdf2Sync.mockRestore();
    });
});
