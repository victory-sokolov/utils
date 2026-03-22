import { describe, expect, it } from 'vitest';
import {
    deepClone,
    filterFalsyFromObject,
    flattenObject,
    flip,
    getUniqueByKey,
    objectEntries,
    objectKeys,
    omit,
    omitBy,
    pick,
    removeEmpty,
    unionWithExclusion,
    uniqueObject,
} from '../src/object';

describe('omit', () => {
    it('should remove the specified keys from the object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(omit(obj, 'a', 'c')).toStrictEqual({ b: 2 });
    });

    it('should remove keys from array of objects', () => {
        const obj = [
            { a: 1, b: 2, c: 3 },
            { a: 4, b: 5, c: 6 },
        ];
        expect(omit(obj, 'a', 'c')).toStrictEqual([{ b: 2 }, { b: 5 }]);
    });

    it('should return original object if firsst parameter was undefined, null, empty object', () => {
        // @ts-expect-error
        expect(omit({}, 'a')).toStrictEqual({});
        // @ts-expect-error
        expect(omit([{}], 'a')).toStrictEqual([{}]);
    });
});

describe('uniqueObject', () => {
    it('should return unique objects based on key', () => {
        const data = [
            { id: 1, name: 'a' },
            { id: 1, name: 'b' },
            { id: 2, name: 'c' },
        ];
        const result = uniqueObject(data, 'id');
        expect(result).toStrictEqual([
            { id: 1, name: 'b' },
            { id: 2, name: 'c' },
        ]);
    });
});

describe('objectKeys', () => {
    it('should return strict typed keys', () => {
        const obj = { a: 1, b: 2 };
        const keys = objectKeys(obj);
        expect(keys).toStrictEqual(['a', 'b']);
    });
});

describe('objectEntries', () => {
    it('should return strict typed entries', () => {
        const obj = { a: 1, b: 2 };
        const entries = objectEntries(obj);
        expect(entries).toStrictEqual([
            ['a', 1],
            ['b', 2],
        ]);
    });
});

describe('getUniqueByKey', () => {
    it('should return unique objects based on key', () => {
        const arr = [
            { id: 1, name: 'a' },
            { id: 1, name: 'b' },
            { id: 2, name: 'c' },
        ];
        const result = getUniqueByKey(arr, 'id');
        expect(result).toStrictEqual([
            { id: 1, name: 'b' },
            { id: 2, name: 'c' },
        ]);
    });
});

describe('pick', () => {
    it('should select the specified keys from the object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(pick(obj, 'a', 'c')).toStrictEqual({ a: 1, c: 3 });
    });
});

describe('flattenObject', () => {
    it('should flatten a nested object', () => {
        const obj = {
            key: 'value',
            student: {
                age: 34,
                name: 'Student1',
            },
        };
        expect(flattenObject(obj)).toStrictEqual({
            age: 34,
            key: 'value',
            name: 'Student1',
        });
    });
});

describe('filterFalsyFromObject', () => {
    it('should remove falsy values from the object', () => {
        const obj = { a: 1, b: 0, c: false, d: null, e: undefined };
        expect(filterFalsyFromObject(obj)).toStrictEqual({ a: 1 });
    });

    it('should remove falsy values from the array of object', () => {
        const obj = [
            { a: 1, b: 0, c: false, d: null, e: undefined },
            { a: null, b: 12, c: 'hello', d: { a: 1 }, e: [], f: {} },
        ];
        expect(filterFalsyFromObject(obj)).toStrictEqual([
            { a: 1 },
            { b: 12, c: 'hello', d: { a: 1 } },
        ]);
    });

    it('should accept ISO date strings', () => {
        const obj = { a: 1, timestamp: '2025-02-15T00:00:00.000Z' };
        expect(filterFalsyFromObject(obj)).toStrictEqual({
            a: 1,
            timestamp: '2025-02-15T00:00:00.000Z',
        });
    });

    it('should accept Date objects', () => {
        const obj = { a: 1, date: new Date('2025-02-15T00:00:00.000Z') };
        expect(filterFalsyFromObject(obj)).toStrictEqual({
            a: 1,
            date: new Date('2025-02-15T00:00:00.000Z'),
        });
    });
});

describe('unionWithExclusion', () => {
    it('should combine two objects and exclude false values when merging same keys', () => {
        const left = { a: 1, b: 0, c: false, d: null, e: undefined };
        const right = { a: 2, b: 3, c: 4, d: 5, f: 6 };
        expect(unionWithExclusion(left, right)).toStrictEqual({
            a: 2,
            b: 3,
            c: 4,
            d: 5,
            f: 6,
        });
    });

    it('should merge nested objects', () => {
        const left = { a: { x: 1 }, b: 2 };
        const right = { a: { y: 3 }, c: 4 };
        expect(unionWithExclusion(left, right)).toStrictEqual({
            a: { x: 1, y: 3 },
            b: 2,
            c: 4,
        });
    });
});

describe('flip', () => {
    it('fLip object keys with its values', () => {
        const obj = {
            x: 1,
            y: 2,
        };
        expect(flip(obj)).toStrictEqual({ 1: 'x', 2: 'y' });
    });
});

