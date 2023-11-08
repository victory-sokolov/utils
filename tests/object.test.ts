import {
    omit,
    pick,
    flattenObject,
    filterFalsyFromObject,
    unionWithExclusion,
    flip,
} from '../src/object';
import { describe, it, expect } from 'vitest';

describe('omit', () => {
    it('should remove the specified keys from the object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(omit(obj, 'a', 'c')).toEqual({ b: 2 });
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
});

describe('flip', () => {
    test('FLip object keys with its values', () => {
        const obj = {
            x: 1,
            y: 2,
        };
        expect(flip(obj)).toEqual({ 1: 'x', 2: 'y' });
    });
});
