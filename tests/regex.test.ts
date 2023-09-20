import { isValidEmail, isValidIPV4, isValidIPV6, isValidUrl } from '../src/regex';
import { describe, test, expect } from 'vitest';

describe('isValidIPV4', () => {
    test('valid IP', () => {
        expect(isValidIPV4('192.168.0.1')).toBe(true);
    });

    test.each([
        ['256.256.256.256', false],
        ['192.168.0.1.2', false],
        ['192.168.0', false],
    ])('isValidIPV4(%s) should return %b', (ip, expected) => {
        expect(isValidIPV4(ip)).toBe(expected);
    });
});

describe('isValidIPV6', () => {
    test('valid IP', () => {
        expect(isValidIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
    });

    test('invalid IP', () => {
        expect(isValidIPV6('2001:0db8:85a3::8a2e:0370:7334:1234')).toBe(true);
    });
});

describe('isValidEmail', () => {
    test.each([
        ['example@email.com', true],
        ['example@email', false],
        ['exampleemail.com', false],
        ['example@email.com', true],
        ['example@email.c', false],
        ['example@email.com.', false],
    ])('isValidEmail(%s) should return %b', (url, expected) => {
        expect(isValidEmail(url)).toBe(expected);
    });
});

describe('isValidUrl', () => {
    test.each([
        ['https://google.com', true],
        ['http://localhost:3000', false],
        ['ftp://example.com', false],
        ['https://192.168.1.1', true],
        ['example.com', true],
    ])('isValidUrl(%s) should return %b', (url, expected) => {
        expect(isValidUrl(url)).toBe(expected);
    });
});
