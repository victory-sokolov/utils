[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / decryptData

# Function: decryptData()

> **decryptData**(`encryptedData`, `secretKey`): `Promise`\<`string`\>

Defined in: [cryptography.ts:135](https://github.com/victory-sokolov/utils/blob/2c4cc43a8b863a0ab511d642adc1b93c4bf812c5/src/node/cryptography.ts#L135)

Decrypts encrypted data using AES-GCM.

## Parameters

### encryptedData

`string`

The encrypted Base64 string (salt + IV + ciphertext).

### secretKey

`string`

The secret key (must be the same as used during encryption).

## Returns

`Promise`\<`string`\>

The decrypted plain text string.
