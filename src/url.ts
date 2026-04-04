/**
 * Validate url
 * @param url URL to validate
 * @returns True if valid url
 */
export const isValidUrl = (url: string): boolean => {
    const urlPattern =
        /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])?)\.)+[a-z]{2,}|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[-\w%.~+]*)*(\?[;&\w%.~+=-]*)?(#[-\w]*)?$/i;
    return urlPattern.test(url);
};

/**
 * Add trailing slash to url
 * @param url URL to add trailing slash
 * @returns URL with trailing slash added
 */
export const addTrailingSlash = (url: string): string => url.replace(/\/?$/, '/');

/**
 * Get query parameters from URL
 * @param url URL to extract query params from
 * @returns Object with query parameters
 */
export const getQueryParams = (url: string): Record<string, string> => {
    const [, queryString] = url.split('?');
    if (!queryString) {
        return {};
    }
    const params = new URLSearchParams(queryString);
    const result: Record<string, string> = {};
    for (const [key, value] of params) {
        result[key] = value;
    }
    return result;
};

/**
 * Build query string from params object
 * @param params Object with query parameters
 * @returns Query string
 */
export const buildQueryString = (params: Record<string, string | number>): string => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        searchParams.append(key, String(value));
    }
    return searchParams.toString();
};

const removeQueryParamCore = (url: string, param: string): string => {
    const [base, query] = url.split('?');
    if (!query || !base) {
        return url;
    }
    const params = new URLSearchParams(query);
    params.delete(param);
    const newQuery = params.toString();
    if (newQuery) {
        return `${base}?${newQuery}`;
    }
    return base;
};

/**
 * Remove query parameter from URL
 * @param url URL to remove param from
 * @param param Parameter name to remove
 * @returns URL without the specified parameter
 */
export const removeQueryParam = (url: string, param: string): string => {
    try {
        return removeQueryParamCore(url, param);
    } catch {
        return url;
    }
};

/**
 * Get domain from URL
 * @param url URL to extract domain from
 * @returns Domain string
 */
export const getUrlDomain = (url: string): string => {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch {
        return '';
    }
};
