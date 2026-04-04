import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cache, lruCache, type LRUCacheAPI, withCache } from '../src/cache';

describe('cache', () => {
    let testCache: ReturnType<typeof cache>;

    beforeEach(() => {
        testCache = cache();
    });

    it('should set and get values', () => {
        testCache.set('name', 'Alice');
        expect(testCache.get('name')).toBe('Alice');
    });

    it('should return null for non-existent keys', () => {
        expect(testCache.get('nonexistent')).toBeNull();
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
        expect(testCache.get('temp')).toBeNull();
    });

    it('should clear all entries', () => {
        testCache.set('a', 1);
        testCache.set('b', 2);
        testCache.clear();
        expect(testCache.size).toBe(0);
        expect(testCache.get('a')).toBeNull();
    });

    it('should report size correctly', () => {
        expect(testCache.size).toBe(0);
        testCache.set('a', 1);
        expect(testCache.size).toBe(1);
        testCache.set('b', 2);
        expect(testCache.size).toBe(2);
        testCache.remove('a');
        expect(testCache.size).toBe(1);
    });

    it('should handle multiple data types', () => {
        testCache.set('string', 'hello');
        testCache.set('number', 42);
        testCache.set('object', { key: 'value' });
        testCache.set('array', [1, 2, 3]);

        expect(testCache.get('string')).toBe('hello');
        expect(testCache.get('number')).toBe(42);
        expect(testCache.get('object')).toStrictEqual({ key: 'value' });
        expect(testCache.get('array')).toStrictEqual([1, 2, 3]);
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

            expect(userCache.get('user1')).toStrictEqual(testUser);
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

describe('lruCache', () => {
    let testCache: LRUCacheAPI<string>;

    beforeEach(() => {
        testCache = lruCache<string>(3, 1000); // maxSize: 3, ttl: 1000ms
    });

    describe('basic operations', () => {
        it('should set and get values', () => {
            testCache.set('key', 'value');
            expect(testCache.get('key')).toBe('value');
        });

        it('should return null for non-existent keys', () => {
            expect(testCache.get('nonexistent')).toBeNull();
        });

        it('should check key existence with has()', () => {
            testCache.set('key', 'value');
            expect(testCache.has('key')).toBe(true);
            expect(testCache.has('nonexistent')).toBe(false);
        });

        it('should remove keys and return boolean', () => {
            testCache.set('key', 'value');
            expect(testCache.remove('key')).toBe(true);
            expect(testCache.remove('key')).toBe(false);
            expect(testCache.has('key')).toBe(false);
        });

        it('should clear all entries', () => {
            testCache.set('a', '1');
            testCache.set('b', '2');
            testCache.clear();
            expect(testCache.size).toBe(0);
        });

        it('should report size correctly', () => {
            expect(testCache.size).toBe(0);
            testCache.set('a', '1');
            expect(testCache.size).toBe(1);
        });
    });

    describe('LRU eviction', () => {
        it('should evict oldest entry when at capacity', () => {
            testCache.set('a', '1');
            testCache.set('b', '2');
            testCache.set('c', '3');
            testCache.set('d', '4'); // Should evict 'a'

            expect(testCache.get('a')).toBeNull();
            expect(testCache.get('b')).toBe('2');
            expect(testCache.get('c')).toBe('3');
            expect(testCache.get('d')).toBe('4');
        });

        it('should move accessed items to end (most recent)', () => {
            testCache.set('a', '1');
            testCache.set('b', '2');
            testCache.set('c', '3');
            testCache.get('a'); // Access 'a', moves it to end
            testCache.set('d', '4'); // Should evict 'b' now, not 'a'

            expect(testCache.get('a')).toBe('1');
            expect(testCache.get('b')).toBeNull();
        });

        it('should update position on set for existing key', () => {
            testCache.set('a', '1');
            testCache.set('b', '2');
            testCache.set('c', '3');
            testCache.set('a', 'updated'); // Update 'a', moves to end
            testCache.set('d', '4'); // Should evict 'b'

            expect(testCache.get('a')).toBe('updated');
            expect(testCache.get('b')).toBeNull();
        });
    });

    describe('TTL expiration', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('should expire entries after TTL', async () => {
            const shortTtlCache = lruCache<string>(10, 100);

            shortTtlCache.set('key', 'value');
            expect(shortTtlCache.get('key')).toBe('value');

            vi.advanceTimersByTime(50);
            expect(shortTtlCache.get('key')).toBe('value');

            vi.advanceTimersByTime(51); // Total 101ms
            expect(shortTtlCache.get('key')).toBeNull();
        });

        it('should return false for has() on expired entries', async () => {
            const shortTtlCache = lruCache<string>(10, 100);

            shortTtlCache.set('key', 'value');
            expect(shortTtlCache.has('key')).toBe(true);

            vi.advanceTimersByTime(101);
            expect(shortTtlCache.has('key')).toBe(false);
        });

        it('should remove expired entry from store on access', async () => {
            const shortTtlCache = lruCache<string>(10, 100);

            shortTtlCache.set('key', 'value');
            expect(shortTtlCache.size).toBe(1);

            vi.advanceTimersByTime(101);
            shortTtlCache.get('key');
            expect(shortTtlCache.size).toBe(0);
        });
    });

    describe('edge cases', () => {
        it('should handle maxSize of 1', () => {
            const singleCache = lruCache<string>(1, 1000);
            singleCache.set('a', '1');
            singleCache.set('b', '2');

            expect(singleCache.get('a')).toBeNull();
            expect(singleCache.get('b')).toBe('2');
        });

        it('should handle empty string keys', () => {
            testCache.set('', 'empty');
            expect(testCache.get('')).toBe('empty');
        });

        it('should handle complex objects', () => {
            interface Data {
                list: number[];
                nested: { value: string };
            }

            const objectCache = lruCache<Data>(10, 1000);
            const data: Data = { list: [1, 2, 3], nested: { value: 'test' } };

            objectCache.set('key', data);
            expect(objectCache.get('key')).toStrictEqual(data);
        });
    });
});

describe('withCache', () => {
    const createTestCache = () => lruCache<{ cached: boolean; result: number }>(10, 1000);

    const createTestFn =
        (callCountRef: { current: number }) =>
        async (x: number): Promise<number> => {
            callCountRef.current++;
            return x * 2;
        };

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should cache function results', async () => {
        const callCount = { current: 0 };
        const fn = createTestFn(callCount);
        const cachedFn = withCache(fn, createTestCache(), x => `key:${x}`);

        const result1 = await cachedFn(5);
        expect(result1).toStrictEqual({ cached: false, result: 10 });
        expect(callCount.current).toBe(1);

        const result2 = await cachedFn(5);
        expect(result2).toStrictEqual({ cached: true, result: 10 });
        expect(callCount.current).toBe(1);
    });

    it('should use different cache keys for different arguments', async () => {
        const callCount = { current: 0 };
        const fn = createTestFn(callCount);
        const cachedFn = withCache(fn, createTestCache(), x => `key:${x}`);

        await cachedFn(1);
        await cachedFn(2);
        await cachedFn(1);

        expect(callCount.current).toBe(2);
    });

    it('should work with multiple arguments', async () => {
        const testCache = lruCache<{ cached: boolean; result: number }>(10, 1000);
        let callCount = 0;

        const fn = async (a: number, b: string): Promise<number> => {
            callCount++;
            return a + b.length;
        };

        const cachedFn = withCache(fn, testCache, (a, b) => `${a}:${b}`);

        const result1 = await cachedFn(5, 'hello');
        expect(result1.result).toBe(10);

        const result2 = await cachedFn(5, 'world');
        expect(result2.result).toBe(10);

        const result3 = await cachedFn(5, 'hello'); // Cached
        expect(result3.cached).toBe(true);

        expect(callCount).toBe(2);
    });

    it('should respect cache expiration', async () => {
        const testCache = lruCache<{ cached: boolean; result: number }>(10, 100);
        let callCount = 0;

        const fn = async (): Promise<number> => {
            callCount++;
            return 42;
        };

        const cachedFn = withCache(fn, testCache, () => 'key');

        await cachedFn();
        expect(callCount).toBe(1);

        vi.advanceTimersByTime(101);

        await cachedFn();
        expect(callCount).toBe(2); // Called again after expiration
    });

    it('should respect LRU eviction', async () => {
        const testCache = lruCache<{ cached: boolean; result: number }>(2, 1000);
        let callCount = 0;

        const fn = async (x: number): Promise<number> => {
            callCount++;
            return x;
        };

        const cachedFn = withCache(fn, testCache, x => `key:${x}`);

        await cachedFn(1);
        await cachedFn(2);
        await cachedFn(3); // Evicts key:1
        await cachedFn(1); // Cache miss, calls function

        expect(callCount).toBe(4);
    });
});
