import { removeHtmlTags } from '../src/html';

describe('removeHtmlTags', () => {
    test('remove tags', () => {
        expect(removeHtmlTags('<p>Hello, world!</p>')).toBe('Hello, world!');
        expect(removeHtmlTags('<span>Hello, world!</span>')).toBe(
            'Hello, world!'
        );
        expect(removeHtmlTags('<div>Hello, world!</div>')).toBe(
            'Hello, world!'
        );
    });

    test('no tags', () => {
        expect(removeHtmlTags('Hello, world!')).toBe('Hello, world!');
    });
});
