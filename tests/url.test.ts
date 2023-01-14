import { addTrailingSlash } from '../src/url';

describe('addTrailingSlash', () => {
    it('should add a trailing slash to the url if it does not have one', () => {
        expect(addTrailingSlash('http://example.com')).toEqual('http://example.com/');
    });

    it('should not add a trailing slash if the url already has one', () => {
        expect(addTrailingSlash('http://example.com/')).toEqual('http://example.com/');
    });

    it('should work with empty string', () => {
        expect(addTrailingSlash('')).toEqual('/');
    });

    it('should not add a trailing slash if the url is a root path', () => {
        expect(addTrailingSlash('/')).toEqual('/');
    });
});
