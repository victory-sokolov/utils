import { describe, expect, it } from 'vitest';
import {
    camelCase,
    capitalize,
    endsWithAny,
    escapeHtml,
    isAlphaNumeric,
    isValidUUID,
    kebabCase,
    maskString,
    pascalCase,
    randomHexColorCode,
    removeZeroWidthSpace,
    slugify,
    startsWithAny,
    truncate,
} from '../src/string';

describe('string-utils', () => {
    describe('camelCase', () => {
        it('should convert a lowercase string to camelCase', () => {
            const result = camelCase('hello world');
            expect(result).toBe('helloWorld');
        });

        it('should convert a mixed-case string to camelCase', () => {
            const result = camelCase('hello World');
            expect(result).toBe('helloWorld');
        });

        it('should convert a string with non-alpha numeric characters to camelCase', () => {
            const result = camelCase('hello-world');
            expect(result).toBe('helloWorld');
        });
    });

    describe('pascalCase', () => {
        it('should convert a lowercase string to pascalCase', () => {
            const result = pascalCase('hello world');
            expect(result).toBe('HelloWorld');
        });

        it('should convert a mixed-case string to pascalCase', () => {
            const result = pascalCase('hello World');
            expect(result).toBe('HelloWorld');
        });

        it('should convert a string with a custom separator to pascalCase', () => {
            const result = pascalCase('hello-world', '-');
            expect(result).toBe('HelloWorld');
        });
    });

    describe('kebabCase', () => {
        it('should convert a lowercase string to kebabCase', () => {
            const result = kebabCase('hello world');
            expect(result).toBe('hello-world');
        });
    });

    describe('escapeHtml', () => {
        it('should escape HTML characters in a string', () => {
            const result = escapeHtml('<div>Hello World</div>');
            expect(result).toBe('&lt;div&gt;Hello World&lt;/div&gt;');
        });
    });

    describe('removeZeroWidthSpace', () => {
        it('should remove zero-width spaces from a string', () => {
            const result = removeZeroWidthSpace('Hello World\u200B');
            expect(result).toBe('Hello World');
        });
    });

    describe('startsWithAny', () => {
        it('should return true if string starts with any of the items in the array', () => {
            const result = startsWithAny('Hello World', ['Hello', 'Hel']);
            expect(result).toBe(true);
        });

        it('should return false if string does not start with any of the items in the array', () => {
            const result = startsWithAny('Hello World', ['hello', 'rld']);
            expect(result).toBe(false);
        });
    });

    describe('endsWithAny', () => {
        it('should return true if string ends with any of the items in the array', () => {
            const result = endsWithAny('Hello World', ['World', 'Hel']);
            expect(result).toBe(true);
        });

        it('should return false if string does not start with any of the items in the array', () => {
            const result = endsWithAny('Hello World', ['hello', 'drf']);
            expect(result).toBe(false);
        });
    });

    describe('isValidUUID', () => {
        it('should return true if string is a valid UUID', () => {
            const result = isValidUUID('12345678-1234-1234-1234-123456789abc');
            expect(result).toBe(true);
        });

        it('should return false if string is not a valid UUID', () => {
            const result = isValidUUID('12345678-1234-1234-1234-123456789ab');
            expect(result).toBe(false);
        });
    });

    describe('randomHexColorCode', () => {
        it('should return a random hex color code', () => {
            const result = randomHexColorCode();
            expect(result).toMatch(/^#[0-9A-F]{6}$/i);
        });
    });

    describe('slugify', () => {
        it('should convert a string to a slug', () => {
            const result = slugify('Hello World');
            expect(result).toBe('hello-world');
        });

        it('should convert a string with special characters to a slug', () => {
            const result = slugify('Hello, World!');
            expect(result).toBe('hello-world');
        });
    });

    describe('truncate string', () => {
        it('truncates a string to the given length', () => {
            const originalString = 'This is a long string';
            const truncatedString = truncate(originalString, 10);
            expect(truncatedString).toBe('This is a ...');
        });

        it('does not truncate if the string is already shorter than the given length', () => {
            const originalString = 'Short string';
            const truncatedString = truncate(originalString, 20);
            expect(truncatedString).toBe(originalString);
        });

        it('returns empty string if input string is empty', () => {
            const originalString = '';
            const truncatedString = truncate(originalString, 20);
            expect(truncatedString).toBe('');
        });
    });

    describe('capitalize string', () => {
        it('capitalizes the first letter of a string', () => {
            const originalString = 'hello world';
            const capitalizedString = capitalize(originalString);
            expect(capitalizedString).toBe('Hello world');
        });

        it('does not change the case of the rest of the string', () => {
            const originalString = 'Hello WORLD';
            const capitalizedString = capitalize(originalString);
            expect(capitalizedString).toBe('Hello WORLD');
        });

        it('returns empty string if input string is empty', () => {
            const originalString = '';
            const capitalizedString = capitalize(originalString);
            expect(capitalizedString).toBe('');
        });
    });

    describe('test masked string', () => {
        it('should return a masked string', () => {
            const originalString = '1234567890';
            const maskedString = maskString(originalString);
            expect(maskedString).toBe('1234 **** 7890');
        });
    });

    describe('test string for alpha numeric', () => {
        it('test hasNonAlphanumeric', () => {
            expect(isAlphaNumeric('tag1')).toBe(true);
            expect(isAlphaNumeric('HelloWorld')).toBe(true);
            // Falsy test
            expect(isAlphaNumeric('github-actions')).toBe(false);
            expect(isAlphaNumeric('Hello-World')).toBe(false);
            expect(isAlphaNumeric('!!')).toBe(false);
        });
    });
});
