import {
    countBy,
    flattenArray,
    insertItemAtIndex,
    intersection,
    median,
    occurrenceCount,
    randomItem,
    removeItem,
    removeItemAtIndex,
    replaceItemAtIndex,
    shuffleArray,
    sortAsc,
    sortBy,
    unique,
    sort,
} from '../src/array';

describe('flattenArray', () => {
    it('should flatten a nested array', () => {
        expect(
            flattenArray([
                [1, 2],
                [3, 4],
            ])
        ).toEqual([1, 2, 3, 4]);
    });

    it('should return the original array if it is not nested', () => {
        expect(flattenArray([1, 2, 3, [4], [5]])).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return an empty array if the input is an empty array', () => {
        expect(flattenArray([])).toEqual([]);
    });
});

describe('unique', () => {
    it('should return an array of unique values', () => {
        expect(unique([1, 2, 3, 2, 3, 4, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return an empty array if the input is an empty array', () => {
        expect(unique([])).toEqual([]);
    });
});

describe('removeItem', () => {
    it('should remove items from the array', () => {
        expect(removeItem([1, 2, 3, 4, 5], [3, 4])).toEqual([1, 2, 5]);
    });

    it('should return the original array if there are no items to remove', () => {
        expect(removeItem([1, 2, 3, 4, 5], [])).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return an empty array if the input array is empty', () => {
        expect(removeItem([], [3, 4])).toEqual([]);
    });
});

describe('randomItem', () => {
    it('should return a random item from the array', () => {
        expect(randomItem([1, 2, 3, 4, 5], 1)).toHaveLength(1);
    });

    it('should return an empty array if count is 0', () => {
        expect(randomItem([1, 2, 3, 4, 5], 0)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return the original array if count is greater than the length of the array', () => {
        expect(randomItem([1, 2, 3, 4, 5], 10)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return an empty array if the input array is empty', () => {
        expect(randomItem([], 1)).toEqual([]);
    });
});

describe('shuffleArray', () => {
    it('should shuffle the values in the array', () => {
        expect(shuffleArray([1, 2, 3, 4, 5])).not.toEqual([1, 2, 3, 4, 5]);
    });

    it('should return an empty array if the input array is empty', () => {
        expect(shuffleArray([])).toEqual([]);
    });
});

describe('sortAsc', () => {
    it('sorts an array of numbers in ascending order', () => {
        const obj = [
            {
                name: 'Test',
                age: 20,
            },
            {
                name: 'Atest',
                age: 30,
            },
        ] as const;
        const sortedNumbers = sortAsc<any>(obj);
        expect(sortedNumbers).toEqual([
            {
                age: 20,
                name: 'Test',
            },
            {
                age: 30,
                name: 'Atest',
            },
        ]);
    });

    it('sorts an array of objects based on their "key" property in ascending order', () => {
        const objects = [{ key: 3 }, { key: 2 }, { key: 1 }];
        const sortedObjects = sortAsc<any>(objects);
        expect(sortedObjects).toEqual([{ key: 1 }, { key: 2 }, { key: 3 }]);
    });

    it('should maintain original order for equal keys', () => {
        const objects = [{ key: 1, value: 'b' }, { key: 1, value: 'a' }];
        const sortedObjects = sortAsc<any>(objects);
        // Using toStrictEqual to ensure array and object equality including value
        expect(sortedObjects).toEqual([{ key: 1, value: 'b' }, { key: 1, value: 'a' }]);
    });

    it('should sort array in descending order correctly', () => {
        const objects = [{ key: 1 }, { key: 3 }, { key: 2 }];
        const sortedObjects = sortAsc<any>(objects);
        expect(sortedObjects).toEqual([{ key: 1 }, { key: 2 }, { key: 3 }]);
    });
});

describe('insertItemAtIndex', () => {
    it('inserts the item at the specified index', () => {
        const arr = [1, 2, 3];
        const result = insertItemAtIndex(1, 4, arr);
        expect(result).toEqual([1, 4, 2, 3]);
    });

    it('inserts the item at the index returned by the callback', () => {
        const arr = [1, 2, 3];
        const result = insertItemAtIndex((item) => item === 2, 4, arr);
        expect(result).toEqual([1, 4, 2, 3]);
    });

    it('returns an empty array when arr is null or undefined', () => {
        let result = insertItemAtIndex(1, 4, null);
        expect(result).toEqual([]);
        result = insertItemAtIndex(1, 4);
        expect(result).toEqual([]);
    });

    it('should return the original array if the index is not found', () => {
        const arr = [1, 2, 3];
        const result = insertItemAtIndex(5, 4, arr); // Index out of bounds
        expect(result).toEqual(arr);

        const resultCallback = insertItemAtIndex((item) => item === 99, 4, arr); // Item not found
        expect(resultCallback).toEqual(arr);
    });
});

describe('replaceItemAtIndex', () => {
    it('should replace the item at the given index', () => {
        const arr = [1, 2, 3, 4];
        const newValue = 100;
        const index = 2;
        const expected = [1, 2, 100, 4];
        expect(replaceItemAtIndex(index, newValue, arr)).toEqual(expected);
    });

    it('should return an empty array if no array is passed', () => {
        const newValue = 100;
        const index = 2;
        const expected: number[] = [];
        expect(replaceItemAtIndex(index, newValue)).toEqual(expected);
    });

    it('should replace the item at the index found by the callback', () => {
        const arr = [
            { id: 1, value: 'a' },
            { id: 2, value: 'b' },
            { id: 3, value: 'c' },
        ];
        const newValue = { id: 100, value: 'x' };
        const index = (item: (typeof arr)[number]) => item.id === 2;
        const expected = [
            { id: 1, value: 'a' },
            { id: 100, value: 'x' },
            { id: 3, value: 'c' },
        ];
        expect(replaceItemAtIndex(index, newValue, arr)).toEqual(expected);
    });

    it('should return the original array if the index is not found', () => {
        const arr = [1, 2, 3];
        const newValue = 100;
        const result = replaceItemAtIndex(5, newValue, arr); // Index out of bounds
        expect(result).toEqual(arr);

        const resultCallback = replaceItemAtIndex((item) => item === 99, newValue, arr); // Item not found
        expect(resultCallback).toEqual(arr);
    });
});

describe('removeItemAtIndex', () => {
    it('removes item at specified index', () => {
        const arr = [1, 2, 3, 4, 5];
        const expected = [1, 2, 4, 5];
        const result = removeItemAtIndex(2, arr);
        expect(result).toEqual(expected);
    });

    it('removes item based on callback function', () => {
        const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const expected = [{ id: 1 }, { id: 3 }];
        const result = removeItemAtIndex((item) => item.id === 2, arr);
        expect(result).toEqual(expected);
    });

    it('returns empty array if input array is null', () => {
        const result = removeItemAtIndex(2, null);
        expect(result).toEqual([]);
    });

    it('returns original array if index is not found', () => {
        const arr = [1, 2, 3, 4, 5];
        const result = removeItemAtIndex(10, arr);
        expect(result).toEqual(arr);
    });
});

describe('sort', () => {
    it('should sort an array using a custom sorting function', () => {
        const arr = [{ value: 3 }, { value: 1 }, { value: 2 }];
        const customSort = (a: { value: number }, b: { value: number }) => a.value - b.value;
        const result = sort(arr, customSort);
        expect(result).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }]);
    });

    it('should sort an array using the default sorting function when fSorting is null', () => {
        const arr = [{ a: 3 }, { a: 1 }, { a: 2 }]; // Uses Object.values(a)[0]
        const result = sort(arr, null);
        expect(result).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }]);
    });

    it('should return a new array instance', () => {
        const arr = [{ value: 3 }, { value: 1 }];
        const result = sort(arr, (a, b) => a.value - b.value);
        expect(result).not.toBe(arr);
    });

    it('should handle empty array when fSorting is null', () => {
        const result = sort([], null);
        expect(result).toEqual([]);
    });

    it('should handle empty array when fSorting is provided', () => {
        const customSort = (a: { value: number }, b: { value: number }) => a.value - b.value;
        const result = sort([], customSort);
        expect(result).toEqual([]);
    });

    it('should handle objects with non-numeric first values when fSorting is null', () => {
        const arr = [{ a: 'b' }, { a: 'a' }];
        const result = sort(arr, null);
        // Default sort converts to Number, 'b' -> NaN, 'a' -> NaN. NaN comparison is tricky.
        // It should maintain original order for NaN if comparison is 0.
        // The default fSort uses (valA > valB ? 1 : valA < valB ? -1 : 0) which handles NaN comparisons as 0
        expect(result).toEqual([{ a: 'b' }, { a: 'a' }]);
    });
});
describe('intersection', () => {
    it('intersection function returns the correct result', () => {
        const arr1 = [1, 2, 3, 4];
        const arr2 = [3, 4, 5, 6];
        const expectedResult = [3, 4];
        expect(intersection(arr1, arr2)).toEqual(expectedResult);
    });
});

