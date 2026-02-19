import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
    addZero,
    generateNumberWithLength,
    getRandomNumber,
    nFormatter,
    rangeParser,
} from '../src/number';

describe('test rangeParser', () => {
    it('single number', () => {
        expect(rangeParser('5')).toStrictEqual([1, 2, 3, 4, 5]);
    });

    it('range with dash', () => {
        expect(rangeParser('2-5')).toStrictEqual([2, 3, 4, 5]);
    });

    it('range with comma', () => {
        expect(rangeParser('2,5')).toStrictEqual([2, 3, 4, 5]);
    });
});

describe('addZero', () => {
    describe('numbers less than 10', () => {
        it('should add leading zero to single-digit numbers', () => {
            expect(addZero(0)).toBe('00');
            expect(addZero(1)).toBe('01');
            expect(addZero(5)).toBe('05');
            expect(addZero(9)).toBe('09');
        });

        it('should add leading zero to negative numbers (due to comparison logic)', () => {
            expect(addZero(-1)).toBe('0-1');
            expect(addZero(-5)).toBe('0-5');
            expect(addZero(-10)).toBe('0-10');
            expect(addZero(-100)).toBe('0-100');
        });
    });

    describe('numbers 10 and greater', () => {
        it('should not add leading zero to numbers 10-99', () => {
            expect(addZero(10)).toBe('10');
            expect(addZero(15)).toBe('15');
            expect(addZero(99)).toBe('99');
        });

        it('should not add leading zero to numbers 100+', () => {
            expect(addZero(100)).toBe('100');
            expect(addZero(999)).toBe('999');
            expect(addZero(1000)).toBe('1000');
        });
    });
});

describe('random-based functions', () => {
    const originalRandom = Math.random;
    const originalFloor = Math.floor;

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    afterEach(() => {
        Math.random = originalRandom;
        Math.floor = originalFloor;
    });

    describe('getRandomNumber', () => {
        describe('range validation', () => {
            it('should return numbers within the specified range', () => {
                const testCases = [
                    { expected: 0, max: 10, min: 0, random: 0 },
                    { expected: 5, max: 10, min: 0, random: 0.5 },
                    { expected: 10, max: 10, min: 0, random: 1 },
                    { expected: 5, max: 15, min: 5, random: 0 },
                    { expected: 15, max: 15, min: 5, random: 1 },
                    { expected: 12.5, max: 20, min: 10, random: 0.25 },
                ];

                testCases.forEach(({ random, min, max, expected }) => {
                    Math.random = vi.fn().mockReturnValue(random);
                    const result = getRandomNumber(min, max);
                    expect(result).toBe(expected);
                });
            });

            it('should handle negative ranges', () => {
                Math.random = vi.fn().mockReturnValue(0.5);

                expect(getRandomNumber(-10, 10)).toBe(0);
                expect(getRandomNumber(-5, 5)).toBe(0);
                expect(getRandomNumber(-100, -50)).toBe(-75);
            });

            it('should handle decimal ranges', () => {
                Math.random = vi.fn().mockReturnValue(0.5);

                expect(getRandomNumber(0.1, 0.9)).toBe(0.5);
                expect(getRandomNumber(1.5, 3.5)).toBe(2.5);
            });
        });
    });

    describe('generateNumberWithLength', () => {
        describe('valid lengths', () => {
            it('should generate a number with exactly 1 digit', () => {
                Math.random = vi.fn().mockReturnValue(0.5);

                const result = generateNumberWithLength(1);
                expect(result).toBe(5);
                expect(result.toString()).toHaveLength(1);
            });

            it('should generate a number with exactly 2 digits', () => {
                Math.random = vi.fn().mockReturnValue(0.25);

                const result = generateNumberWithLength(2);
                expect(result).toBe(32);
                expect(result.toString()).toHaveLength(2);
            });

            it('should generate a number with exactly 3 digits', () => {
                Math.random = vi.fn().mockReturnValue(0.75);

                const result = generateNumberWithLength(3);
                expect(result).toBe(775);
                expect(result.toString()).toHaveLength(3);
            });

            describe('error cases', () => {
                it('should throw error for zero length', () => {
                    expect(() => generateNumberWithLength(0)).toThrow(
                        'Length must be greater than zero',
                    );
                });

                it('should throw error for negative length', () => {
                    expect(() => generateNumberWithLength(-1)).toThrow(
                        'Length must be greater than zero',
                    );
                    expect(() => generateNumberWithLength(-5)).toThrow(
                        'Length must be greater than zero',
                    );
                });
            });

            describe('boundary verification', () => {
                it('should always return numbers with correct length', () => {
                    const lengths = [1, 2, 3, 4, 5];

                    lengths.forEach(length => {
                        const result = generateNumberWithLength(length);
                        expect(result.toString()).toHaveLength(length);
                        expect(result).toBeGreaterThanOrEqual(10 ** (length - 1));
                        expect(result).toBeLessThanOrEqual(10 ** length - 1);
                    });
                });
            });
        });
    });
});

describe('nFormatter', () => {
    it('should return 0 for undefined input', () => {
        expect(nFormatter(undefined)).toBe(0);
    });

    it('should return 0 for empty string', () => {
        expect(nFormatter('')).toBe(0);
    });

    it('should parse regular numbers', () => {
        expect(nFormatter('123')).toBe(123);
        expect(nFormatter('45.67')).toBe(45.67);
    });

    it('should handle k suffix (thousands)', () => {
        expect(nFormatter('1k')).toBe(1000);
        expect(nFormatter('2.5k')).toBe(2500);
        expect(nFormatter('1K')).toBe(1000);
    });

    it('should handle m suffix (millions)', () => {
        expect(nFormatter('1m')).toBe(1_000_000);
        expect(nFormatter('3.2m')).toBe(3_200_000);
        expect(nFormatter('1M')).toBe(1_000_000);
    });

    it('should ignore unknown suffixes', () => {
        expect(nFormatter('1x')).toBe(1);
        expect(nFormatter('1b')).toBe(1);
    });
});
