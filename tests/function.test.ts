import { batchInvoke, pipe } from '../src/function';
import { jest } from '@jest/globals';

describe('batchInvoke', () => {
    it('should call every function in the array', () => {
        const mockFn1 = jest.fn();
        const mockFn2 = jest.fn();
        const mockFn3 = jest.fn();

        batchInvoke([mockFn1, mockFn2, mockFn3]);

        expect(mockFn1).toHaveBeenCalled();
        expect(mockFn2).toHaveBeenCalled();
        expect(mockFn3).toHaveBeenCalled();
    });
});

describe('pipe', () => {
    it('should pass the result of one function to another', () => {
        const addTwo = () => 5 + 2;
        const multiplyByThree = (num: number) => num * 3;

        expect(pipe(addTwo, multiplyByThree)).toBe(21);
    });
});
