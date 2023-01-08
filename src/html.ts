/**
 * Remove HTML tags from the text
 * @param text Text with HTML tags
 * @returns Text with HTML tags removed
 */
export const removeHtmlTags = (text: string): string =>
    text.replace(/<(?:.|\\n)*?>/gm, '');
