import { rangeParser } from '../src/number';
import { describe, test, expect } from 'vitest';


describe('test rangeParser', () => {
    test('single number', () => {
        expect(rangeParser('5')).toEqual([1, 2, 3, 4, 5]);
    });

    test('range with dash', () => {
        expect(rangeParser('2-5')).toEqual([2, 3, 4, 5]);
    });

    test('range with comma', () => {
        expect(rangeParser('2,5')).toEqual([2, 3, 4, 5]);
    });

});
