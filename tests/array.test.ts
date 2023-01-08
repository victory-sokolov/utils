import {
    unique,
    flattenArray,
    randomItem,
    removeItem,
    shuffleArray,
    sortAsc
} from '../src/array';

describe('flattenArray', () => {
    it('should flatten a nested array', () => {
        expect(
            flattenArray([
                [1, 2],
                [3, 4]
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
                age: 20
            },
            {
                name: 'Atest',
                age: 30
            }
        ] as const;
        const sortedNumbers = sortAsc<any>(obj);
        expect(sortedNumbers).toEqual([
            {
                age: 20,
                name: 'Test'
            },
            {
                age: 30,
                name: 'Atest'
            }
        ]);
    });

    it('sorts an array of objects based on their "key" property in ascending order', () => {
        const objects = [{ key: 3 }, { key: 2 }, { key: 1 }];
        const sortedObjects = sortAsc<any>(objects);
        expect(sortedObjects).toEqual([{ key: 1 }, { key: 2 }, { key: 3 }]);
    });
});
