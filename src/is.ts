// Source: https://github.com/antfu/utils/blob/main/src/is.ts
/**
 * Get the string representation of a value's type
 * @param v - The value to get type string for
 * @returns The type string
 */
export const toString = (v: any) => Object.prototype.toString.call(v);

/**
 * Check if a value is defined (not undefined)
 * @param val - The value to check
 * @returns True if the value is not undefined
 */
export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined';

/**
 * Check if a value is a boolean
 * @param val - The value to check
 * @returns True if the value is a boolean
 */
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean';

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
export const isNumber = (val: any): val is number => typeof val === 'number';

/**
 * Check if a value is a string
 * @param val - The value to check
 * @returns True if the value is a string
 */
export const isString = (val: unknown): val is string =>
    typeof val === 'string';

/**
 * Check if a value is an object (not null)
 * @param val - The value to check
 * @returns True if the value is an object
 */
export const isObject = (val: unknown): val is Record<string, unknown> =>
    typeof val === 'object' && val !== null;

/**
 * Check if a value is undefined
 * @param val - The value to check
 * @returns True if the value is undefined
 */
export const isUndefined = (val: any): val is undefined =>
    toString(val) === '[object Undefined]';

/**
 * Check if a value is null
 * @param val - The value to check
 * @returns True if the value is null
 */
export const isNull = (val: any): val is null =>
    toString(val) === '[object Null]';

/**
 * Check if a value is a RegExp
 * @param val - The value to check
 * @returns True if the value is a RegExp
 */
export const isRegExp = (val: any): val is RegExp =>
    toString(val) === '[object RegExp]';

/**
 * Check if a value is a Date
 * @param val - The value to check
 * @returns True if the value is a Date
 */
export const isDate = (val: any): val is Date =>
    toString(val) === '[object Date]';

/**
 * Check if a value is a JavaScript object or function
 * @param val - The value to check
 * @returns True if the value is an object or function
 */
export const isJsObject = (val: any) =>
    val !== null && (typeof val === 'function' || typeof val === 'object');

/**
 * Check if a value is an HTML element
 * @param element - The element to check
 * @returns True if the value is an HTML element
 */
export const isHtmlElement = (element: unknown): element is Element =>
    element instanceof Element;

/**
 * Check if an object has a specific property
 * @param obj - The object to check
 * @param key - The property key
 * @returns True if the object has the property
 */
export const hasProperty = (obj: any, key: string): boolean => {
    if (!obj || !key) {
        return false;
    }
    return Object.prototype.hasOwnProperty.call(obj, key);
};

// @ts-ignore
/**
 * Check if a value is the window object
 * @param val - The value to check
 * @returns True if the value is the window object
 */
export const isWindow = (val: any): boolean =>
    typeof window !== 'undefined' && toString(val) === '[object Window]';
// @ts-ignore
/**
 * Check if the code is running in a browser
 * @returns True if running in browser
 */
export const isBrowser = typeof window !== 'undefined';

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
    if (!value) return false; // falsy
    if (Array.isArray(value) && value.length === 0) return false; // empty array
    if (
        value
        && typeof value === 'object'
        && !Array.isArray(value)
        && !isDate(value)
        && !isRegExp(value)
        && Object.keys(value).length === 0
    ) {
        return false;
    }
    return true;
};
