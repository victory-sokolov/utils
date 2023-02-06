import { escape, unescape, removeHtmlTags } from '../src/html';

describe('removeHtmlTags', () => {
    test('remove tags', () => {
        expect(removeHtmlTags('<p>Hello, world!</p>')).toBe('Hello, world!');
        expect(removeHtmlTags('<span>Hello, world!</span>')).toBe('Hello, world!');
        expect(removeHtmlTags('<div>Hello, world!</div>')).toBe('Hello, world!');
    });

    test('no tags', () => {
        expect(removeHtmlTags('Hello, world!')).toBe('Hello, world!');
    });
});

describe('escape HTML entities', () => {
    test('escape html string', () => {
        const html = '<html></html>';
        expect(escape(html)).toBe('&lt;html&gt;&lt;/html&gt;');
    });
});

describe('unescape HTML entities', () => {
    test('unescape html string', () => {
        const html = '<html></html>';
        expect(unescape('&lt;html&gt;&lt;/html&gt;')).toBe(html);
    });
});
