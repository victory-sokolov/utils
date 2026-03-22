// Source: https://github.com/antfu/utils/blob/main/src/is.ts
/**
 * Get the string representation of a value's type
 * @param v - The value to get type string for
 * @returns The type string
 */
export const toString = (value: unknown): string => Object.prototype.toString.call(value);

/**
 * Check if a value is undefined
 * @param val - The value to check
 * @returns True if the value is undefined
 */
export const isUndefined = (val: unknown): val is undefined =>
    toString(val) === '[object Undefined]';

/**
 * Check if a value is defined (not undefined)
 * @param val - The value to check
 * @returns True if the value is not undefined
 */
export const isDef = <T = unknown>(val: T): val is Exclude<T, undefined> => !isUndefined(val);

/**
 * Check if a value is a boolean
 * @param val - The value to check
 * @returns True if the value is a boolean
 */
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean';

/**
 * Check if a value is a function
 * @param val - The value to check
 * @returns True if the value is a function
 */
export const isFunction = <T>(val: T): val is T => typeof val === 'function';

/**
 * Check if a value is a number
 * @param val - The value to check
 * @returns True if the value is a number
 */
export const isNumber = (val: unknown): val is number => typeof val === 'number';

/**
 * Check if a value is a string
 * @param val - The value to check
 * @returns True if the value is a string
 * @example
 * isString('hello'); // true
 */
export const isString = (val: unknown): val is string => typeof val === 'string';

/**
 * Check if a value is an object (not null)
 * @param val - The value to check
 * @returns True if the value is an object
 */
export const isObject = (val: unknown): val is Record<string, unknown> =>
    typeof val === 'object' && val !== null;

/**
 * Check if a value is null
 * @param val - The value to check
 * @returns True if the value is null
 */
export const isNull = (val: unknown): val is null => toString(val) === '[object Null]';

/**
 * Check if a value is a RegExp
 * @param val - The value to check
 * @returns True if the value is a RegExp
 */
export const isRegExp = (val: unknown): val is RegExp => toString(val) === '[object RegExp]';

/**
 * Check if a value is a Date
 * @param val - The value to check
 * @returns True if the value is a Date
 */
export const isDate = (val: unknown): val is Date => toString(val) === '[object Date]';

/**
 * Check if a value is a JavaScript object or function
 * @param val - The value to check
 * @returns True if the value is an object or function
 */
export const isJsObject = (val: unknown): boolean =>
    val !== null && (typeof val === 'function' || typeof val === 'object');

/**
 * Check if a value is an HTML element
 * @param element - The element to check
 * @returns True if the value is an HTML element
 */
export const isHtmlElement = (element: unknown): element is Element => element instanceof Element;

/**
 * Check if an object has a specific property
 * @param obj - The object to check
 * @param key - The property key
 * @returns True if the object has the property
 */
export const hasProperty = (obj: unknown, key: string): boolean => {
    if (typeof obj !== 'object' || obj === null || !key) {
        return false;
    }
    return Object.hasOwn(obj, key);
};

/**
 * Check if a value is the window object
 * @param val - The value to check
 * @returns True if the value is the window object
 */
export const isWindow = (val: unknown): boolean =>
    'window' in globalThis && toString(val) === '[object Window]';

/**
 * Check if the code is running in a browser
 * @returns True if running in browser
 */
export const isBrowser = 'window' in globalThis;

/**
 * Convert type [Object object] to raw type Object
 */
export const toRawType = (value: unknown): string => {
    const _toString = Object.prototype.toString;
    return _toString.call(value).slice(8, -1);
};

/**
 * Checks whether a value is "truthy" and not an empty object or empty array.
 *
 * Rules:
 * - Falsy values (false, 0, '', null, undefined, NaN) return false.
 * - Empty arrays ([]) return false.
 * - Empty objects ({}) return false.
 * - All other values (non-empty arrays, non-empty objects, numbers, strings, booleans, etc.) return true.
 *
 * @param value - The value to check.
 * @returns `true` if the value is considered meaningful, otherwise `false`.
 */
export const isTruthyAndNotEmpty = (value: unknown): boolean => {
    if (!value) {
        return false;
    }
    if (Array.isArray(value) && value.length === 0) {
        return false;
    }
    if (
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        !isDate(value) &&
        !isRegExp(value) &&
        Object.keys(value).length === 0
    ) {
        return false;
    }
    return true;
};

/**
 * Check if a value is a plain object (created by {} or new Object())
 * Returns false for arrays, Date, RegExp, Map, Set, class instances, etc.
 *
 * @param val - The value to check
 * @returns True if the value is a plain object
 *
 * @example
 * isPlainObject({}) // true
 * isPlainObject({ a: 1 }) // true
 * isPlainObject([]) // false
 * isPlainObject(new Date()) // false
 * isPlainObject(null) // false
 * isPlainObject(class Foo {}) // false
 */
export const isPlainObject = (val: unknown): val is Record<string, unknown> => {
    if (typeof val !== 'object' || val === null || Array.isArray(val)) {
        return false;
    }
    // Object.create(null) has no prototype
    const proto = Object.getPrototypeOf(val);
    return proto === null || proto === Object.prototype;
};

/**
 * Check if a value is empty (null, undefined, empty string, empty array, or empty plain object)
 *
 * @param value - The value to check
 * @returns True if the value is empty
 *
 * @example
 * isEmpty(null) // true
 * isEmpty(undefined) // true
 * isEmpty('') // true
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty(0) // false
 * isEmpty(false) // false
 * isEmpty('hello') // false
 * isEmpty([1]) // false
 * isEmpty({ a: 1 }) // false
 */
export const isEmpty = (value: unknown): boolean => {
    if (isNull(value) || isUndefined(value) || value === '') {
        return true;
    }
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    if (isPlainObject(value)) {
        return Object.keys(value).length === 0;
    }
    return false;
};

/**
 * Check if a value is blank (null, undefined, or empty string)
 * Preserves 0 and false unlike falsy checks
 *
 * @param value - The value to check
 * @returns True if the value is blank
 *
 * @example
 * isBlank(null) // true
 * isBlank(undefined) // true
 * isBlank('') // true
 * isBlank(0) // false
 * isBlank(false) // false
 */
export const isBlank = (value: unknown): boolean =>
    isNull(value) || isUndefined(value) || value === '';
