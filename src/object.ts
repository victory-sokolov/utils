import { RecordObject } from './types';

/**
 * Remove specific keys from object
 * @param obj Object from which to remove keys
 * @param props Keys to remove from object
 * @returns Object with keys removed
 */
export const omit = <T extends Record<string, any>, K extends keyof T>(
    obj: T,
    ...keys: K[]
): { [P in K]: T[P] } => {
    keys.forEach((key) => delete obj[key]);
    return obj;
};

/**
 * Pick specific keys from object
 * @param obj Object from which to pick keys
 * @param props Keys to select from object
 * @returns Object with selected keys
 */
export const pick = <T extends Record<string, any>, K extends keyof T>(
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
    const flattened: { [k: string]: unknown } = {};

    Object.keys(obj).forEach((key) => {
        const value = obj[key];

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(flattened, flattenObject(value as RecordObject));
        } else {
            flattened[key] = value;
        }
    });

    return flattened;
};

/**
 * Filter falsy values from object
 * @param obj Object to filter
 * @returns Filtered object
 */
export const filterFalsyFromObject = <T extends RecordObject>(obj: T): RecordObject => {
    return Object.keys(obj).reduce((acc: RecordObject, key) => {
        if (obj[key]) {
            acc[key] = obj[key];
        }
        return acc;
    }, {} as T);
};

/**
 * Union two objects and exclude false values when merging same keys
 * @param left
 * @param right
 * @returns New combined object
 */
export const unionWithExclusion = (left: RecordObject, right: RecordObject): RecordObject => {
    return [left, right].reduce((prev, current) => {
        if (current) {
            Object.entries(current).map(([key, value]) => {
                if (!value) return;
                // @ts-ignore
                prev[key] =
                    typeof value === 'object'
                        ? // @ts-ignore
                          unionWithExclusion(prev[key], value)
                        : value;
            });
        }
        return prev;
    }, {});
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
export const uniqueObject = (data: RecordObject[], key: string): RecordObject[] => {
    return [...new Map(data.map((item) => [item[key], item])).values()];
};

/**
 * Strict typed `Object.keys`
 *
 * @category Object
 */
export const objectKeys = <T extends object>(obj: T) => {
    return Object.keys(obj) as Array<`${keyof T & (string | number | boolean | null | undefined)}`>;
};

/**
 * Strict typed `Object.entries`
 *
 * @category Object
 */
export const objectEntries = <T extends object>(obj: T) => {
    return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
};

/**
 * Get unique keys, values by provided key
 * const objArry = [{ id: 1 }, { id: 1 }, { id: 2 }, { id: 3 }];
    getUniqueByKey(objArry, 'id'); // [ { id: 1 }, { id: 2 }, { id: 3 } ]
 * @param arr 
 * @param key 
 * @returns Unique array of objects
 */
export const getUniqueByKey = <T>(arr: T[], key: keyof T): T[] => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
};
