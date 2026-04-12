[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / decryptData

# Function: decryptData()

> **decryptData**(`encryptedData`, `secretKey`): `Promise`\<`string`\>

Defined in: [cryptography.ts:135](https://github.com/victory-sokolov/utils/blob/aec88aef4778a8955e120244d504b1a222c7f010/src/node/cryptography.ts#L135)

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
