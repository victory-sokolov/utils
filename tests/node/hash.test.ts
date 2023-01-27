import { hashString } from '../../src';
import { randomBytes } from 'node:crypto';

describe('cryptography', () => {
    let randomBytes: jest.MockedFunction<typeof import('node:crypto').randomBytes>;
    let pbkdf2Sync: jest.MockedFunction<typeof import('node:crypto').pbkdf2Sync>;

    beforeEach(async () => {
        const crypto = await import('node:crypto');
        randomBytes = jest.spyOn(crypto, 'randomBytes') as jest.MockedFunction<typeof crypto.randomBytes>;
        pbkdf2Sync = jest.spyOn(crypto, 'pbkdf2Sync') as jest.MockedFunction<typeof crypto.pbkdf2Sync>;
    });

    test.skip('hashString should return an object with the salt and hashed password', () => {
        randomBytes.mockReturnValueOnce(Buffer.from('salt'));
        pbkdf2Sync.mockImplementation((password, salt, iterations, keyLen, digest) => {
            return Buffer.from('hashed-password');
        });

        const result = hashString('password');
        expect(result).toEqual({ salt: 'salt', hash: 'hashed-password' });
    });

    test.skip('hashString should throw an error if the pbkdf2Sync function returns an error', () => {
        randomBytes.mockReturnValue(Buffer.from('salt'));
        pbkdf2Sync.mockImplementation((password, salt, iterations, keyLen, digest) => {
            throw new Error('pbkdf2Sync error');
        });

        expect(() => hashString('password')).toThrow('pbkdf2Sync error');
    });
});
