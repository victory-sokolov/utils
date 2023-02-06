import { flip } from './object';

const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};
const htmlUnescapes = flip(htmlEscapes) as Record<string, string>;

/** Used to match HTML entities and HTML characters. */
const reUnescapedHtml = /[&<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

const reEscapedHtml = /&(?:amp|lt|gt|quot|#(0+)?39);/g;
const reHasEscapedHtml = RegExp(reEscapedHtml.source);

/**
 * Remove HTML tags from the text
 * @param text Text with HTML tags
 * @returns Text with HTML tags removed
 */
export const removeHtmlTags = (text: string): string => text.replace(/<(?:.|\\n)*?>/gm, '');

/**
 * Escape HTML tags to entities
 * @param str HTML string
 * @returns Escaped HTML tags
 */
export const escape = (str: string) => {
    return str && reHasUnescapedHtml.test(str) ? str.replace(reUnescapedHtml, (chr) => htmlEscapes[chr]) : str || '';
};

/**
 * Unescape HTML entities
 * @param str HTML string
 * @returns Unescaped HTML entity
 */
export const unescape = (str: string) => {
    return str && reHasEscapedHtml.test(str)
        ? str.replace(reEscapedHtml, (entity) => htmlUnescapes[entity] || "'")
        : str || '';
};
