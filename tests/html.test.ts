import { describe, expect } from 'vitest';
import { escape, removeHtmlTags, unescape, removeInlineStyles } from '../src/html'; // Added removeInlineStyles

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

describe('removeInlineStyles', () => {
    it('should remove inline style attributes', () => {
        const html = '<p style="color: red;">Hello</p><div style="font-size: 16px;">World</div>';
        const expected = '<p>Hello</p><div>World</div>';
        expect(removeInlineStyles(html)).toBe(expected);
    });

    it('should return the original string if no inline styles are present', () => {
        const html = '<p>Hello</p><div>World</div>';
        expect(removeInlineStyles(html)).toBe(html);
    });

    it('should handle multiple style attributes on the same tag', () => {
        const html = '<p style="color: red;" id="test" style="font-size: 12px;">Text</p>';
        const expected = '<p id="test">Text</p>';
        expect(removeInlineStyles(html)).toBe(expected);
    });

    it('should handle empty style attributes', () => {
        const html = '<p style="">Hello</p>';
        const expected = '<p>Hello</p>';
        expect(removeInlineStyles(html)).toBe(expected);
    });

    it('should handle empty input string', () => {
        expect(removeInlineStyles('')).toBe('');
    });
});

describe('escape HTML entities', () => {
    it('escape html string', () => {
        const html = '<html></html>';
        expect(escape(html)).toBe('&lt;html&gt;&lt;/html&gt;');
    });

    it('should return empty string for null, undefined or empty input', () => {
        expect(escape(null as any)).toBe('');
        expect(escape(undefined as any)).toBe('');
        expect(escape('')).toBe('');
    });

    it('should return the original string if no HTML characters need escaping', () => {
        expect(escape('Hello, world!')).toBe('Hello, world!');
        expect(escape('123')).toBe('123');
        expect(escape('foo bar')).toBe('foo bar');
    });

    it('should escape all relevant HTML characters', () => {
        expect(escape('<>"\'')).toBe('&lt;&gt;&quot;&#39;');
        expect(escape('String with <tag>, "quote", & ampersand, \'apostrophe\'')).toBe('String with &lt;tag&gt;, &quot;quote&quot;, &amp; ampersand, &#39;apostrophe&#39;');
    });
});

describe('unescape HTML entities', () => {
    it('unescape html string', () => {
        const html = '<html></html>';
        expect(unescape('&lt;html&gt;&lt;/html&gt;')).toBe(html);
    });

    it('should return empty string for null, undefined or empty input', () => {
        expect(unescape(null as any)).toBe('');
        expect(unescape(undefined as any)).toBe('');
        expect(unescape('')).toBe('');
    });

    it('should return the original string if no HTML entities need unescaping', () => {
        expect(unescape('Hello, world!')).toBe('Hello, world!');
        expect(unescape('123')).toBe('123');
        expect(unescape('foo bar')).toBe('foo bar');
    });

    it('should unescape all relevant HTML entities', () => {
        expect(unescape('&lt;&gt;&quot;&#39;&amp;')).toBe('<>"\'&');
        expect(unescape('String with &lt;tag&gt;, &quot;quote&quot;, &amp;ampersand, &#39;apostrophe&#39;')).toBe('String with <tag>, "quote", &ampersand, \'apostrophe\'');
    });

    it('should handle numeric and hex character references', () => {
        expect(unescape('&#x27;')).toBe("'"); // Hex for '
        expect(unescape('&#39;')).toBe("'"); // Numeric for '
        expect(unescape('&#0039;')).toBe("'"); // Padded numeric for '
    });
    it('should handle unknown or malformed entities by returning the original entity or default', () => {
        // The current implementation defaults to '\'' for unknown entities,
        // which might be an intended behavior or a side-effect.
        // It's defined in htmlUnescapes, where undefined entity returns '\''
        expect(unescape('&unknown;')).toBe('&unknown;'); // Should remain as is
        expect(unescape('&ampersand;')).toBe('&ampersand;'); // Not recognized by the map
        expect(unescape('&#xyz;')).toBe('&#xyz;'); // Malformed numeric/hex
    });

    it('should return &apos; for &apos; as it is not in the unescapes map', () => {
        expect(unescape('&apos;')).toBe('&apos;');
    });

});
