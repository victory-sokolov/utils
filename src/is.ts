// Source: https://github.com/antfu/utils/blob/main/src/is.ts
export const toString = (v: any) => Object.prototype.toString.call(v);

export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined';
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean';
export const isFunction = <T>(val: T): val is T => typeof val === 'function';
export const isNumber = (val: any): val is number => typeof val === 'number';
export const isString = (val: unknown): val is string => typeof val === 'string';
export const isObject = (val: unknown): val is Record<string, unknown> =>
    typeof val === 'object' && val !== null;
export const isUndefined = (val: any): val is undefined => toString(val) === '[object Undefined]';
export const isNull = (val: any): val is null => toString(val) === '[object Null]';
export const isRegExp = (val: any): val is RegExp => toString(val) === '[object RegExp]';
export const isDate = (val: any): val is Date => toString(val) === '[object Date]';
export const isJsObject = (val: any) =>
    val !== null && (typeof val === 'function' || typeof val === 'object');
export const isHtmlElement = (element: Element): boolean => element instanceof Element;
export const hasProperty = (obj: any, key: string): boolean => {
    if (!obj || !key) {
        return false;
    }
    return Object.prototype.hasOwnProperty.call(obj, key);
};

// @ts-ignore
export const isWindow = (val: any): boolean =>
    typeof window !== 'undefined' && toString(val) === '[object Window]';
// @ts-ignore
export const isBrowser = typeof window !== 'undefined';

/**
 * Convert type [Object object] to raw type Object
 */
export const toRawType = (value: unknown): string => {
    const _toString = Object.prototype.toString;
    return _toString.call(value).slice(8, -1);
};
