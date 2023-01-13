import {
    camelCase,
    pascalCase,
    kebabCase,
    escapeHtml,
    removeZeroWidthSpace,
    endsWithAny,
    startsWithAny,
    isValidUUID,
    randomHexColorCode,
    slugify,
    truncate,
    capitalize,
} from '../src/string';

describe('string-utils', () => {
    describe('camelCase', () => {
        it('should convert a lowercase string to camelCase', () => {
            const result = camelCase('hello world');
            expect(result).toEqual('helloWorld');
        });

        it('should convert a mixed-case string to camelCase', () => {
            const result = camelCase('hello World');
            expect(result).toEqual('helloWorld');
        });

        it('should convert a string with non-alpha numeric characters to camelCase', () => {
            const result = camelCase('hello-world');
            expect(result).toEqual('helloWorld');
        });
    });

    describe('pascalCase', () => {
        it('should convert a lowercase string to pascalCase', () => {
            const result = pascalCase('hello world');
            expect(result).toEqual('HelloWorld');
        });

        it('should convert a mixed-case string to pascalCase', () => {
            const result = pascalCase('hello World');
            expect(result).toEqual('HelloWorld');
        });

        it('should convert a string with a custom separator to pascalCase', () => {
            const result = pascalCase('hello-world', '-');
            expect(result).toEqual('HelloWorld');
        });
    });

    describe('kebabCase', () => {
        it('should convert a lowercase string to kebabCase', () => {
            const result = kebabCase('hello world');
            expect(result).toEqual('hello-world');
        });
    });

    describe('escapeHtml', () => {
        it('should escape HTML characters in a string', () => {
            const result = escapeHtml('<div>Hello World</div>');
            expect(result).toEqual('&lt;div&gt;Hello World&lt;/div&gt;');
        });
    });

    describe('removeZeroWidthSpace', () => {
        it('should remove zero-width spaces from a string', () => {
            const result = removeZeroWidthSpace('Hello World\u200B');
            expect(result).toEqual('Hello World');
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
            expect(result).toMatch(/^#[0-9A-Fa-f]{6}$/);
        });
    });

    describe('slugify', () => {
        it('should convert a string to a slug', () => {
            const result = slugify('Hello World');
            expect(result).toEqual('hello-world');
        });

        it('should convert a string with special characters to a slug', () => {
            const result = slugify('Hello, World!');
            expect(result).toEqual('hello-world');
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
        test('capitalizes the first letter of a string', () => {
            const originalString = 'hello world';
            const capitalizedString = capitalize(originalString);
            expect(capitalizedString).toBe('Hello world');
        });

        test('does not change the case of the rest of the string', () => {
            const originalString = 'Hello WORLD';
            const capitalizedString = capitalize(originalString);
            expect(capitalizedString).toBe('Hello WORLD');
        });

        test('returns empty string if input string is empty', () => {
            const originalString = '';
            const capitalizedString = capitalize(originalString);
            expect(capitalizedString).toBe('');
        });

    })
});
