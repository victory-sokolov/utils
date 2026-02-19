/* eslint-disable import/no-nodejs-modules */
import { Buffer } from 'node:buffer';
import nodeCrypto from 'node:crypto';

interface HashResult {
    hash: string;
    iterations: number;
    keyLen: number;
    salt: string;
}

interface HashOptions {
    digest?: string;
    iterations?: number;
    keyLen?: number;
    str: string;
}

interface ValidateHashOptions {
    digest: string;
    iterations: number;
    keyLen: number;
    password: string;
    savedHash: string;
    savedSalt: string;
}

/**
 * Hash string
 * @param options Hash options
 * @returns Hashed object with meta information
 */
export const hashString = (options: HashOptions): HashResult => {
    const { digest = 'sha512', iterations = 10_000, keyLen = 64, str } = options;
    const salt = nodeCrypto.randomBytes(128).toString('base64');
    const hash = nodeCrypto.pbkdf2Sync(str, salt, iterations, keyLen, digest).toString('hex');
    return {
        hash,
        iterations,
        keyLen,
        salt,
    };
};

/**
 * Validated Hash string
 * @param options Validation options
 * @returns True if hash is valid
 */
export const validateHash = (options: ValidateHashOptions): boolean => {
    const { digest, iterations, keyLen, password, savedHash, savedSalt } = options;
    return (
        savedHash ===
        nodeCrypto.pbkdf2Sync(password, savedSalt, iterations, keyLen, digest).toString('hex')
    );
};

/**
 * Derives a cryptographic key from a password using PBKDF2
 * @param secret Secret key
 * @returns Short hash
 */
const deriveKey = (secret: string): Promise<CryptoKey> => {
    const encoder = new TextEncoder();
    return crypto.subtle
        .importKey('raw', encoder.encode(secret), 'PBKDF2', false, ['deriveBits', 'deriveKey'])
        .then(keyMaterial =>
            crypto.subtle.deriveKey(
                {
                    hash: 'SHA-256',
                    iterations: 100_000,
                    name: 'PBKDF2',
                    salt: encoder.encode('reposter-salt'),
                },
                keyMaterial,
                { length: 256, name: 'AES-GCM' },
                false,
                ['encrypt', 'decrypt'],
            ),
        );
};

/**
 * Encrypts a string using AES-GCM with a given secret key.
 * @param plainText The text to encrypt.
 * @param secretKey The secret key (must be at least 32 characters long).
 * @returns Encrypted text.
 */
export const encryptData = (plainText: string, secretKey: string): Promise<string> => {
    const encoder = new TextEncoder();

    return deriveKey(secretKey).then(key => {
        const iv = crypto.getRandomValues(new Uint8Array(12));
        return crypto.subtle.encrypt({ iv, name: 'AES-GCM' }, key, encoder.encode(plainText)).then(
            encrypted => {
                const combined = new Uint8Array(iv.length + encrypted.byteLength);
                combined.set(iv);
                combined.set(new Uint8Array(encrypted), iv.length);
                return Buffer.from(combined).toString('base64');
            },
        );
    });
};

/**
 * Decrypts encrypted data using AES-GCM.
 * @param encryptedData The encrypted Base64 string.
 * @param secretKey The secret key (must be the same as used during encryption).
 * @returns The decrypted plain text string.
 */
export const decryptData = (encryptedData: string, secretKey: string): Promise<string> => {
    const encoded = Buffer.from(encryptedData, 'base64');
    const encrypted = new Uint8Array(encoded.subarray(12));
    const iv = new Uint8Array(encoded.subarray(0, 12));

    return deriveKey(secretKey).then(key =>
        crypto.subtle.decrypt({ iv, name: 'AES-GCM' }, key, encrypted).then(decrypted =>
            new TextDecoder().decode(decrypted),
        ),
    );
};
