import { Buffer } from 'node:buffer';
import nodeCrypto from 'node:crypto';

interface HashResult {
    digest: string;
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
    const { digest = 'sha512', iterations = 210_000, keyLen = 64, str } = options;
    const salt = nodeCrypto.randomBytes(128).toString('base64');
    const hash = nodeCrypto.pbkdf2Sync(str, salt, iterations, keyLen, digest).toString('hex');
    return {
        digest,
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

const SALT_LENGTH = 16;
const IV_LENGTH = 12;

const validateSecretKey = (secretKey: string): void => {
    if (secretKey.length < 32) {
        throw new Error('secretKey must be at least 32 characters long');
    }
};

/**
 * Derives a cryptographic key from a password using PBKDF2
 * @param secret Secret key (must be at least 32 characters)
 * @param salt Random salt for key derivation
 * @returns Derived CryptoKey
 */
const deriveKey = (secret: string, salt: Uint8Array): Promise<nodeCrypto.webcrypto.CryptoKey> => {
    const { webcrypto } = nodeCrypto;
    const encoder = new TextEncoder();
    return Promise.resolve()
        .then(() => validateSecretKey(secret))
        .then(() =>
            webcrypto.subtle.importKey('raw', encoder.encode(secret), 'PBKDF2', false, [
                'deriveBits',
                'deriveKey',
            ]),
        )
        .then(keyMaterial =>
            webcrypto.subtle.deriveKey(
                {
                    hash: 'SHA-256',
                    iterations: 100_000,
                    name: 'PBKDF2',
                    salt: (salt.buffer as ArrayBuffer).slice(
                        salt.byteOffset,
                        salt.byteOffset + salt.byteLength,
                    ),
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
 * @returns Encrypted text (base64 encoded: salt + IV + ciphertext).
 */
export const encryptData = (plainText: string, secretKey: string): Promise<string> => {
    const { webcrypto } = nodeCrypto;
    const encoder = new TextEncoder();
    const salt = webcrypto.getRandomValues(new Uint8Array(SALT_LENGTH));

    return deriveKey(secretKey, salt).then(key => {
        const iv = webcrypto.getRandomValues(new Uint8Array(IV_LENGTH));
        return webcrypto.subtle
            .encrypt({ iv, name: 'AES-GCM' }, key, encoder.encode(plainText))
            .then(encrypted => {
                const combined = new Uint8Array(SALT_LENGTH + IV_LENGTH + encrypted.byteLength);
                combined.set(salt, 0);
                combined.set(iv, SALT_LENGTH);
                combined.set(new Uint8Array(encrypted), SALT_LENGTH + IV_LENGTH);
                return Buffer.from(combined).toString('base64');
            });
    });
};

/**
 * Decrypts encrypted data using AES-GCM.
 * @param encryptedData The encrypted Base64 string (salt + IV + ciphertext).
 * @param secretKey The secret key (must be the same as used during encryption).
 * @returns The decrypted plain text string.
 */
export const decryptData = (encryptedData: string, secretKey: string): Promise<string> => {
    const { webcrypto } = nodeCrypto;
    const encoded = Buffer.from(encryptedData, 'base64');
    if (encoded.byteLength <= SALT_LENGTH + IV_LENGTH) {
        return Promise.reject(new Error('encryptedData is too short or malformed'));
    }
    const salt = new Uint8Array(encoded.subarray(0, SALT_LENGTH));
    const iv = new Uint8Array(encoded.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH));
    const encrypted = new Uint8Array(encoded.subarray(SALT_LENGTH + IV_LENGTH));

    return deriveKey(secretKey, salt).then(key =>
        webcrypto.subtle
            .decrypt({ iv, name: 'AES-GCM' }, key, encrypted)
            .then(decrypted => new TextDecoder().decode(decrypted)),
    );
};

/**
 * Generates a secure, URL-friendly unique identifier using cryptographic random bytes.
 * @param size - Length of the generated ID (default: 21, produces ~126 bits of entropy)
 * @returns A random string from the provided alphabet
 */
export const nanoid = (size = 21): string => {
    const alphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzict';
    const bytes = nodeCrypto.randomBytes(size);
    let id = '';

    const bytesArray = [...bytes];
    for (let index = 0; index < size; index += 1) {
        const byte = bytesArray[index] ?? 0;
        id += alphabet[byte % alphabet.length];
    }

    return id;
};
