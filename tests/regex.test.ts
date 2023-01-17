import { isValidEmail, isValidIPV4, isValidIPV6 } from '../src/regex';

describe('isValidIPV4', () => {
    test('valid IP', () => {
        expect(isValidIPV4('192.168.0.1')).toBe(true);
    });

    test('invalid IPV4', () => {
        expect(isValidIPV4('256.256.256.256')).toBe(false);
        expect(isValidIPV4('192.168.0.1.2')).toBe(false);
        expect(isValidIPV4('192.168.0')).toBe(false);
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
    test('validateEmail', () => {
        expect(isValidEmail('example@email.com')).toBe(true);
        expect(isValidEmail('example@email')).toBe(false);
        expect(isValidEmail('exampleemail.com')).toBe(false);
        expect(isValidEmail('example@email.c')).toBe(false);
        expect(isValidEmail('example@email.com.')).toBe(false);
    });
});
