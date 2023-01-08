import { Collection, IndexCallback } from './types';

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
 * @param value
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
        () => arr[Math.round(Math.random() * (arr.length - 1))]
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
export const sortAsc = <T extends Record<string, T>>(
    array: ReadonlyArray<T>
): ReadonlyArray<T> => {
    return [...array].sort((a, b) => {
        if (a.key < b.key) {
            return -1;
        } else if (a.key > b.key) {
            return 1;
        } else {
            return 0;
        }
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
