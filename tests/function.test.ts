import { describe, expect, it, vi } from 'vitest';
import { batchInvoke, pipe } from '../src/function';

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
        const thirdFunc = (num: number) => num * 2;
        expect(pipe(2, addTwo, multiplyByThree, thirdFunc)).toBe(24);
    });
});
