import { describe, expect } from 'vitest';
import { isValidEmail, isValidIPV4, isValidIPV6 } from '../src/regex';

describe('isValidIPV4', () => {
    it('valid IP', () => {
        expect(isValidIPV4('192.168.0.1')).toBe(true);
    });

    it.each([
        ['256.256.256.256', false],
        ['192.168.0.1.2', false],
        ['192.168.0', false],
    ])('isValidIPV4(%s) should return %b', (ip, expected) => {
        expect(isValidIPV4(ip)).toBe(expected);
    });
});

describe('isValidIPV6', () => {
    it('valid IP', () => {
        expect(isValidIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
    });

    it.each([
        ['2001:0db8:85a3:0000:0000:8a2e:0370:7334', true],
        ['2001:db8::1', true],
        ['::1', true],
        ['invalid-ip', false],
    ])('isValidIPV6(%s) should return %b', (ip, expected) => {
        expect(isValidIPV6(ip)).toBe(expected);
    });
});

describe('isValidEmail', () => {
    it.each([
        ['test@example.com', true],
        ['test.email@example.com', true],
        ['invalid-email', false],
    ])('isValidEmail(%s) should return %b', (email, expected) => {
        expect(isValidEmail(email)).toBe(expected);
    });
});
