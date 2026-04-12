[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / encryptData

# Function: encryptData()

> **encryptData**(`plainText`, `secretKey`): `Promise`\<`string`\>

Defined in: [cryptography.ts:110](https://github.com/victory-sokolov/utils/blob/65f11a56369c99065554109006908574974c4ac4/src/node/cryptography.ts#L110)

Encrypts a string using AES-GCM with a given secret key.

## Parameters

### plainText

`string`

The text to encrypt.

### secretKey

`string`

The secret key (must be at least 32 characters long).

## Returns

`Promise`\<`string`\>

Encrypted text (base64 encoded: salt + IV + ciphertext).
