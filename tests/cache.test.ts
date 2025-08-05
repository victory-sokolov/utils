import { cache } from '../src/cache';

describe('cache', () => {
    let testCache: ReturnType<typeof cache>;

    beforeEach(() => {
        testCache = cache();
    });

    it('should set and get values', () => {
        testCache.set('name', 'Alice');
        expect(testCache.get('name')).toBe('Alice');
    });

    it('should return undefined for non-existent keys', () => {
        expect(testCache.get('nonexistent')).toBeUndefined();
    });

    it('should check key existence with has()', () => {
        testCache.set('age', 30);
        expect(testCache.has('age')).toBe(true);
        expect(testCache.has('nonexistent')).toBe(false);
    });

    it('should remove keys', () => {
        testCache.set('temp', 'value');
        testCache.remove('temp');
        expect(testCache.has('temp')).toBe(false);
        expect(testCache.get('temp')).toBeUndefined();
    });

    it('should handle multiple data types', () => {
        testCache.set('string', 'hello');
        testCache.set('number', 42);
        testCache.set('object', { key: 'value' });
        testCache.set('array', [1, 2, 3]);

        expect(testCache.get('string')).toBe('hello');
        expect(testCache.get('number')).toBe(42);
        expect(testCache.get('object')).toEqual({ key: 'value' });
        expect(testCache.get('array')).toEqual([1, 2, 3]);
    });

    it('should overwrite existing values', () => {
        testCache.set('key', 'first');
        testCache.set('key', 'second');
        expect(testCache.get('key')).toBe('second');
    });

    describe('typed cache', () => {
        it('should work with complex types', () => {
            interface User {
                id: number;
                name: string;
            }

            const userCache = cache<User>();
            const testUser = { id: 1, name: 'Alice' };

            userCache.set('user1', testUser);

            // @ts-expect-error - Testing invalid type
            const testFn = () => userCache.set('user2', 'invalid');

            // Runtime check
            expect(testFn()).toBeUndefined();
            expect(userCache.get('user1')).toEqual(testUser);
        });
    });

    describe('edge cases', () => {
        it('should handle empty string keys', () => {
            testCache.set('', 'empty key');
            expect(testCache.get('')).toBe('empty key');
        });

        it('should handle special characters in keys', () => {
            const specialKey = '!@#$%^&*()';
            testCache.set(specialKey, 'special');
            expect(testCache.get(specialKey)).toBe('special');
        });

        it('should not fail when removing non-existent key', () => {
            expect(() => testCache.remove('nonexistent')).not.toThrow();
        });
    });
});
