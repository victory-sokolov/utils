import { isBlank, isPlainObject, isTruthyAndNotEmpty } from './is';
import type { RecordObject } from './types';

/**
 * Remove specific keys from object
 * @param objOrArray - Object or array of objects from which to remove keys
 * @param keys - Keys to remove from object
 * @returns Object or array of objects with keys removed
 */
export const omit = <T extends Record<string, unknown>, K extends keyof T>(
    objOrArray: T | T[],
    ...keys: K[]
): Omit<T, K> | Omit<T, K>[] => {
    // Function to remove keys from a single object
    const omitKeysFromObject = (obj: T): T => {
        const newObj: Record<string, unknown> = {};
        for (const key in obj) {
            if (Object.hasOwn(obj, key) && !keys.includes(key as unknown as K)) {
                newObj[key] = obj[key];
            }
        }
        return newObj as T;
    };

    // Check if input is an array of objects
    if (Array.isArray(objOrArray)) {
        return objOrArray.map(item => omitKeysFromObject(item));
    }
    // Input is a single object
    return omitKeysFromObject(objOrArray);
};

/**
 * Pick specific keys from object
 * @param obj - Object from which to pick keys
 * @param props - Keys to select from object
 * @returns Object with selected keys
 */
export const pick = <T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    ...props: K[]
): { [P in K]: T[P] } => {
    const filteredArray = Object.entries(obj).filter(([key]) => props.includes(key as K));
    return Object.fromEntries(filteredArray) as Pick<T, K>;
};

/**
 * Flatten nested objects into a single object
 * @param obj Object to flatten
 * @returns Flatten object
 */
export const flattenObject = (obj: RecordObject): RecordObject => {
    const flattened: Record<string, unknown> = {};

    for (const key of Object.keys(obj)) {
        const value = obj[key];

        if (isPlainObject(value)) {
            Object.assign(flattened, flattenObject(value as RecordObject));
        } else {
            flattened[key] = value;
        }
    }

    return flattened;
};

/**
 * Removes falsy or empty values (`null`, `undefined`, `''`, `0`, `false`, etc.)
 * from a plain object or an array of objects.
 *
 * - If you pass an object, returns a new object with falsy values removed.
 * - If you pass an array, returns a new array of objects with each item filtered.
 *
 * @template T - The object type to filter.
 * @param {T | T[]} obj - An object or array of objects to filter.
 * @returns {T | T[]} A filtered object (or array of filtered objects) of the same shape.
 *
 * @example
 * ```ts
 * filterFalsyFromObject({ a: 1, b: '', c: null });
 * // => { a: 1 }
 *
 * filterFalsyFromObject([{ a: 1, b: '' }, { a: 0, b: 'ok' }]);
 * // => [{ a: 1 }, { b: 'ok' }]
 * ```
 */
export function filterFalsyFromObject<T extends RecordObject>(obj: T): T;
export function filterFalsyFromObject<T extends RecordObject>(arr: T[]): T[];
export function filterFalsyFromObject<T extends RecordObject | RecordObject[]>(objOrArray: T): T {
    const filterObject = <U extends RecordObject>(obj: U): U => {
        const result = {} as U;
        for (const key in obj) {
            if (Object.hasOwn(obj, key) && isTruthyAndNotEmpty(obj[key])) {
                result[key] = obj[key];
            }
        }
        return result;
    };

    if (Array.isArray(objOrArray)) {
        return objOrArray.map(item => filterObject(item)) as T;
    }
    return filterObject(objOrArray) as T;
}

/**
 * Union two objects and exclude false values when merging same keys
 * @param left
 * @param right
 * @returns New combined object
 */
const copyValue = (value: unknown): unknown => {
    if (isPlainObject(value)) {
        const obj = value as RecordObject;
        const copy: RecordObject = {};
        for (const key in obj) {
            if (Object.hasOwn(obj, key)) {
                copy[key] = obj[key];
            }
        }
        return copy;
    }
    return value;
};

const processObject = (obj: RecordObject, result: RecordObject): void => {
    for (const key in obj) {
        if (Object.hasOwn(obj, key) && obj[key]) {
            result[key] = copyValue(obj[key]);
        }
    }
};

