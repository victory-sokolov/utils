[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / nanoid

# Function: nanoid()

> **nanoid**(`size?`): `string`

Defined in: [crypto.ts:8](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/crypto.ts#L8)

`nanoid` implementation using Web Crypto `getRandomValues`.
Assumes a Web Crypto implementation is available (e.g. `window.crypto` or `globalThis.crypto`).

## Parameters

### size?

`number` = `21`

Length of the generated ID (default: 21)

## Returns

`string`
