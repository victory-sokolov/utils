/**
 * Validate email address
 * @param email Email address to validate
 * @returns True if email address is valid
 */
export const isValidEmail = (email: string) => {
    const re
        = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

/**
 * Validate if IP is valid IPV4
 * @param ip IP address
 * @returns True if IPV4 is valid
 */
export const isValidIPV4 = (ip: string) => {
    const regex
        = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm;
    return regex.test(ip);
};

/**
 * Validate if IP is valid IPV6
 * @param ip IP address
 * @returns True if IPV6 is valid
 */
export const isValidIPV6 = (ip: string) => {
    const regex
        = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/gi;
    return regex.test(ip);
};

/**
 * Validate url
 * @param url URL to validate
 * @returns True if valid url
 */
export const isValidUrl = (url: string) => {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' // validate protocol
        + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // validate domain name
        + '((\\d{1,3}\\.){3}\\d{1,3}))' // validate OR ip (v4) address
        + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // validate port and path
        + '(\\?[;&a-z\\d%_.~+=-]*)?' // validate query string
        + '(\\#[-a-z\\d_]*)?$',
        'i',
    );

    return urlPattern.test(url);
};

export const trimNewLines = (s: string) => s.replace(/^\n+|\n+$/g, '');