export const unionWithExclusion = (left: RecordObject, right: RecordObject): RecordObject => {
    const result: RecordObject = {};
    processObject(left, result);
    for (const key in right) {
        if (Object.hasOwn(right, key) && right[key]) {
            const value = right[key];
            const existing = result[key];
            if (isPlainObject(value) && isPlainObject(existing)) {
                result[key] = unionWithExclusion(existing, value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
};

/**
 * Flip objects keys with objects values
 * @param data Input object data
 * @returns Inverted object
 */
export const flip = (data: RecordObject): RecordObject =>
    Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]));

/**
 * Filter array of objects and remove dublicates by provided key
 * @param data Array of objects
 * @param key Key lookup
 * @returns Filtered object
 */
export const uniqueObject = (data: RecordObject[], key: string): RecordObject[] => [
    ...new Map(data.map(item => [item[key], item])).values(),
];

/**
 * Strict typed `Object.keys`
 *
 * @category Object
 */
export const objectKeys = <T extends object>(
    obj: T,
): `${keyof T & (string | number | boolean | null | undefined)}`[] =>
    Object.keys(obj) as `${keyof T & (string | number | boolean | null | undefined)}`[];

/**
 * Strict typed `Object.entries`
 *
 * @category Object
 */
export const objectEntries = <T extends object>(obj: T): [keyof T, T[keyof T]][] =>
    Object.entries(obj) as [keyof T, T[keyof T]][];

/**
 * Get unique keys, values by provided key
 * const objArry = [{ id: 1 }, { id: 1 }, { id: 2 }, { id: 3 }];
    getUniqueByKey(objArry, 'id'); // [ { id: 1 }, { id: 2 }, { id: 3 } ]
 * @param arr
 * @param key
 * @returns Unique array of objects
 */
export const getUniqueByKey = <T>(arr: T[], key: keyof T): T[] => [
    ...new Map(arr.map(item => [item[key], item])).values(),
];

/**
 * Remove properties from object where predicate returns true
 * @param obj - Object to filter
 * @param predicate - Function that returns true for properties to remove
 * @returns Object with properties removed
 * @example
 * omitBy({ a: 1, b: null, c: undefined }, (v) => v === null || v === undefined)
 * // => { a: 1 }
 */
export const omitBy = <T extends Record<string, unknown>, K extends keyof T & string>(
    obj: T,
    predicate: (value: T[K], key: K) => boolean,
): Partial<T> => {
    const result: Partial<T> = {};
    for (const [key, value] of Object.entries(obj) as [K, T[K]][]) {
        if (!predicate(value, key)) {
            result[key] = value;
        }
    }
    return result;
};

type RemoveEmptyCache = WeakMap<object, unknown>;

// oxlint-disable-next-line max-statements
const removeEmptyArray = <U>(
    arr: unknown[],
    cache: RemoveEmptyCache,
    recurse: typeof removeEmptyValue,
): U | null => {
    if (cache.has(arr)) {
        return cache.get(arr) as U | null;
    }
    const result: unknown[] = [];
    cache.set(arr, result);

    for (const item of arr) {
        const cleaned = recurse(item, cache);
        if (cleaned !== null) {
            result.push(cleaned);
        }
    }

    if (result.length === 0) {
        return null;
    }
    return result as U | null;
};

// oxlint-disable-next-line max-statements
const removeEmptyObject = <U>(
    obj: Record<string, unknown>,
    cache: RemoveEmptyCache,
    recurse: typeof removeEmptyValue,
): U | null => {
    if (cache.has(obj)) {
        return cache.get(obj) as U | null;
    }
    const result: Record<string, unknown> = {};
    cache.set(obj, result);

    for (const [key, itemValue] of Object.entries(obj)) {
        const cleaned = recurse(itemValue, cache);
        if (cleaned !== null) {
            result[key] = cleaned;
        }
    }

    if (Object.keys(result).length === 0) {
        return null;
    }
    return result as U | null;
};

const removeEmptyValue = <U>(val: U, cache: RemoveEmptyCache): U | null => {
    if (isBlank(val)) {
        return null;
    }

    if (Array.isArray(val)) {
        return removeEmptyArray<U>(val, cache, removeEmptyValue);
    }

    if (isPlainObject(val)) {
        return removeEmptyObject<U>(val as Record<string, unknown>, cache, removeEmptyValue);
    }

    return val;
};

/**
 * Recursively remove empty values (null, undefined, '', [], {}) from object or array
 * @param value - Value to clean
 * @returns Cleaned value or null if result is empty
 * @example
 * removeEmpty({ a: 1, b: null, c: { d: [], e: 'hello' } })
 * // => { a: 1, c: { e: 'hello' } }
 */
export const removeEmpty = <T>(value: T): T | null => {
    const cache: RemoveEmptyCache = new WeakMap();
    return removeEmptyValue(value, cache);
};

type DeepCloneCache = WeakMap<object, unknown>;

// oxlint-disable-next-line max-statements
const cloneArray = <U>(arr: unknown[], cache: DeepCloneCache, recurse: typeof cloneValue): U => {
    if (cache.has(arr)) {
        return cache.get(arr) as U;
    }
    const result: unknown[] = [];
    cache.set(arr, result);

    for (let idx = 0; idx < arr.length; idx += 1) {
        result[idx] = recurse(arr[idx], cache);
    }

    return result as U;
};

// oxlint-disable-next-line max-statements
const cloneObject = <U>(obj: Record<string, unknown>, cache: DeepCloneCache, recurse: typeof cloneValue): U => {
    if (cache.has(obj)) {
        return cache.get(obj) as U;
    }
    const result: Record<string, unknown> = {};
    cache.set(obj, result);

    for (const [key, val] of Object.entries(obj)) {
        result[key] = recurse(val, cache);
    }

    return result as U;
};

const cloneValue = <U>(val: U, cache: DeepCloneCache): U => {
    if (val === null || typeof val !== 'object') {
        return val;
    }

    if (Array.isArray(val)) {
        return cloneArray<U>(val, cache, cloneValue);
    }

    if (isPlainObject(val)) {
        return cloneObject<U>(val as Record<string, unknown>, cache, cloneValue);
    }

    if (typeof structuredClone === 'function') {
        return structuredClone(val) as U;
    }

    return val;
};

/**
 * Deep clone an object using structured cloning
 * @param obj - Object to clone
 * @returns Deep cloned object
 * @example
 * const original = { a: 1, b: { c: 2 } }
 * const cloned = deepClone(original)
 * cloned.b.c = 3
 * original.b.c // still 2
 */
export const deepClone = <T>(obj: T): T => {
    const cache: DeepCloneCache = new WeakMap();
    return cloneValue(obj, cache);
};
