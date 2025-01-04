/**
 * Validate email address
 * @param email Email address to validate
 * @returns True if email address is valid
 */
export const isValidEmail = (email: string) => {
    const re
    = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;
    return re.test(String(email).toLowerCase());
};

/**
 * Validate if IP is valid IPV4
 * @param ip IP address
 * @returns True if IPV4 is valid
 */
export const isValidIPV4 = (ip: string) => {
    const regex
    = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/m;
    return regex.test(ip);
};

/**
 * Validate if IP is valid IPV6
 * @param ip IP address
 * @returns True if IPV6 is valid
 */
export const isValidIPV6 = (ip: string) => {
    const regex
      = /(([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}|([0-9a-f]{1,4}:){1,6}:[0-9a-f]{1,4}|([0-9a-f]{1,4}:){1,5}(:[0-9a-f]{1,4}){1,2}|([0-9a-f]{1,4}:){1,4}(:[0-9a-f]{1,4}){1,3}|([0-9a-f]{1,4}:){1,3}(:[0-9a-f]{1,4}){1,4}|([0-9a-f]{1,4}:){1,2}(:[0-9a-f]{1,4}){1,5}|[0-9a-f]{1,4}:((:[0-9a-f]{1,4}){1,6})|:((:[0-9a-f]{1,4}){1,7}|:)|fe80:(:[0-9a-f]{0,4}){0,4}%[0-9a-z]+|::(ffff(:0{1,4})?:)?((25[0-5]|(2[0-4]|1?\d)?\d)\.){3}(25[0-5]|(2[0-4]|1?\d)?\d)|([0-9a-f]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1?\d)?\d)\.){3}(25[0-5]|(2[0-4]|1?\d)?\d))/i;
    return regex.test(ip);
};

/**
 * Validate url
 * @param url URL to validate
 * @returns True if valid url
 */
export const isValidUrl = (url: string) => {
    const urlPattern = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])?)\.)+[a-z]{2,}|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[-\w%.~+]*)*(\?[;&\w%.~+=-]*)?(#[-\w]*)?$/i;
    return urlPattern.test(url);
};

export const trimNewLines = (s: string) => s.replace(/^\n+|\n+$/g, '');
