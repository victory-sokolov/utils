import { flip } from './object';

const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
};
const htmlUnescapes = flip(htmlEscapes) as Record<string, string>;

/** Used to match HTML entities and HTML characters. */
const reUnescapedHtml = /[&<>"']/g;
const reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);

const reEscapedHtml = /&(?:amp|lt|gt|quot|apos|#x[\da-fA-F]+|#\d+);/g;
const reHasEscapedHtml = new RegExp(reEscapedHtml.source);

/**
 * Remove HTML tags from the text
 * @param text Text with HTML tags
 * @returns Text with HTML tags removed
 */
export const removeHtmlTags = (text: string): string =>
    text.replace(/<(?:.|\\n)*?>/g, '');

/**
 * Remove inline css styles
 * @param text HTML with inline styles
 * @returns cleaned HTML with inline styles removed
 */
export const removeInlineStyles = (text: string): string =>
    text.replace(/\s*style\s*=\s*"(.*?)"/g, '');

/**
 * Escape HTML tags to entities
 * @param str HTML string
 * @returns Escaped HTML tags
 */
export const escape = (str: string) => {
    return str && reHasUnescapedHtml.test(str)
        ? str.replace(reUnescapedHtml, (chr) => htmlEscapes[chr as keyof typeof htmlEscapes])
        : str || '';
};

/**
 * Unescape HTML entities
 * @param str HTML string
 * @returns Unescaped HTML entity
 */
export const unescape = (str: string) => {
    return str && reHasEscapedHtml.test(str)
        ? str.replace(reEscapedHtml, (entity) => {
            if (entity.startsWith('&#x')) {
                return String.fromCodePoint(parseInt(entity.slice(3, -1), 16));
            } else if (entity.startsWith('&#')) {
                return String.fromCodePoint(parseInt(entity.slice(2, -1), 10));
            }
            return htmlUnescapes[entity] || entity;
        })
        : str || '';
};
