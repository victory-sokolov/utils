type Optional<T> = T | undefined;

interface CacheAPI<T = unknown> {
    set: (key: string, value: T) => void;
    has: (key: string) => boolean;
    get: (key: string) => Optional<T>;
    remove: (key: string) => void;
}

export const cache = <T = unknown>(): CacheAPI<T> => {
    const store = new Map<string, T>();

    const get = (key: string): Optional<T> => {
        if (store.has(key)) {
            const value = store.get(key);
            if (value) {
                return value;
            }
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
