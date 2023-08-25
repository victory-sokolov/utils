import { randomBytes, pbkdf2Sync } from 'crypto';
import { hashString, validateHash } from '../../src';

describe('cryptography', () => {

    describe('hashString', () => {
    it('should generate a hash with the expected properties', () => {
        // Mock randomBytes and pbkdf2Sync functions
        const mockRandomBytes = jest.spyOn(randomBytes, 'toString').mockReturnValue('mocked-salt');
        const mockPbkdf2Sync = jest.spyOn(pbkdf2Sync, 'toString').mockReturnValue('mocked-hash');
        const result = hashString('password', 1000, 32, 'sha256');

        expect(result).toEqual({
            salt: 'mocked-salt',
            hash: 'mocked-hash',
            iterations: 1000,
            keyLen: 32,
        });

        expect(mockRandomBytes).toHaveBeenCalledWith(128, 'base64');
        expect(mockPbkdf2Sync).toHaveBeenCalledWith(
            'password',
            'mocked-salt',
            1000,
            32,
            'sha256'
        );

        mockRandomBytes.mockRestore();
        mockPbkdf2Sync.mockRestore();
    });
});

    describe('validateHash', () => {
        it('should return true for a valid hash', () => {
            const mockPbkdf2Sync = jest.spyOn(pbkdf2Sync, 'toString').mockReturnValue('mocked-hash');
            const result = validateHash('password', 'mocked-hash', 'salt', 1000, 32, 'sha256');

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

        it('should return false for an invalid hash', () => {
            const mockPbkdf2Sync = jest.spyOn(pbkdf2Sync, 'toString').mockReturnValue('different-hash');

            const result = validateHash('password', 'mocked-hash', 'salt', 1000, 32, 'sha256');
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

});
