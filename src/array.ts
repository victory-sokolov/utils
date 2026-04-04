import type { Collection, IndexCallback, Maybe } from './types';
import { hasProperty, isString } from './is';

/**
 * Flatten nested array into 1 dimensional array
 * @param listOfArrays List of arrays to flatten
 * @returns flattened array
 */
export const flattenArray = <T>(listOfArrays: readonly T[]): T[] => {
    const result: T[] = [];
    for (const arr of listOfArrays) {
        if (Array.isArray(arr)) {
            result.push(...flattenArray(arr));
        } else {
            result.push(arr);
        }
    }
    return result;
};

/**
 * Get unique values from array
 * @param array - The array to get unique values from
 * @returns Array of unique values
 */
export const unique = <T>(array: readonly T[]): Collection<T> => [...new Set(array)];

/**
 * Remove item from array by value
 * @param array - The array to remove items from
 * @param values - The values to remove from the array
 * @returns Array with removed items
 */
export const removeItem = <T>(array: Collection<T>, values: T[]): Collection<T> =>
    array.filter(item => !values.includes(item));

/**
 * Get random items from array
 * @param arr - Array of items
 * @param count - Amount of items to select from array
 * @returns Array with randomly selected items
 */
export const randomItem = <T>(arr: T[], count: number): T[] => {
    if (count === 0) {
        return arr;
    }
    if (count > arr.length) {
        return arr;
    }

    return Array.from(
        { length: count },
        () => arr[Math.round(Math.random() * (arr.length - 1))] as T,
    );
};

/**
 * Shuffle array values and returns a new array
 * @param arr Array to shuffle
 * @returns Shuffled array
 */
export const shuffleArray = <T>(arr: Collection<T>): Collection<T> =>
    arr
        .map(value => ({ sort: Math.random(), value }))
        .toSorted((first, second) => first.sort - second.sort)
        .map(({ value }) => value);

/**
 * Sort array of objects in ascending order by 'key' property
 * @param array - Array of objects to sort
 * @returns Sorted array of objects
 */
export const sortAsc = <T extends { key: string | number }>(array: readonly T[]): readonly T[] =>
    [...array].toSorted((first, second) => {
        if (first.key < second.key) {
            return -1;
        } else if (first.key > second.key) {
            return 1;
        }
        return 0;
    });

const fSort = (firstValue: number, secondValue: number): number => {
    if (firstValue > secondValue) {
        return 1;
    }
    if (firstValue < secondValue) {
        return -1;
    }
    return 0;
};

/**
 * Sort array by specific function or by the first numeric value in objects
 * @param arr - Array to sort
 * @param fSorting - Function sorting algorithm, defaults to sorting by first numeric value
 * @returns Sorted array
 */
export const sort = <T extends Record<string, unknown>>(
    arr: T[],
    fSorting?: (first: T, second: T) => number,
): T[] => {
    const copyArray = [...arr];
    const fn =
        fSorting ||
        ((first: T, second: T): number => {
            const valA = Number(Object.values(first)[0]);
            const valB = Number(Object.values(second)[0]);
            return fSort(valA, valB);
        });
    copyArray.sort(fn);
    return copyArray;
};

/**
 * Sort array of objects by a specific key
 * @param arr - Array to sort
 * @param order - Order: 1 for ascending, -1 for descending
 * @param key - Key to sort by
 * @returns Sorted array of objects
 */
export const sortBy = <T extends Record<string, unknown>>(
    arr: T[] = [],
    order = 1,
    key = '',
): T[] => {
    if (!isString(key) || arr.length === 0 || !hasProperty(arr[0], key)) {
        return arr;
    }

    return sort(arr, (firstItem, secondItem) => {
        const firstValue = firstItem[key];
        const secondValue = secondItem[key];

        if (typeof firstValue === 'number' && typeof secondValue === 'number') {
            return (firstValue - secondValue) * order;
        }

        if (typeof firstValue === 'string' && typeof secondValue === 'string') {
            return firstValue.localeCompare(secondValue) * order;
        }

        return 0;
    });
};

/**
 * Resolve index from a number or callback function.
 * Converts either a numeric index or a finder callback into a numeric index.
 *
 * @param index - A numeric index or a callback function to find the index
 * @param arr - The array to search in (used when index is a callback)
 * @returns The resolved numeric index
 *
 * @example
 * // Using a number directly
 * resolveIndex(2, ['a', 'b', 'c']) // returns 2
 *
 * @example
 * // Using a callback to find by condition
 * resolveIndex(item => item.id === 'foo', [{id: 'bar'}, {id: 'foo'}]) // returns 1
 */
const resolveIndex = <T>(index: number | IndexCallback<T>, arr: T[]): number => {
    if (typeof index === 'function') {
        return arr.findIndex((item, idx, array) => index(item, idx, array));
    }
    return index;
};

/**
 * Get a validated index or return -1 if invalid.
 * Handles null/empty arrays and out-of-bounds indices.
 *
 * @param index - A numeric index or a callback function to find the index
 * @param arr - The array to validate against
 * @param allowEnd - If true, allows index equal to array length (for insertions)
 * @returns Validated index or -1 if invalid
 *
 * @example
 * // Valid index within bounds
 * getValidIndex(1, ['a', 'b', 'c']) // returns 1
 *
 * @example
 * // Out of bounds returns -1
 * getValidIndex(5, ['a', 'b', 'c']) // returns -1
 *
 * @example
 * // With allowEnd for insertion
 * getValidIndex(3, ['a', 'b', 'c'], true) // returns 3
 */
