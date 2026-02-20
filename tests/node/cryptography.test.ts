import { describe, expect, it } from 'vitest';
import { decryptData, encryptData, hashString, validateHash } from '../../src/node/cryptography';

describe('cryptography', () => {
    describe('hashString', () => {
        it('should hash a string and return salt, hash, iterations, and keyLen', () => {
            const testString = 'myPassword123';
            const { salt, hash, iterations, keyLen } = hashString({ str: testString });

            expect(salt).toBeTypeOf('string');
            expect(hash).toBeTypeOf('string');
            expect(iterations).toBe(210_000);
            expect(keyLen).toBe(64);
            expect(salt.length).toBeGreaterThan(0);
            expect(hash.length).toBeGreaterThan(0);
        });

        it('should produce different hashes for different salts with the same password', () => {
            const testString = 'myPassword123';
            const { hash: hash1 } = hashString({ str: testString });
            const { hash: hash2 } = hashString({ str: testString });

            expect(hash1).not.toStrictEqual(hash2);
        });

        it('should produce different hashes for different passwords (each with random salt)', () => {
            const testString1 = 'myPassword123';
            const testString2 = 'myOtherPassword';
            const { hash: hash1 } = hashString({ str: testString1 });
            const { hash: hash2 } = hashString({ str: testString2 });

            expect(hash1).not.toStrictEqual(hash2);
        });

        it('should allow custom iterations and keyLen', () => {
            const testString = 'myPassword123';
            const customIterations = 50_000;
            const customKeyLen = 32;
            const { iterations, keyLen } = hashString({
                iterations: customIterations,
                keyLen: customKeyLen,
                str: testString,
            });

            expect(iterations).toBe(customIterations);
            expect(keyLen).toBe(customKeyLen);
        });
    });

    describe('validateHash', () => {
        it('should validate a correct hash', () => {
            const testString = 'myPassword123';
            const { salt, hash, iterations, keyLen } = hashString({ str: testString });

            const isValid = validateHash({
                digest: 'sha512',
                iterations,
                keyLen,
                password: testString,
                savedHash: hash,
                savedSalt: salt,
            });
            expect(isValid).toBe(true);
        });

        it('should invalidate an incorrect password', () => {
            const testString = 'myPassword123';
            const wrongString = 'wrongPassword';
            const { salt, hash, iterations, keyLen } = hashString({ str: testString });

            const isValid = validateHash({
                digest: 'sha512',
                iterations,
                keyLen,
                password: wrongString,
                savedHash: hash,
                savedSalt: salt,
            });
            expect(isValid).toBe(false);
        });

        it('should invalidate a tampered hash', () => {
            const testString = 'myPassword123';
            const { salt, hash, iterations, keyLen } = hashString({ str: testString });
            // Use a character different from the first one to ensure tampering
            const firstChar = hash[0]!;
            const tamperChar = firstChar === 'a' ? 'b' : 'a';
            const tamperedHash = `${tamperChar}${hash.slice(1)}`;

            const isValid = validateHash({
                digest: 'sha512',
                iterations,
                keyLen,
                password: testString,
                savedHash: tamperedHash,
                savedSalt: salt,
            });
            expect(isValid).toBe(false);
        });

        it('should invalidate a tampered salt', () => {
            const testString = 'myPassword123';
            const { hash, iterations, keyLen } = hashString({ str: testString });
            const { salt: otherSalt } = hashString({ str: testString });
            const tamperedSalt = `a${otherSalt.slice(1)}`; // Tamper with the salt

            const isValid = validateHash({
                digest: 'sha512',
                iterations,
                keyLen,
                password: testString,
                savedHash: hash,
                savedSalt: tamperedSalt,
            });
            expect(isValid).toBe(false);
        });
    });

    describe('encryptData and decryptData', () => {
        const secretKey = 'this-is-a-very-secret-key-that-is-long-enough';

        const testRoundTrip = (originalText: string) => {
            return encryptData(originalText, secretKey).then(encrypted => {
                return decryptData(encrypted, secretKey).then(decrypted => {
                    expect(encrypted).not.toStrictEqual(originalText);
                    expect(decrypted).toBe(originalText);
                });
            });
        };

        it('should encrypt and decrypt a simple string successfully', () => {
            return testRoundTrip('Hello, World!');
        });

        it('should encrypt and decrypt a longer string successfully', () => {
            return testRoundTrip(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            );
        });

        it('should fail to decrypt with an incorrect secret key', () => {
            const originalText = 'Secret message';
            return encryptData(originalText, secretKey).then(encrypted => {
                const wrongSecretKey = 'this-is-an-incorrect-secret-key!';
                return expect(decryptData(encrypted, wrongSecretKey)).rejects.toThrow();
            });
        });

        it('should fail to decrypt tampered encrypted data', () => {
            const originalText = 'Another secret';
            return encryptData(originalText, secretKey).then(encrypted => {
                const tamperedEncrypted = `${encrypted.slice(0, -5)}AAAAA`;
                return expect(decryptData(tamperedEncrypted, secretKey)).rejects.toThrow();
            });
        });
    });
});
