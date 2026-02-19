type CacheStore<T = any> = Record<string, T | undefined>;

interface CacheAPI<T = any> {
    set: (key: string, value: T) => void;
    has: (key: string) => boolean;
    get: (key: string) => T | undefined;
    remove: (key: string) => void;
}

export const cache = <T = any>(): CacheAPI<T> => {
    const store: CacheStore<T> = {};

    return {
        get(key: string): T | undefined {
            return store[key];
        },

        has(key: string): boolean {
            return !!this.get(key);
        },

        remove(key: string): void {
            if (this.has(key)) {
                store[key] = undefined;
                delete store[key];
            }
        },

        set(key: string, value: T): void {
            store[key] = value;
        },
    };
};
