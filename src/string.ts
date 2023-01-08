/**
 * String to camelCase
 * @param str string to camelCase
 * @returns Camelcased string
 */
export const camelCase = (str: string): string => {
    return (
        str
            .toLocaleLowerCase()
            // remove any non alpha-numeric chars (but leave spaces)
            .replace(/[^a-zA-Z0-9 ]/g, ' ')
            // capitalize any words with a leading space (and remove the space)
            .replace(/\s+(\w)?/gi, (m, l) => l.toUpperCase())
    );
};

/**
 * String to pascalcase
 * @param str string to pascalcase
 * @returns Pascal case string
 */
export const pascalCase = (str: string, separator = ' '): string => {
    return str
        .split(separator)
        .map((word) => word.replace(/^\w/, (c) => c.toUpperCase()))
        .join('');
};

/**
 * String to kebabcase
 * @param str string to kebabcase
 * @returns KebabCase string
 */
export const kebabCase = (str: string): string => {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]/g, '-')
        .toLowerCase();
};

/**
 * Escape HTML string
 * @param unsafe Unsafe string to escape
 * @returns escaped HTML string
 */
export const escapeHtml = (unsafe: string): string => {
    return unsafe
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
};

/**
 * Remove Zerowidth characters from string
 * @param str string to clean up
 * @returns string with zerowidth characters removed
 */
export const removeZeroWidthSpace = (str: string): string => str.replace(/[\u200B-\u200D\uFEFF]/g, '');

/**
 * Check whether string ends with any item in the array
 * @param data The string to check if it ends with
 * @param items String array of items to check agains the data string
 * @returns boolean
 */
export const endsWithAny = (data: string, items: string[]): boolean => {
    return items.some((element) => data.endsWith(element));
};

/**
 * Check whether string starts with any item in the array
 * @param data The string to check if it starts with
 * @param items String array of items to check agains the data string
 * @returns boolean
 */
export const startsWithAny = (data: string, items: string[]): boolean => {
    return items.some((element) => data.startsWith(element));
};

/**
 * Validate if string is a valid UUID
 * @param id UUID to validate
 * @returns True if UUID is valid
 */
export const isValidUUID = (id: string): boolean => {
    // Regular expression to check if string is a valid UUID
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(id);
};

/**
 * Generate random HEX color
 * @returns HEX code
 */
export const randomHexColorCode = (): string => {
    const n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};

/**
 * Slugify text
 * @param text text to be slugified
 * @returns slugified text
 */
export const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
};
