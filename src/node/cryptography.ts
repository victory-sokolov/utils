import { Buffer } from 'node:buffer';
import nodeCrypto from 'node:crypto';

/**
 * Hash string
 * @param str Plain text
 * @param iterations Amount of iterations. Default to 10000
 * @param keyLen Key length. Default to 64
 * @returns Hashed object with meta information
 */
export const hashString = (
    str: string,
    iterations = 10000,
    keyLen = 64,
    digest = 'sha512'
) => {
    const salt = nodeCrypto.randomBytes(128).toString('base64');
    const hash = nodeCrypto
        .pbkdf2Sync(str, salt, iterations, keyLen, digest)
        .toString('hex');
    return {
        salt,
        hash,
        iterations,
        keyLen,
    };
};

/**
 * Validated Hash string
 * @param password password
 * @param savedHash Generated hash
 * @param savedSalt Generated salt
 * @param iterations Amount of iterations. Default to 10000
 * @param keyLen  Key length. Default to 64
 * @param digest Hash algorithm, Default to sha512
 * @returns True if hash is valid
 */
export const validateHash = (
    password: string,
    savedHash: string,
    savedSalt: string,
    iterations: number,
    keyLen: number,
    digest: string
) => {
    return (
        savedHash
        === nodeCrypto
            .pbkdf2Sync(password, savedSalt, iterations, keyLen, digest)
            .toString('hex')
    );
};

/**
 * Derives a cryptographic key from a password using PBKDF2
 * @param secret Secret key
 * @returns Short hash
 */
async function deriveKey(secret: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        'PBKDF2',
        false,
        ['deriveBits', 'deriveKey']
    );

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: encoder.encode('reposter-salt'), // You can make this configurable via env if needed
            iterations: 100000,
            hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

/**
 * Encrypts a string using AES-GCM with a given secret key.
 * @param plainText The text to encrypt.
 * @param secretKey The secret key (must be at least 32 characters long).
 * @returns Encrypted text.
 */
export async function encryptData(
    plainText: string,
    secretKey: string
): Promise<string> {
    const encoder = new TextEncoder();
    const key = await deriveKey(secretKey);

    const iv = crypto.getRandomValues(new Uint8Array(12)); // 12-byte IV for AES-GCM
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encoder.encode(plainText)
    );

    // Combine IV + encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);
    return Buffer.from(combined).toString('base64'); // Store as Base64 string
}

/**
 * Decrypts encrypted data using AES-GCM.
 * @param encryptedData The encrypted Base64 string.
 * @param secretKey The secret key (must be the same as used during encryption).
 * @returns The decrypted plain text string.
 */
export async function decryptData(
    encryptedData: string,
    secretKey: string
): Promise<string> {
    const encoded = Buffer.from(encryptedData, 'base64'); // Convert from Base64
    // Extract IV (first 12 bytes) using subarray
    const iv = encoded.subarray(0, 12);
    // Extract encrypted data (rest of the bytes) using subarray
    const encrypted = encoded.subarray(12);
    const key = await deriveKey(secretKey);

    const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        encrypted
    );
    return new TextDecoder().decode(decrypted);
}
