import { describe, expect, it } from 'vitest';
import {
    decryptData,
    encryptData,
    hashString,
    validateHash,
} from '../../src/node/cryptography';

describe('cryptography', () => {
    describe('hashString', () => {
        it('should hash a string and return salt, hash, iterations, and keyLen', () => {
            const testString = 'myPassword123';
            const { salt, hash, iterations, keyLen } = hashString(testString);

            expect(salt).toBeTypeOf('string');
            expect(hash).toBeTypeOf('string');
            expect(iterations).toBe(10000); // Default value
            expect(keyLen).toBe(64); // Default value
            expect(salt.length).toBeGreaterThan(0);
            expect(hash.length).toBeGreaterThan(0);
        });

        it('should produce different hashes for different salts with the same password', () => {
            const testString = 'myPassword123';
            const { hash: hash1 } = hashString(testString);
            const { hash: hash2 } = hashString(testString); // Will generate a new salt

            expect(hash1).not.toEqual(hash2);
        });

        it('should produce different hashes for different passwords (each with random salt)', () => {
            const testString1 = 'myPassword123';
            const testString2 = 'myOtherPassword';
            const { hash: hash1 } = hashString(testString1);
            const { hash: hash2 } = hashString(testString2);

            expect(hash1).not.toEqual(hash2);
        });

        it('should allow custom iterations and keyLen', () => {
            const testString = 'myPassword123';
            const customIterations = 50000;
            const customKeyLen = 32;
            const { iterations, keyLen } = hashString(
                testString,
                customIterations,
                customKeyLen
            );

            expect(iterations).toBe(customIterations);
            expect(keyLen).toBe(customKeyLen);
        });
    });

    describe('validateHash', () => {
        it('should validate a correct hash', () => {
            const testString = 'myPassword123';
            const { salt, hash, iterations, keyLen } = hashString(testString);

            const isValid = validateHash(
                testString,
                hash,
                salt,
                iterations,
                keyLen,
                'sha512'
            );
            expect(isValid).toBe(true);
        });

        it('should invalidate an incorrect password', () => {
            const testString = 'myPassword123';
            const wrongString = 'wrongPassword';
            const { salt, hash, iterations, keyLen } = hashString(testString);

            const isValid = validateHash(
                wrongString,
                hash,
                salt,
                iterations,
                keyLen,
                'sha512'
            );
            expect(isValid).toBe(false);
        });

        it('should invalidate a tampered hash', () => {
            const testString = 'myPassword123';
            const { salt, hash, iterations, keyLen } = hashString(testString);
            const tamperedHash = `a${hash.slice(1)}`;

            const isValid = validateHash(
                testString,
                tamperedHash,
                salt,
                iterations,
                keyLen,
                'sha512'
            );
            expect(isValid).toBe(false);
        });

        it('should invalidate a tampered salt', () => {
            const testString = 'myPassword123';
            const { hash, iterations, keyLen } = hashString(testString);
            const tamperedSalt = `a${hashString(testString).salt.slice(1)}`; // Tamper with the salt

            const isValid = validateHash(
                testString,
                hash,
                tamperedSalt,
                iterations,
                keyLen,
                'sha512'
            );
            expect(isValid).toBe(false);
        });
    });

    describe('encryptData and decryptData', () => {
        const secretKey = 'this-is-a-very-secret-key-that-is-long-enough'; // Must be long enough for deriveKey

        it('should encrypt and decrypt a simple string successfully', async () => {
            const originalText = 'Hello, World!';
            const encrypted = await encryptData(originalText, secretKey);
            const decrypted = await decryptData(encrypted, secretKey);

            expect(encrypted).not.toEqual(originalText);
            expect(decrypted).toBe(originalText);
        });

        it('should encrypt and decrypt a longer string successfully', async () => {
            const originalText
                = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
            const encrypted = await encryptData(originalText, secretKey);
            const decrypted = await decryptData(encrypted, secretKey);

            expect(encrypted).not.toEqual(originalText);
            expect(decrypted).toBe(originalText);
        });

        it('should fail to decrypt with an incorrect secret key', async () => {
            const originalText = 'Secret message';
            const encrypted = await encryptData(originalText, secretKey);
            const wrongSecretKey = 'this-is-an-incorrect-secret-key';

            await expect(
                decryptData(encrypted, wrongSecretKey)
            ).rejects.toThrow();
        });

        it('should fail to decrypt tampered encrypted data', async () => {
            const originalText = 'Another secret';
            const encrypted = await encryptData(originalText, secretKey);

            // Tamper with the encrypted data by changing one character
            const tamperedEncrypted = `${encrypted.slice(0, -5)}AAAAA`;

            await expect(
                decryptData(tamperedEncrypted, secretKey)
            ).rejects.toThrow();
        });
    });
});