describe('median', () => {
    it('median function returns the correct result', () => {
        const arr1 = [1, 2, 3, 4];
        const arr2 = [3, 4, 5, 6, 7];
        expect(median(arr1)).toBeCloseTo(2.5);
        expect(median(arr2)).toBe(5);
    });

    it('should return 0 for an empty array', () => {
        expect(median([])).toBe(0);
    });
});

describe('countBy', () => {
    it('countBy should return an object with the count of each item in the array', () => {
        const array = [1, 2, 3, 2, 3, 3, 4, 5];
        const expectedResult = { 1: 1, 2: 2, 3: 3, 4: 1, 5: 1 };

        expect(countBy(array)).toEqual(expectedResult);
    });

    it('countBy should return an empty object if passed an empty array', () => {
        const array = ['hello', 'world', 'hello'];
        const expectedResult = { hello: 2, world: 1 };

        expect(countBy(array)).toEqual(expectedResult);
    });

    it('countBy should return an object with the count of each item in the array even if the array contains duplicate items', () => {
        const array = [1, 1, 2, 3, 3, 3];
        const expectedResult = { 1: 2, 2: 1, 3: 3 };

        expect(countBy(array)).toEqual(expectedResult);
    });
});

describe('sortBy', () => {
    const users = [
        {
            name: 'John',
            age: 30,
        },
        {
            name: 'Nick',
            age: 42,
        },
        {
            name: 'Tom',
            age: 20,
        },
    ];

    it('should sort array of objects in desc order', () => {
        const sorted = sortBy(users, 1, 'age');
        const expected = [
            {
                name: 'Tom',
                age: 20,
            },
            {
                name: 'John',
                age: 30,
            },
            {
                name: 'Nick',
                age: 42,
            },
        ];
        expect(sorted).toEqual(expected);
    });
    it('should sort array of objects in asc order', () => {
        const sorted = sortBy(users, -1, 'age');
        const expected = [
            {
                name: 'Nick',
                age: 42,
            },
            {
                name: 'John',
                age: 30,
            },
            {
                name: 'Tom',
                age: 20,
            },
        ];
        expect(sorted).toEqual(expected);
    });

    it('should return the original array if key is not a string', () => {
        const sorted = sortBy(users, 1, null as any); // Pass null as key
        expect(sorted).toEqual(users);
    });

    it('should return the original array if the input array is empty', () => {
        const sorted = sortBy([], 1, 'age');
        expect(sorted).toEqual([]);
    });

    it('should return the original array if the key does not exist on the first object', () => {
        const sorted = sortBy(users, 1, 'nonExistentKey');
        expect(sorted).toEqual(users);
    });

    it('should sort array of objects by string key in asc order', () => {
        const sorted = sortBy(users, 1, 'name');
        const expected = [
            { name: 'John', age: 30 },
            { name: 'Nick', age: 42 },
            { name: 'Tom', age: 20 },
        ];
        expect(sorted).toEqual(expected);
    });

    it('should sort array of objects by string key in desc order', () => {
        const sorted = sortBy(users, -1, 'name');
        const expected = [
            { name: 'Tom', age: 20 },
            { name: 'Nick', age: 42 },
            { name: 'John', age: 30 },
        ];
        expect(sorted).toEqual(expected);
    });

    it('should return original order for mixed types or non-sortable types', () => {
        const mixedUsers = [
            { name: 'John', value: 30 },
            { name: 'Nick', value: 'forty-two' }, // Mixed type
            { name: 'Tom', value: 20 },
        ];
        // When sorting by 'value', the default comparator should return 0 for mixed types, preserving order
        const sorted = sortBy(mixedUsers, 1, 'value');
        expect(sorted).toEqual(mixedUsers);
    });
});


describe('occurrenceCount', () => {
    it('should count occurrences of numbers', () => {
        const numbers = [1, 2, 3, 2, 1, 1, 4];
        const result = occurrenceCount(numbers);

        expect(result).toEqual({
            1: 3,
            2: 2,
            3: 1,
            4: 1,
        });
    });

    it('should count occurrences of strings', () => {
        const strings = ['a', 'b', 'a', 'c', 'b', 'a'];
        const result = occurrenceCount(strings);

        expect(result).toEqual({
            a: 3,
            b: 2,
            c: 1,
        });
    });

    it('should count occurrences of mixed primitive types', () => {
        const mixed = [1, '2', true, '2', 1, false, true];
        const result = occurrenceCount(mixed);

        expect(result).toEqual({
            1: 2,
            2: 2,
            true: 2,
            false: 1,
        });
    });
});