const getValidIndex = <T>(
    index: number | IndexCallback<T>,
    arr: Maybe<T[]>,
    allowEnd = false,
): number => {
    if (!arr) {
        return -1;
    }
    const indexAt = resolveIndex(index, arr);
    let maxIndex = arr.length;
    if (!allowEnd) {
        maxIndex -= 1;
    }
    if (indexAt >= 0 && indexAt <= maxIndex) {
        return indexAt;
    }
    return -1;
};

/**
 * Helper to modify array at an index by replacing or removing.
 * @returns Modified array or original if invalid
 */
const modifyAtIndex = <T>(
    index: number | IndexCallback<T>,
    arr: Maybe<T[]>,
    modifier: (arr: T[], indexAt: number) => T[],
): T[] => {
    if (!arr) {
        return [];
    }
    const indexAt = getValidIndex(index, arr);
    if (indexAt < 0) {
        return arr;
    }
    return modifier(arr, indexAt);
};

/**
 * Insert an item at a given index
 * @param index - An index or a callback provided to findIndex
 * @param value - The value of the item to insert
 * @param arr - The array to insert into
 * @returns New array with the item inserted
 */
export const insertItemAtIndex = <T>(
    index: number | IndexCallback<T>,
    value: T,
    arr?: Maybe<T[]>,
): T[] => {
    if (!arr) {
        return [];
    }
    const indexAt = getValidIndex(index, arr, true);
    if (indexAt < 0) {
        return arr;
    }
    return [...arr.slice(0, indexAt), value, ...arr.slice(indexAt)];
};

/**
 * Replace an item at a given index
 * @param index - An index or a callback provided to findIndex
 * @param newValue - The value of the item to be replaced
 * @param arr - The array to replace in
 * @returns New array with the item replaced
 */
export const replaceItemAtIndex = <T>(
    index: number | IndexCallback<T>,
    newValue: T,
    arr?: Maybe<T[]>,
): T[] =>
    modifyAtIndex(index, arr, (array, idx) => [
        ...array.slice(0, idx),
        newValue,
        ...array.slice(idx + 1),
    ]);

/**
 * Remove an item at an index
 * @param index - An index or a callback provided to findIndex
 * @param arr - The array to remove from
 * @returns New array with the item removed
 */
export const removeItemAtIndex = <T>(index: number | IndexCallback<T>, arr?: Maybe<T[]>): T[] =>
    modifyAtIndex(index, arr, (array, idx) => [...array.slice(0, idx), ...array.slice(idx + 1)]);

/**
 * Find median value of an array
 * @param arr Array to find median
 * @returns Median value
 */
export const median = (arr: number[]): number => {
    if (arr.length === 0) {
        return 0;
    }

    const mid = Math.floor(arr.length / 2);
    const nums = [...arr].toSorted((first, second) => first - second);
    if (arr.length % 2 !== 0) {
        return nums[mid] as number;
    }
    const lower = nums[mid - 1];
    const upper = nums[mid];
    return ((lower ?? 0) + (upper ?? 0)) / 2;
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
    return arr2.filter(item => set.has(item));
};

/**
 * Count the number of times each element occurs in the array
 * @param array - Array of elements to count
 * @returns Object where keys are array values and values are the count of occurrences
 */
export const countBy = (array: (number | string)[]): Record<string, number> => {
    const result: Record<string, number> = {};
    for (const item of array) {
        result[item] = (result[item] ?? 0) + 1;
    }
    return result;
};

/**
 * Count occurrences of each unique element in the array
 * @param data - Array of data to count occurrences
 * @returns Object with unique elements as keys and their occurrence counts as values
 */
export const occurrenceCount = <T>(data: T[]): Record<string, number> => {
    const result: Record<string, number> = {};
    for (const item of data) {
        const key = String(item);
        result[key] = (result[key] ?? 0) + 1;
    }
    return result;
};

/**
 * Split array into chunks of specified size
 * @param arr - Array to split into chunks
 * @param size - Size of each chunk
 * @returns Array of chunks
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
export const chunk = <T>(arr: readonly T[], size: number): T[][] => {
    if (size <= 0) {
        return [];
    }
    const result: T[][] = [];
    for (let idx = 0; idx < arr.length; idx += size) {
        result.push(arr.slice(idx, idx + size));
    }
    return result;
};

/**
 * Group array items by a key extractor function
 * @param arr - Array to group
 * @param getKey - Function to extract group key from each item
 * @returns Record of arrays grouped by key
 * @example
 * groupBy([{id: 1, type: 'a'}, {id: 2, type: 'b'}, {id: 3, type: 'a'}], item => item.type)
 * // { a: [{id: 1, type: 'a'}, {id: 3, type: 'a'}], b: [{id: 2, type: 'b'}] }
 */
export const groupBy = <T, K extends string | number | symbol>(
    arr: readonly T[],
    getKey: (item: T) => K,
): Record<K, T[]> => {
    const result: Record<K, T[]> = {} as Record<K, T[]>;
    for (const item of arr) {
        const key = getKey(item);
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
    }
    return result;
};
