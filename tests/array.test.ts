import {
    unique,
    flattenArray,
    randomItem,
    removeItem,
    shuffleArray,
    sortAsc,
    insertItemAtIndex,
    replaceItemAtIndex,
    removeItemAtIndex,
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
            const expected = [];
            expect(replaceItemAtIndex(index, newValue)).toEqual(expected);
        });

        it('should replace the item at the index found by the callback', () => {
            const arr = [
                { id: 1, value: 'a' },
                { id: 2, value: 'b' },
                { id: 3, value: 'c' },
            ];
            const newValue = { id: 100, value: 'x' };
            const index = (item) => item.id === 2;
            const expected = [
                { id: 1, value: 'a' },
                { id: 100, value: 'x' },
                { id: 3, value: 'c' },
            ];
            expect(replaceItemAtIndex(index, newValue, arr)).toEqual(expected);
        });
    });

    describe('removeItemAtIndex', () => {
        test('removes item at specified index', () => {
            const arr = [1, 2, 3, 4, 5];
            const expected = [1, 2, 4, 5];
            const result = removeItemAtIndex(2, arr);
            expect(result).toEqual(expected);
        });

        test('removes item based on callback function', () => {
            const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
            const expected = [{ id: 1 }, { id: 3 }];
            const result = removeItemAtIndex((item) => item.id === 2, arr);
            expect(result).toEqual(expected);
        });

        test('returns empty array if input array is null', () => {
            const result = removeItemAtIndex(2, null);
            expect(result).toEqual([]);
        });

        test('returns original array if index is not found', () => {
            const arr = [1, 2, 3, 4, 5];
            const result = removeItemAtIndex(10, arr);
            expect(result).toEqual(arr);
        });
    });
});
