import { describe, expect, it } from 'vitest';
import {
    addTrailingSlash,
    buildQueryString,
    getQueryParams,
    getUrlDomain,
    isValidUrl,
    removeQueryParam,
} from '../src/url';

describe('addTrailingSlash', () => {
    it('should add a trailing slash to the url if it does not have one', () => {
        expect(addTrailingSlash('http://example.com')).toBe('http://example.com/');
    });

    it('should not add a trailing slash if the url already has one', () => {
        expect(addTrailingSlash('http://example.com/')).toBe('http://example.com/');
    });

    it('should work with empty string', () => {
        expect(addTrailingSlash('')).toBe('/');
    });

    it('should not add a trailing slash if the url is a root path', () => {
        expect(addTrailingSlash('/')).toBe('/');
    });
});

describe('isValidUrl', () => {
    it.each([
        ['https://google.com', true],
        ['http://localhost:3000', false],
        ['ftp://example.com', false],
        ['https://192.168.1.1', true],
        ['example.com', true],
    ])('isValidUrl(%s) should return %b', (url, expected) => {
        expect(isValidUrl(url)).toBe(expected);
    });
});

describe('getQueryParams', () => {
    it('should parse query params from URL', () => {
        expect(getQueryParams('https://example.com?foo=bar&baz=qux')).toEqual({
            foo: 'bar',
            baz: 'qux',
        });
    });

    it('should return empty object if no query params', () => {
        expect(getQueryParams('https://example.com')).toEqual({});
    });

    it('should handle URL without query string', () => {
        expect(getQueryParams('https://example.com?')).toEqual({});
    });
});

describe('buildQueryString', () => {
    it('should build query string from object', () => {
        expect(buildQueryString({ foo: 'bar', baz: 'qux' })).toBe('foo=bar&baz=qux');
    });

    it('should handle number values', () => {
        expect(buildQueryString({ page: 1, limit: 10 })).toBe('page=1&limit=10');
    });

    it('should return empty string for empty object', () => {
        expect(buildQueryString({})).toBe('');
    });
});

describe('removeQueryParam', () => {
    it('should remove specified query param', () => {
        expect(removeQueryParam('https://example.com?foo=bar&baz=qux', 'foo')).toBe(
            'https://example.com?baz=qux',
        );
    });

    it('should return original URL if param not found', () => {
        expect(removeQueryParam('https://example.com?foo=bar', 'baz')).toBe(
            'https://example.com?foo=bar',
        );
    });

    it('should handle URL without query string', () => {
        expect(removeQueryParam('https://example.com', 'foo')).toBe('https://example.com');
    });
});

describe('getUrlDomain', () => {
    it('should extract domain from URL', () => {
        expect(getUrlDomain('https://www.example.com/path?foo=bar')).toBe('www.example.com');
    });

    it('should return empty string for invalid URL', () => {
        expect(getUrlDomain('not-a-url')).toBe('');
    });
});
