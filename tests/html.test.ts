import { describe, expect } from 'vitest';
import { escape, removeHtmlTags, unescape } from '../src/html';

describe('removeHtmlTags', () => {
    it('remove tags', () => {
        expect(removeHtmlTags('<p>Hello, world!</p>')).toBe('Hello, world!');
        expect(removeHtmlTags('<span>Hello, world!</span>')).toBe('Hello, world!');
        expect(removeHtmlTags('<div>Hello, world!</div>')).toBe('Hello, world!');
    });

    it('no tags', () => {
        expect(removeHtmlTags('Hello, world!')).toBe('Hello, world!');
    });
});

describe('escape HTML entities', () => {
    it('escape html string', () => {
        const html = '<html></html>';
        expect(escape(html)).toBe('&lt;html&gt;&lt;/html&gt;');
    });
});

describe('unescape HTML entities', () => {
    it('unescape html string', () => {
        const html = '<html></html>';
        expect(unescape('&lt;html&gt;&lt;/html&gt;')).toBe(html);
    });
});
