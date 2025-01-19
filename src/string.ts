/**
 * String to camelCase
 * @param str string to camelCase
 * @returns Camelcased string
 */
export const camelCase = (str: string): string => {
    return (
        str
        // Convert the string to lowercase
            .toLowerCase()
        // Remove all non-alphanumeric characters and spaces
            .replace(/[^a-z0-9]/g, ' ')
        // Capitalize the first letter of each word (after spaces)
            .replace(/\s(\w)/g, (match, letter) => letter.toUpperCase())
        // Remove leading spaces
            .replace(/\s+/g, '')
        // Return the first letter in lowercase and the rest as-is
            .replace(/^(\w)/, (match, letter) => letter.toLowerCase())
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
        .replaceAll('\'', '&#039;');
};

/**
 * Remove Zerowidth characters from string
 * @param str string to clean up
 * @returns string with zerowidth characters removed
 */
export const removeZeroWidthSpace = (str: string): string =>
    str.replace(/[\u200B-\u200D\uFEFF]/g, '');

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
    const regexExp
    = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regexExp.test(id);
};

/**
 * Generate random HEX color
 * @returns HEX code
 */
export const randomHexColorCode = (): string => {
    const n = (Math.random() * 0xFFFFF * 1000000).toString(16);
    return `#${n.slice(0, 6)}`;
};

/**
 * Generate random string
 * @param len
 * @param prefix
 * @returns Random string
 */
export const randomStr = (len = 32, prefix = '') => {
    let s = prefix;
    for (let i = 0; i < len; i++) {
        const rand = Math.random();
        const floor = Math.floor(rand * 36);
        const c = floor.toString(36);
        s += floor > 9 && rand > 0.3 && rand < 0.7 ? c.toUpperCase() : c;
    }
    return s.substring(0, len);
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
        .replace(/-{2,}/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
};

/**
 * Capitalize first letter
 * @param str Stirng to capitalize
 * @returns Capitalized string
 */
export const capitalize = (str: string): string => {
    if (!str || typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate string to n characters
 * @param str Stirng to truncate
 * @param length Length of string to truncate
 * @returns Truncated string
 */
export const truncate = (str: string, length: number) => {
    if (!str || str.length <= length) return str;
    return `${str.slice(0, length)}...`;
};

/**
 * Mask sensitive string
 * @param str
 * @returns Masked string
 */
export const maskString = (str: string) => {
    const firstChars = str.slice(0, 4);
    const lastChars = str.slice(str.length - 4);
    return `${firstChars} **** ${lastChars}`;
};

/**
 * Checks if a string contains any non-alphanumeric characters.
 * @param str - The input string to validate.
 * @returns `true` if the string contains non-alphanumeric characters, otherwise `false`.
 */
export const isAlphaNumeric = (str: string): boolean => /[a-z0-9]/i.test(str);
