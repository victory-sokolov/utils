export const cache = (() => {
    const store = {};

    return {
        set(key, value) {
            store[key] = value;
        },

        has(key) {
            return !!this.get(key);
        },

        get(key) {
            return store[key];
        },

        remove(key) {
            if (this.has(key)) {
                store[key] = null;
                delete store[key];
            }
        },
    };
})();
