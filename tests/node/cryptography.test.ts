import { describe, expect, it } from 'vitest';
import {
    decryptData,
    encryptData,
    hashString,
    nanoid,
    validateHash,
} from '../../src/node/cryptography';

describe('cryptography', () => {
    describe('hashString', () => {
        it('should hash a string and return salt, hash, iterations, and keyLen', () => {
            const testString = 'myPassword123';
            const { salt, hash, iterations, keyLen, digest } = hashString({ str: testString });

            expect(salt).toBeTypeOf('string');
            expect(hash).toBeTypeOf('string');
            expect(digest).toBe('sha512');
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
            const { salt, hash, iterations, keyLen, digest } = hashString({ str: testString });

            const isValid = validateHash({
                digest,
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
            const { salt, hash, iterations, keyLen, digest } = hashString({ str: testString });

            const isValid = validateHash({
                digest,
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
            const { salt, hash, iterations, keyLen, digest } = hashString({ str: testString });
            // Use a character different from the first one to ensure tampering
            const firstChar = hash[0]!;
            const tamperChar = firstChar === 'a' ? 'b' : 'a';
            const tamperedHash = `${tamperChar}${hash.slice(1)}`;

            const isValid = validateHash({
                digest,
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
            const { hash, salt, iterations, keyLen, digest } = hashString({ str: testString });
            // Tamper with the original salt that was used to create the hash
            const firstChar = salt[0]!;
            const tamperChar = firstChar === 'a' ? 'b' : 'a';
            const tamperedSalt = `${tamperChar}${salt.slice(1)}`;

            const isValid = validateHash({
                digest,
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

        it('should reject Promise for encryptData with short secret key', () => {
            return expect(encryptData('test', 'short')).rejects.toThrow(
                'secretKey must be at least 32 characters long',
            );
        });

        it('should reject Promise for decryptData with short secret key', () => {
            // Use a base64 string long enough to pass the length check (SALT_LENGTH + IV_LENGTH + some ciphertext)
            const fakeEncrypted = Buffer.alloc(50, 'a').toString('base64');
            return expect(decryptData(fakeEncrypted, 'short')).rejects.toThrow(
                'secretKey must be at least 32 characters long',
            );
        });

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

    describe('nanoid', () => {
        it('should generate a string of default length 21', () => {
            const id = nanoid();
            expect(id).toBeTypeOf('string');
            expect(id.length).toBe(21);
        });

        it('should generate a string of custom length', () => {
            const customLength = 10;
            const id = nanoid(customLength);
            expect(id.length).toBe(customLength);
        });

        it('should generate unique IDs', () => {
            const id1 = nanoid();
            const id2 = nanoid();
            expect(id1).not.toStrictEqual(id2);
        });

        it('should only contain characters from the allowed alphabet', () => {
            const alphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzict';
            const id = nanoid(100);
            for (const char of id) {
                expect(alphabet.includes(char)).toBe(true);
            }
        });

        it('should return empty string for size 0', () => {
            const id = nanoid(0);
            expect(id).toBe('');
        });
    });
});
