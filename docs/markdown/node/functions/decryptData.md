[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / decryptData

# Function: decryptData()

> **decryptData**(`encryptedData`, `secretKey`): `Promise`\<`string`\>

Defined in: [cryptography.ts:135](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/node/cryptography.ts#L135)

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
