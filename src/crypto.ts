const ALPHABET = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzict';

/**
 * `nanoid` implementation using Web Crypto `getRandomValues`.
 * Assumes a Web Crypto implementation is available (e.g. `window.crypto` or `globalThis.crypto`).
 * @param size - Length of the generated ID (default: 21)
 */
export const nanoid = (size = 21): string => {
    if (size === 0) return '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cryptoObj = (globalThis as any).crypto?.webcrypto || (globalThis as any).crypto;
    if (!cryptoObj || typeof cryptoObj.getRandomValues !== 'function') {
        throw new Error('Web Crypto `getRandomValues` is not available in this environment');
    }

    const bytes = new Uint8Array(size);
    cryptoObj.getRandomValues(bytes);

    let id = '';
    for (let index = 0; index < size; index += 1) {
        id += ALPHABET[(bytes[index] ?? 0) % ALPHABET.length];
    }

    return id;
};