describe('omitBy', () => {
    it('should remove properties where predicate returns true', () => {
        const obj = { a: 1, b: null, c: undefined, d: '' };
        expect(omitBy(obj, v => v === null || v === undefined)).toStrictEqual({
            a: 1,
            d: '',
        });
    });

    it('should work with key in predicate', () => {
        const obj = { a: 1, b: 2, secret: 3 };
        expect(omitBy(obj, (_, key) => key === 'secret')).toStrictEqual({ a: 1, b: 2 });
    });

    it('should return empty object when all properties match', () => {
        const obj = { a: null, b: undefined };
        expect(omitBy(obj, v => v === null || v === undefined)).toStrictEqual({});
    });
});

describe('removeEmpty', () => {
    it('should remove null and undefined from object', () => {
        const obj = { a: 1, b: null, c: undefined };
        expect(removeEmpty(obj)).toStrictEqual({ a: 1 });
    });

    it('should remove empty strings', () => {
        const obj = { a: 1, b: '' };
        expect(removeEmpty(obj)).toStrictEqual({ a: 1 });
    });

    it('should remove empty arrays', () => {
        const obj = { a: 1, b: [] };
        expect(removeEmpty(obj)).toStrictEqual({ a: 1 });
    });

    it('should remove empty objects recursively', () => {
        const obj = { a: 1, b: { c: {} } };
        expect(removeEmpty(obj)).toStrictEqual({ a: 1 });
    });

    it('should clean nested structures', () => {
        const obj = {
            a: 1,
            b: { c: null, d: 'hello', e: { f: [] } },
            g: [null, 1, { h: '' }],
        };
        expect(removeEmpty(obj)).toStrictEqual({
            a: 1,
            b: { d: 'hello' },
            g: [1],
        });
    });

    it('should return null for completely empty result', () => {
        expect(removeEmpty(null)).toBe(null);
        expect(removeEmpty(undefined)).toBe(null);
        expect(removeEmpty('')).toBe(null);
        expect(removeEmpty([])).toBe(null);
        expect(removeEmpty({})).toBe(null);
    });

    it('should preserve valid values', () => {
        expect(removeEmpty(0)).toBe(0);
        expect(removeEmpty(false)).toBe(false);
        expect(removeEmpty('hello')).toBe('hello');
    });

    it('should handle circular object references', () => {
        const obj: { a: number; self?: unknown } = { a: 1 };
        obj.self = obj;
        const result = removeEmpty(obj) as typeof obj;
        // Result should have circular ref to itself (the cleaned result)
        expect(result).toEqual({ a: 1, self: result });
        expect(result.self).toBe(result);
    });

    it('should handle circular array references', () => {
        const arr: unknown[] = [1, null];
        arr.push(arr);
        const result = removeEmpty(arr) as unknown[];
        // Result should have circular ref to itself (the cleaned result)
        expect(result).toEqual([1, result]);
        expect(result[1]).toBe(result);
    });

    it('should handle mutual circular references', () => {
        const obj1: { a: number; ref?: unknown } = { a: 1 };
        const obj2: { b: number; ref?: unknown } = { b: 2 };
        obj1.ref = obj2;
        obj2.ref = obj1;
        const result = removeEmpty(obj1) as typeof obj1;
        const result2 = result.ref as typeof obj2;
        // Result should have proper circular refs to cleaned objects
        expect(result).toEqual({ a: 1, ref: { b: 2, ref: result } });
        expect(result2.ref).toBe(result);
    });
});

describe('deepClone', () => {
    it('should clone primitive values', () => {
        expect(deepClone(1)).toBe(1);
        expect(deepClone('hello')).toBe('hello');
        expect(deepClone(true)).toBe(true);
        expect(deepClone(null)).toBe(null);
        expect(deepClone(undefined)).toBe(undefined);
    });

    it('should clone flat objects', () => {
        const obj = { a: 1, b: 'hello', c: true };
        const cloned = deepClone(obj);
        expect(cloned).toStrictEqual(obj);
        expect(cloned).not.toBe(obj);
    });

    it('should clone nested objects deeply', () => {
        const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
        const cloned = deepClone(obj);
        expect(cloned).toStrictEqual(obj);
        cloned.b.c = 99;
        expect(obj.b.c).toBe(2);
    });

    it('should clone arrays', () => {
        const arr = [1, { a: 2 }, [3, 4]] as const;
        const cloned = deepClone(arr);
        expect(cloned).toStrictEqual(arr);
        (cloned[1] as { a: number }).a = 99;
        expect((arr[1] as { a: number }).a).toBe(2);
    });

    it('should handle circular object references', () => {
        const obj: { a: number; self?: unknown } = { a: 1 };
        obj.self = obj;
        const cloned = deepClone(obj) as typeof obj;

        expect(cloned).not.toBe(obj);
        expect(cloned.a).toBe(1);
        expect(cloned.self).toBe(cloned);
    });

    it('should handle circular array references', () => {
        const arr: unknown[] = [1, 2];
        arr.push(arr);
        const cloned = deepClone(arr) as unknown[];

        expect(cloned).not.toBe(arr);
        expect(cloned[0]).toBe(1);
        expect(cloned[1]).toBe(2);
        expect(cloned[2]).toBe(cloned);
    });
});
