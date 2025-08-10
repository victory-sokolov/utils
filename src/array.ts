import type { Collection, IndexCallback, RecordObject } from './types';
import { hasProperty, isString } from './is';

/**
 * Flatten nested array into 1 dimensional array
 * @param listOfArrays List of arrays to flatten
 * @returns flattened array
 */
export const flattenArray = <T>(
    listOfArrays: ReadonlyArray<T>
): ReadonlyArray<T> => {
    return listOfArrays.reduce((res, arr) => {
        return [...res, ...(Array.isArray(arr) ? flattenArray(arr) : [arr])];
    }, [] as T[]);
};

/**
 * Get unique values from array
 * @param array
 * @returns array of unique values
 */
export const unique = <T>(array: readonly T[]): Collection<T> => {
    return Array.from(new Set(array));
};

/**
 * Remove item from array by value
 * @param array
 * @param values
 * @returns array with removed items
 */
export const removeItem = <T>(
    array: Collection<T>,
    values: T[]
): Collection<T> => {
    return array.filter((item) => !values.includes(item));
};

/**
 *
 * @param arr Array of date
 * @param count Amount of items to select from array
 * @returns Array with all randomly selected items
 */
export const randomItem = <T>(arr: T[], count: number): Array<T> => {
    if (count === 0) return arr;
    if (count > arr.length) return arr;

    return Array.from(
        { length: count },
        () => arr[Math.round(Math.random() * (arr.length - 1))] as T
    );
};

/**
 * Shuffle array values and returns a new array
 * @param arr Array to shuffle
 * @returns Shuffled array
 */
export const shuffleArray = <T>(arr: Collection<T>): Collection<T> => {
    return arr
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};

/**
 * Sort array of objects in Ascending order
 * @param array Array of objects to sort
 * @returns Sorted array of objects
 */
export const sortAsc = <T extends Record<string, any>>(
    array: ReadonlyArray<T>
): ReadonlyArray<T> => {
    return [...array].sort((a, b) => {
        if (a.key < b.key) {
            return -1;
        } else if (a.key > b.key) {
            return 1;
        }
        return 0;
    });
};

const fSort = (firstValue: number, secondValue: number): number => {
    return firstValue > secondValue ? 1 : firstValue < secondValue ? -1 : 0;
};

/**
 * Sort array by specific function
 * @param arr Array to sort
 * @param fSorting Function sorting algorithm
 * @returns Sorted array
 */
export const sort = <T extends Record<string, unknown>>(
    arr: T[] = [],
    fSorting: ((a: T, b: T) => number) | null = null
): T[] => {
    const copyArray = [...arr];
    const fn
        = fSorting
            || ((a: T, b: T) => {
                const valA = Number(Object.values(a)[0]);
                const valB = Number(Object.values(b)[0]);
                return fSort(valA, valB);
            });
    copyArray.sort(fn);
    return copyArray;
};
/**
 *
 * @param arr Array to sort
 * @param order Order 1 - ascending -1 descending
 * @param key Key to sort by
 * @returns Sorted array of objects
 */
export const sortBy = (
    arr: Array<RecordObject> = [],
    order: number = 1,
    key: string = ''
): Array<RecordObject> => {
    if (!isString(key) || !hasProperty(arr[0], key)) {
        return arr;
    }
    return sort(arr, (m: RecordObject, n: RecordObject) => {
        return m[key] > n[key] ? order : m[key] < n[key] ? -1 * order : 0;
    });
};

/**
 * Insert an item at a given index
 * @param index an index or a callback provided to findIndex
 * @param value the value of the item to insert
 * @param arr the array to insert into
 */
export const insertItemAtIndex = <T>(
    index: number | IndexCallback<T>,
    value: T,
    arr?: T[] | null
) => {
    if (!arr) {
        return [];
    }

    const indexAt = typeof index === 'function' ? arr.findIndex(index) : index;
    if (indexAt === -1) {
        return arr;
    }

    return [...arr.slice(0, indexAt), value, ...arr.slice(indexAt)];
};

/**
 * Replace an item at a given index
 * @param index an index or a callback provided to findIndex
 * @param newValue the value of the item to be replaced
 * @param arr the array to replace at
 */
export const replaceItemAtIndex = <T>(
    index: number | IndexCallback<T>,
    newValue: T,
    arr?: T[] | null
) => {
    if (!arr) {
        return [];
    }

    const indexAt = typeof index === 'function' ? arr.findIndex(index) : index;

    if (indexAt === -1) {
        return arr;
    }

    return [...arr.slice(0, indexAt), newValue, ...arr.slice(indexAt + 1)];
};

/**
 * Remove an item at an index
 * @param index an index or a callback provided to findIndex
 * @param arr the array to remove from
 */
export const removeItemAtIndex = <T>(
    index: number | IndexCallback<T>,
    arr?: T[] | null
) => {
    if (!arr) {
        return [];
    }

    const indexAt = typeof index === 'function' ? arr.findIndex(index) : index;

    if (indexAt === -1) {
        return arr;
    }

    return [...arr.slice(0, indexAt), ...arr.slice(indexAt + 1)];
};

/**
 * Find median value of an array
 * @param arr Array to find median
 * @returns Median value
 */
export const median = (arr: number[]): number => {
    if (arr.length === 0) return 0;

    const mid = Math.floor(arr.length / 2);
    const nums = [...arr].sort((a, b) => a - b);
    return (
        arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1]! + nums[mid]!) / 2
    ) as number;
};

/**
 * Intersect two arrays
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 * @param arr1 First array
 * @param arr2 Second array
 * @returns Array of intersection
 */
export const intersection = <T>(arr1: T[], arr2: T[]): T[] => {
    const set = new Set(arr1);
    return arr2.filter((x) => set.has(x));
};

/**
 * Count the number of element occurs in the array
 * @param array Array of elements to
 * @returns Object where keys are array values and value is time el occurs in the array
 */
export const countBy = (
    array: Array<number | string>
): Record<string, number> => {
    return array.reduce((obj: { [key: string]: number }, item) => {
        if (item in obj) {
            // item is already a key so increment
            obj[item]! += 1;
        } else {
            // first time seeing item so initialize it
            // with count of 1
            obj[item] = 1;
        }

        return obj;
    }, {});
};

/**
 * Count occurrences of specific key in the object
 * @param data Array data
 * @returns Object of passed in elements and how many times it occurs in the array
 */
export const occurrenceCount = <T>(data: Array<T>) => {
    const unique = Array.from(new Set(data));
    return Object.fromEntries(
        unique.map((char) => {
            const occurrenceCount = data.filter((c) => c === char).length;
            return [char, occurrenceCount];
        })
    );
};
