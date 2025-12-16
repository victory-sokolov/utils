import { describe, expect, it, vi } from 'vitest';
import { batchInvoke, pipe, isAsync, tap } from '../src/function';

describe('batchInvoke', () => {
    it('should call every function in the array', () => {
        const mockFn1 = vi.fn();
        const mockFn2 = vi.fn();
        const mockFn3 = vi.fn();

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
    it('first function should accept a parameter and pass the result of one function to another', () => {
        const addTwo = (x: number) => x + 2;
        const multiplyByThree = (num: number) => num * 3;
        expect(pipe(2, addTwo, multiplyByThree)).toBe(12);
    });
    it('should pass the result of one function with arguments to another using several functions', () => {
        const addTwo = (num: number) => num + 2;
        const multiplyByThree = (num: number) => num * 3;
        const subtractFive = (num: number) => num - 5;
        expect(pipe(10, addTwo, multiplyByThree, subtractFive)).toBe(31);
    });
});

describe('isAsync', () => {
    it('should return true for async functions', () => {
        const asyncFn = async () => {};
        expect(isAsync(asyncFn)).toBe(true);
    });

    it('should return false for regular functions', () => {
        const regularFn = () => {};
        expect(isAsync(regularFn)).toBe(false);
    });
});

describe('tap', () => {
    it('should call the callback with the value and return the value', () => {
        const value = { a: 1 };
        const callback = vi.fn();
        const result = tap(value, callback);
        expect(callback).toHaveBeenCalledWith(value);
        expect(result).toBe(value);
    });
});
