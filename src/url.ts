/**
 * Add trailing slash to url
 * @param url URL to add trailing slash
 * @returns URL with trailing slash added
 */
export const addTrailingSlash = (url: string) => {
    return url.replace(/\/?$/, '/');
};
