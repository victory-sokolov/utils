import type { Maybe } from './types';

interface CacheAPI<T = unknown> {
    clear: () => void;
    get: (key: string) => Maybe<T>;
    has: (key: string) => boolean;
    remove: (key: string) => void;
    set: (key: string, value: T) => void;
    readonly size: number;
}

/** LRU cache API with TTL support */
export interface LRUCacheAPI<T = unknown> extends CacheAPI<T> {
    /** Get a value, returning null if expired or not found */
    get: (key: string) => Maybe<T>;
    /** Set a value with automatic expiration based on TTL */
    set: (key: string, value: T) => void;
    /** Check if key exists and hasn't expired */
    has: (key: string) => boolean;
    /** Delete a key from cache */
    remove: (key: string) => boolean;
    /** Clear all entries */
    clear: () => void;
    /** Current number of entries */
    readonly size: number;
}

interface CacheEntry<T> {
    expiresAt: number;
    value: T;
}

/**
 * Creates a simple cache without eviction or expiration.
 * Use `lruCache` for LRU eviction and TTL support.
 */
export const cache = <T = unknown>(): CacheAPI<T> => {
    const store = new Map<string, T>();

    return {
        clear(): void {
            store.clear();
        },

        get(key: string): Maybe<T> {
            return store.get(key) ?? null;
        },

        has(key: string): boolean {
            return store.has(key);
        },

        remove(key: string): void {
            store.delete(key);
        },

        set(key: string, value: T): void {
            store.set(key, value);
        },

        get size(): number {
            return store.size;
        },
    };
};

/** Creates the get function for LRU cache */
const createLruGet =
    <T>(store: Map<string, CacheEntry<T>>) =>
    (key: string): Maybe<T> => {
        const entry = store.get(key);
        if (!entry) return null;

        if (Date.now() > entry.expiresAt) {
            store.delete(key);
            return null;
        }

        // Move to end (most recently used)
        store.delete(key);
        store.set(key, entry);
        return entry.value;
    };

/** Creates the set function for LRU cache */
const createLruSet =
    <T>(store: Map<string, CacheEntry<T>>, maxSize: number, ttl: number) =>
    (key: string, value: T): void => {
        // Remove if exists (to move to end)
        store.delete(key);

        // Evict oldest if at capacity
        if (store.size >= maxSize) {
            const oldestKey = store.keys().next().value;
            if (oldestKey) store.delete(oldestKey);
        }

        store.set(key, {
            expiresAt: Date.now() + ttl,
            value,
        });
    };

/**
 * Creates an LRU cache with TTL (time-to-live) support.
 * @param maxSize - Maximum number of entries before eviction
 * @param ttl - Time-to-live in milliseconds
 */
export const lruCache = <T = unknown>(maxSize: number, ttl: number): LRUCacheAPI<T> => {
    const store = new Map<string, CacheEntry<T>>();
    const get = createLruGet(store);
    const set = createLruSet(store, maxSize, ttl);

    return {
        clear(): void {
            store.clear();
        },

        get,

        has(key: string): boolean {
            return get(key) !== null;
        },

        remove(key: string): boolean {
            return store.delete(key);
        },

        set,

        get size(): number {
            return store.size;
        },
    };
};

/**
 * Wraps an async function with caching.
 * @param fn - The async function to cache
 * @param cacheInstance - The cache instance to use
 * @param getKey - Function to generate cache key from arguments
 */
export const withCache =
    <TArgs extends unknown[], TResult>(
        fn: (...args: TArgs) => Promise<TResult>,
        cacheInstance: LRUCacheAPI<{ cached: boolean; result: TResult }>,
        getKey: (...args: TArgs) => string,
    ): ((...args: TArgs) => Promise<{ cached: boolean; result: TResult }>) =>
    (...args: TArgs) => {
        const key = getKey(...args);
        const cached = cacheInstance.get(key);

        if (cached) {
            return Promise.resolve({ cached: true, result: cached.result });
        }

        return fn(...args).then(result => {
            cacheInstance.set(key, { cached: false, result });
            return { cached: false, result };
        });
    };
