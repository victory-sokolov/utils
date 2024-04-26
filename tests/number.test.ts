import { describe, expect } from 'vitest';
import { rangeParser } from '../src/number';

describe('test rangeParser', () => {
    it('single number', () => {
        expect(rangeParser('5')).toEqual([1, 2, 3, 4, 5]);
    });

    it('range with dash', () => {
        expect(rangeParser('2-5')).toEqual([2, 3, 4, 5]);
    });

    it('range with comma', () => {
        expect(rangeParser('2,5')).toEqual([2, 3, 4, 5]);
    });
});
