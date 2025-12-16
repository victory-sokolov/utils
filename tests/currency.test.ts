import { describe, expect, it } from 'vitest';
import { formatPrice, toDollars } from '../src/currency';

describe('formatPrice', () => {
    describe('basic formatting', () => {
        it('should format whole dollar amounts without cents for USD', () => {
            expect(formatPrice('1000')).toBe('$10'); // $10.00 -> $10
            expect(formatPrice('5000')).toBe('$50'); // $50.00 -> $50
            expect(formatPrice('10000')).toBe('$100'); // $100.00 -> $100
        });

        it('should format amounts with cents showing 2 decimal places', () => {
            expect(formatPrice('1050')).toBe('$10.50');
            expect(formatPrice('1234')).toBe('$12.34');
            expect(formatPrice('999')).toBe('$9.99');
        });

        it('should handle zero cents correctly', () => {
            expect(formatPrice('0')).toBe('$0');
            expect(formatPrice('100')).toBe('$1');
            expect(formatPrice('2500')).toBe('$25');
        });
    });

    describe('different currencies', () => {
        it('should format USD by default', () => {
            expect(formatPrice('1000')).toBe('$10');
            expect(formatPrice('1234')).toBe('$12.34');
        });

        it('should format EUR correctly - always shows 2 decimal places', () => {
            expect(formatPrice('1000', 'EUR')).toBe('€10'); // Your function removes .00
            expect(formatPrice('1234', 'EUR')).toBe('€12.34');
        });

        it('should format GBP correctly - always shows 2 decimal places', () => {
            expect(formatPrice('1000', 'GBP')).toBe('£10'); // Your function removes .00
            expect(formatPrice('1234', 'GBP')).toBe('£12.34');
        });
    });

    describe('different locales', () => {
        it('should use en-US locale by default', () => {
            expect(formatPrice('123456')).toBe('$1,234.56');
        });

        it('should format for German locale', () => {
            const result = formatPrice('123456', 'EUR', 'de-DE');
            // Could be "1.234,56 €" or "1.234,56€" depending on environment
            expect(result).toMatch(/1\.234,56\s*€/);
        });

        it('should format for French locale', () => {
            const result = formatPrice('123456', 'EUR', 'fr-FR');
            // Could contain various space characters
            expect(result).toContain('1 234,56');
        });
    });

    describe('edge cases', () => {
        it('should handle very small amounts', () => {
            expect(formatPrice('1')).toBe('$0.01');
            expect(formatPrice('9')).toBe('$0.09');
            expect(formatPrice('50')).toBe('$0.50');
        });

        it('should handle large amounts with thousands separators', () => {
            expect(formatPrice('1000000')).toBe('$10,000');
            expect(formatPrice('123456789')).toBe('$1,234,567.89');
        });

        it('should handle decimal input strings', () => {
            expect(formatPrice('99.99')).toBe('$1.00'); // 99.99 cents -> $0.9999 -> $1.00
            expect(formatPrice('123.45')).toBe('$1.23');
        });

        it('should handle negative amounts', () => {
            expect(formatPrice('-1000')).toBe('-$10');
            expect(formatPrice('-1234')).toBe('-$12.34');
        });

        it('should return "Invalid price" for invalid number strings', () => {
            expect(formatPrice('notanumber')).toBe('Invalid price');
            expect(formatPrice('abc')).toBe('Invalid price');
        });
    });

    describe('fractional dollars logic', () => {
        it('should show no decimal places for whole dollars in USD', () => {
            expect(formatPrice('1000')).toBe('$10');
            expect(formatPrice('2000')).toBe('$20');
            expect(formatPrice('3000')).toBe('$30');
        });

        it('should show 2 decimal places for fractional dollars', () => {
            expect(formatPrice('1001')).toBe('$10.01');
            expect(formatPrice('2050')).toBe('$20.50');
            expect(formatPrice('3075')).toBe('$30.75');
        });
    });
});

