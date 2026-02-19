import { describe, expect, it } from 'vitest';
import { hashString, validateHash } from '../../src/node/cryptography';

describe('hashString and validateHash', () => {
    it('should hash a string and validate it', () => {
        const password = 'testPassword123';
        const { hash, salt, iterations, keyLen } = hashString({ str: password });

        expect(hash).toBeTypeOf('string');
        expect(salt).toBeTypeOf('string');
        expect(iterations).toBe(10_000);
        expect(keyLen).toBe(64);

        const isValid = validateHash({
            digest: 'sha512',
            iterations,
            keyLen,
            password,
            savedHash: hash,
            savedSalt: salt,
        });
        expect(isValid).toBe(true);
    });

    it('should reject wrong password', () => {
        const password = 'testPassword123';
        const { hash, salt, iterations, keyLen } = hashString({ str: password });

        const isValid = validateHash({
            digest: 'sha512',
            iterations,
            keyLen,
            password: 'wrongPassword',
            savedHash: hash,
            savedSalt: salt,
        });
        expect(isValid).toBe(false);
    });
});
