/** @vitest-environment jsdom */

import {
    describe,
    expect,
    it
} from 'vitest';
import {
    hasProperty,
    isBoolean,
    isBrowser,
    isDate,
    isDef,
    isFunction,
    isHtmlElement,
    isJsObject,
    isNull,
    isNumber,
    isObject,
    isRegExp,
    isString,
    isTruthyAndNotEmpty,
    isUndefined,
    isWindow,
    toRawType,
} from '../src/is';

describe('test is utils', () => {
    it('is date', () => {
        expect(isDate(new Date())).toBe(true);
        expect(isDate(new Date('2025-02-27T11:50:00.000Z'))).toBe(true);
        expect(isDate('2025-02-27T11:50:00.000Z')).toBe(false);
    });

    it('is def', () => {
        expect(isDef(1)).toBe(true);
        expect(isDef(0)).toBe(true);
        expect(isDef('')).toBe(true);
        expect(isDef(null)).toBe(true);
        expect(isDef(false)).toBe(true);
        expect(isDef(undefined)).toBe(false);
    });

    it('is boolean', () => {
        expect(isBoolean(true)).toBe(true);
        expect(isBoolean(false)).toBe(true);
        expect(isBoolean(0)).toBe(false);
        expect(isBoolean(1)).toBe(false);
        expect(isBoolean(null)).toBe(false);
        expect(isBoolean(undefined)).toBe(false);
        expect(isBoolean('true')).toBe(false);
    });

    it('is function', () => {
        expect(isFunction(() => {})).toBe(true);
        expect(isFunction(() => {})).toBe(true);
        expect(isFunction(async () => {})).toBe(true);
        expect(isFunction(0)).toBe(false);
        expect(isFunction(null)).toBe(false);
    });

    it('is number', () => {
        expect(isNumber(1)).toBe(true);
        expect(isNumber(0)).toBe(true);
        expect(isNumber(-1)).toBe(true);
        expect(isNumber(0.5)).toBe(true);
        expect(isNumber(Number.NaN)).toBe(true);
        expect(isNumber(Infinity)).toBe(true);
        expect(isNumber('1')).toBe(false);
        expect(isNumber(null)).toBe(false);
    });

    it('is string', () => {
        expect(isString('hello')).toBe(true);
        expect(isString('')).toBe(true);
        expect(isString(123)).toBe(false);
        expect(isString(null)).toBe(false);
    });

    it('is object', () => {
        expect(isObject({})).toBe(true);
        expect(isObject({ a: 1 })).toBe(true);
        expect(isObject([])).toBe(true); // Arrays are objects
        expect(isObject(null)).toBe(false); // null is not an object
        expect(isObject(1)).toBe(false);
        expect(isObject('string')).toBe(false);
    });

    it('is undefined', () => {
        expect(isUndefined(undefined)).toBe(true);
        expect(isUndefined(null)).toBe(false);
        expect(isUndefined(0)).toBe(false);
    });

    it('is null', () => {
        expect(isNull(null)).toBe(true);
        expect(isNull(undefined)).toBe(false);
        expect(isNull(0)).toBe(false);
    });

    it('is reg exp', () => {
        expect(isRegExp(/abc/)).toBe(true);
        expect(isRegExp('/abc/')).toBe(false);
        expect(isRegExp(null)).toBe(false);
    });

    it('is js object', () => {
        expect(isJsObject({})).toBe(true);
        expect(isJsObject([])).toBe(true);
        expect(isJsObject(() => {})).toBe(true);
        expect(isJsObject(new Date())).toBe(true);
        expect(isJsObject(null)).toBe(false);
        expect(isJsObject(1)).toBe(false);
        expect(isJsObject('string')).toBe(false);
    });

    describe('isHtmlElement', () => {
        it('should return true for an instance of Element', () => {
            const mockElement = document.createElement('div'); // JSDOM Element
            expect(isHtmlElement(mockElement)).toBe(true);
        });

        it('should return false for non-Element values', () => {
            expect(isHtmlElement({}) as any).toBe(false);
            expect(isHtmlElement(null as any)).toBe(false);
            expect(isHtmlElement(undefined as any)).toBe(false);
            expect(isHtmlElement('string' as any)).toBe(false);
        });
    });

    describe('hasProperty', () => {
        const obj = { a: 1, b: undefined, c: null };

        it('should return true for existing own properties', () => {
            expect(hasProperty(obj, 'a')).toBe(true);
            expect(hasProperty(obj, 'b')).toBe(true);
            expect(hasProperty(obj, 'c')).toBe(true);
        });

        it('should return false for non-existent properties', () => {
            expect(hasProperty(obj, 'd')).toBe(false);
        });

        it('should return false for properties on prototype chain', () => {
            const proto = { p: 'proto' };
            const child = Object.create(proto);
            child.own = 'own';
            expect(hasProperty(child, 'p')).toBe(false);
        });

        it('should return false for null or undefined object', () => {
            expect(hasProperty(null, 'a')).toBe(false);
            expect(hasProperty(undefined, 'a')).toBe(false);
        });

        it('should return false for null or undefined key', () => {
            expect(hasProperty(obj, null as any)).toBe(false);
            expect(hasProperty(obj, undefined as any)).toBe(false);
            expect(hasProperty(obj, '' as any)).toBe(false);
        });
    });

    describe('isWindow and isBrowser', () => {
        it('isWindow should return false for non-window objects', () => {
            expect(isWindow({})).toBe(false);
            expect(isWindow(null)).toBe(false);
            expect(isWindow(undefined)).toBe(false);
        });

        it('isBrowser should return true in a browser-like environment', () => {
            expect(isBrowser).toBe(true);
        });
    });

    describe('toRawType', () => {
        it('should return the raw type of various values', () => {
            expect(toRawType({})).toBe('Object');
            expect(toRawType([])).toBe('Array');
            expect(toRawType('')).toBe('String');
            expect(toRawType(1)).toBe('Number');
            expect(toRawType(true)).toBe('Boolean');
            expect(toRawType(null)).toBe('Null');
            expect(toRawType(undefined)).toBe('Undefined');
            expect(toRawType(() => {})).toBe('Function');
            expect(toRawType(new Date())).toBe('Date');
            expect(toRawType(/abc/)).toBe('RegExp');
        });
    });

    describe('isTruthyAndNotEmpty', () => {
        it('should return false for falsy values', () => {
            expect(isTruthyAndNotEmpty(false)).toBe(false);
            expect(isTruthyAndNotEmpty(0)).toBe(false);
            expect(isTruthyAndNotEmpty('')).toBe(false);
            expect(isTruthyAndNotEmpty(null)).toBe(false);
            expect(isTruthyAndNotEmpty(undefined)).toBe(false);
            expect(isTruthyAndNotEmpty(Number.NaN)).toBe(false);
        });

        it('should return false for empty arrays', () => {
            expect(isTruthyAndNotEmpty([])).toBe(false);
        });

        it('should return false for empty objects', () => {
            expect(isTruthyAndNotEmpty({})).toBe(false);
        });

        it('should return true for non-empty arrays', () => {
            expect(isTruthyAndNotEmpty([1])).toBe(true);
            expect(isTruthyAndNotEmpty(['a'])).toBe(true);
            expect(isTruthyAndNotEmpty([{}])).toBe(true);
        });

        it('should return true for non-empty objects', () => {
            expect(isTruthyAndNotEmpty({ a: 1 })).toBe(true);
            expect(isTruthyAndNotEmpty({ b: 'hello' })).toBe(true);
        });

        it('should return true for other truthy values', () => {
            expect(isTruthyAndNotEmpty(1)).toBe(true);
            expect(isTruthyAndNotEmpty('hello')).toBe(true);
            expect(isTruthyAndNotEmpty(true)).toBe(true);
            expect(isTruthyAndNotEmpty(new Date())).toBe(true);
            expect(isTruthyAndNotEmpty(/a/)).toBe(true);
        });
    });
});
