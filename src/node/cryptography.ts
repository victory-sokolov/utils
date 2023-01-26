import { randomBytes, pbkdf2Sync } from 'node:crypto';

/**
 * Hash string
 * @param str Plain text
 * @param iterations Amount of iterations. Default to 10000
 * @param keyLen Key length. Default to 64
 * @returns Hashed object with meta information
 */
export const hashString = (str: string, iterations = 10000, keyLen = 64, digest = 'sha512') => {
    const salt = randomBytes(128).toString('base64');
    const hash = pbkdf2Sync(str, salt, iterations, keyLen, digest).toString('hex');
    return {
        salt: salt,
        hash: hash,
        iterations: iterations,
        keyLen: keyLen,
    };
};

/**
 * Validated Hash string
 * @param Text to validate
 * @param savedHash Generated hash
 * @param savedSalt Generated salt
 * @param iterations Amount of iterations. Default to 10000
 * @param keyLen  Key length. Default to 64
 * @param digest Hash algorithm, Default to sha512
 * @returns
 */
export const validateHash = (
    password: string,
    savedHash: string,
    savedSalt: string,
    iterations: number,
    keyLen: number,
    digest: string
) => {
    return savedHash == pbkdf2Sync(password, savedSalt, iterations, keyLen, digest).toString('hex');
};
