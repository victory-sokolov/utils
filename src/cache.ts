import type { Maybe } from './types';

interface CacheAPI<T = unknown> {
    set: (key: string, value: T) => void;
    has: (key: string) => boolean;
    get: (key: string) => Maybe<T>;
    remove: (key: string) => void;
}

export const cache = <T = unknown>(): CacheAPI<T> => {
    const store = new Map<string, T>();

    const get = (key: string): Maybe<T> => {
        if (store.has(key)) {
            return store.get(key);
        }
    };

    return {
        get,

        has(key: string): boolean {
            return store.has(key);
        },

        remove(key: string): void {
            store.delete(key);
        },

        set(key: string, value: T): void {
            store.set(key, value);
        },
    };
};