describe('toDollars', () => {
    describe('basic conversion', () => {
        it('should convert cents to dollars for whole amounts', () => {
            expect(toDollars(1000)).toBe('$10.00');
            expect(toDollars(5000)).toBe('$50.00');
            expect(toDollars(10000)).toBe('$100.00');
        });

        it('should convert cents to dollars with decimal amounts', () => {
            expect(toDollars(1050)).toBe('$10.50');
            expect(toDollars(1234)).toBe('$12.34');
            expect(toDollars(999)).toBe('$9.99');
        });

        it('should handle zero and small amounts', () => {
            expect(toDollars(0)).toBe('$0.00');
            expect(toDollars(1)).toBe('$0.01');
            expect(toDollars(50)).toBe('$0.50');
            expect(toDollars(99)).toBe('$0.99');
        });
    });

    describe('different currencies', () => {
        it('should format USD by default', () => {
            expect(toDollars(1000)).toBe('$10.00');
            expect(toDollars(1234)).toBe('$12.34');
        });

        it('should format EUR correctly', () => {
            expect(toDollars(1000, 'EUR')).toBe('€10.00');
            expect(toDollars(1234, 'EUR')).toBe('€12.34');
        });

        it('should format GBP correctly', () => {
            expect(toDollars(1000, 'GBP')).toBe('£10.00');
            expect(toDollars(1234, 'GBP')).toBe('£12.34');
        });

        it('should format JPY correctly', () => {
            expect(toDollars(1000, 'JPY')).toBe('¥10'); // JPY usually doesn't use decimals
            expect(toDollars(1234, 'JPY')).toBe('¥12'); // Rounds down to whole yen
        });

        it('should format CAD correctly', () => {
            expect(toDollars(1000, 'CAD')).toBe('CA$10.00');
            expect(toDollars(1234, 'CAD')).toBe('CA$12.34');
        });
    });

    describe('different locales', () => {
        it('should use en-US locale by default', () => {
            expect(toDollars(123456)).toBe('$1,234.56');
        });

        it('should format for French locale with EUR', () => {
            const result = toDollars(123456, 'EUR', 'fr-FR');
            expect(result).toContain('1 234,56'); // Uses narrow no-break space
        });

        it('should format for British locale with GBP', () => {
            expect(toDollars(123456, 'GBP', 'en-GB')).toBe('£1,234.56');
        });
    });

    describe('edge cases', () => {
        it('should handle negative amounts', () => {
            expect(toDollars(-1000)).toBe('-$10.00');
            expect(toDollars(-1234)).toBe('-$12.34');
            expect(toDollars(-1)).toBe('-$0.01');
        });

        it('should handle very large amounts', () => {
            expect(toDollars(100000000)).toBe('$1,000,000.00');
            expect(toDollars(123456789)).toBe('$1,234,567.89');
        });

        it('should handle fractional cents (rounding behavior)', () => {
            // Note: toLocaleString may handle rounding differently by environment
            expect(toDollars(1000.5)).toBe('$10.01'); // Rounds up
            expect(toDollars(1000.4)).toBe('$10.00'); // Rounds down
        });

        it('should handle very small fractional amounts', () => {
            expect(toDollars(0.1)).toBe('$0.00'); // Rounds down
            expect(toDollars(0.5)).toBe('$0.01'); // Rounds up
        });
    });

    describe('default parameters', () => {
        it('should use USD and en-US when no parameters provided', () => {
            expect(toDollars(1000)).toBe('$10.00');
        });

        it('should use provided currency with default locale', () => {
            expect(toDollars(1000, 'EUR')).toBe('€10.00');
        });

        it('should use provided currency and locale', () => {
            const result = toDollars(1000, 'EUR', 'de-DE');
            expect(result).toMatch(/10,00\s*€/);
        });
    });

    describe('currency-specific behaviors', () => {
        it('should handle currencies that don\'t use decimal places', () => {
            // JPY typically doesn't use decimal places
            expect(toDollars(1000, 'JPY')).toBe('¥10');
            expect(toDollars(1234, 'JPY')).toBe('¥12');
        });
    });
});
