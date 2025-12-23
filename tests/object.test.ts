import { describe, expect, it } from 'vitest';
import {
    filterFalsyFromObject,
    flattenObject,
    flip,
    getUniqueByKey,
    objectEntries,
    objectKeys,
    omit,
    pick,
    unionWithExclusion,
    uniqueObject,
} from '../src/object';

describe('omit', () => {
    it('should remove the specified keys from the object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(omit(obj, 'a', 'c')).toEqual({ b: 2 });
    });
    it('should remove keys from array of objects', () => {
        const obj = [
            { a: 1, b: 2, c: 3 },
            { a: 4, b: 5, c: 6 },
        ];
        expect(omit(obj, 'a', 'c')).toEqual([{ b: 2 }, { b: 5 }]);
    });
    it('should return original object if firsst parameter was undefined, null, empty object', () => {
        // @ts-ignore
        expect(omit({}, 'a')).toEqual({});
        // @ts-ignore
        expect(omit([{}], 'a')).toEqual([{}]);
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
        expect(result).toEqual([
            { id: 1, name: 'b' },
            { id: 2, name: 'c' },
        ]);
    });
});

describe('objectKeys', () => {
    it('should return strict typed keys', () => {
        const obj = { a: 1, b: 2 };
        const keys = objectKeys(obj);
        expect(keys).toEqual(['a', 'b']);
        // Type check: keys should be ('a' | 'b')[]
    });
});

describe('objectEntries', () => {
    it('should return strict typed entries', () => {
        const obj = { a: 1, b: 2 };
        const entries = objectEntries(obj);
        expect(entries).toEqual([['a', 1], ['b', 2]]);
        // Type check: entries should be [keyof T, T[keyof T]][]
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
        expect(result).toEqual([
            { id: 1, name: 'b' },
            { id: 2, name: 'c' },
        ]);
    });
});

describe('pick', () => {
    it('should select the specified keys from the object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(pick(obj, 'a', 'c')).toEqual({ a: 1, c: 3 });
    });
});

describe('flattenObject', () => {
    it('should flatten a nested object', () => {
        const obj = {
            key: 'value',
            student: {
                name: 'Student1',
                age: 34,
            },
        };
        expect(flattenObject(obj)).toEqual({
            key: 'value',
            name: 'Student1',
            age: 34,
        });
    });
});

describe('filterFalsyFromObject', () => {
    it('should remove falsy values from the object', () => {
        const obj = { a: 1, b: 0, c: false, d: null, e: undefined };
        expect(filterFalsyFromObject(obj)).toEqual({ a: 1 });
    });
    it('should remove falsy values from the array of object', () => {
        const obj = [
            { a: 1, b: 0, c: false, d: null, e: undefined },
            { a: null, b: 12, c: 'hello', d: { a: 1 }, e: [], f: {} },
        ];
        expect(filterFalsyFromObject(obj)).toEqual([
            { a: 1 },
            { b: 12, c: 'hello', d: { a: 1 } },
        ]);
    });
    it('should accept ISO date strings', () => {
        const obj = { a: 1, timestamp: '2025-02-15T00:00:00.000Z' };
        expect(filterFalsyFromObject(obj)).toEqual({
            a: 1,
            timestamp: '2025-02-15T00:00:00.000Z',
        });
    });
    it('should accept Date objects', () => {
        const obj = { a: 1, date: new Date('2025-02-15T00:00:00.000Z') };
        expect(filterFalsyFromObject(obj)).toEqual({
            a: 1,
            date: new Date('2025-02-15T00:00:00.000Z'),
        });
    });
});

describe('unionWithExclusion', () => {
    it('should combine two objects and exclude false values when merging same keys', () => {
        const left = { a: 1, b: 0, c: false, d: null, e: undefined };
        const right = { a: 2, b: 3, c: 4, d: 5, f: 6 };
        expect(unionWithExclusion(left, right)).toEqual({
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
        expect(unionWithExclusion(left, right)).toEqual({
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
        expect(flip(obj)).toEqual({ 1: 'x', 2: 'y' });
    });
});
