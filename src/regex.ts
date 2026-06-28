 /**
 * Validate email address
 * @param email Email address to validate
 * @returns True if email address is valid
 * @example
 * isValidEmail('test@example.com'); // true
 */
export const isValidEmail = (email: string): boolean => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;
    return re.test(String(email).toLowerCase());
};

export const trimNewLines = (str: string): string => str.replaceAll(/^\n+|\n+$/g, '');
