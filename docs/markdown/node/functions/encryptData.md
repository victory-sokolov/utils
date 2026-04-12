[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / encryptData

# Function: encryptData()

> **encryptData**(`plainText`, `secretKey`): `Promise`\<`string`\>

Defined in: [cryptography.ts:110](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/node/cryptography.ts#L110)

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
