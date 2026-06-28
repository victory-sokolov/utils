[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / nanoid

# Function: nanoid()

> **nanoid**(`size?`): `string`

Defined in: [crypto.ts:8](https://github.com/victory-sokolov/utils/blob/a50714d8016225aed5e3c160c65495a4f3bbb725/src/crypto.ts#L8)

`nanoid` implementation using Web Crypto `getRandomValues`.
Assumes a Web Crypto implementation is available (e.g. `window.crypto` or `globalThis.crypto`).

## Parameters

### size?

`number` = `21`

Length of the generated ID (default: 21)

## Returns

`string`
