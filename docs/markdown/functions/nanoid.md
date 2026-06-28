[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / nanoid

# Function: nanoid()

> **nanoid**(`size?`): `string`

Defined in: [crypto.ts:8](https://github.com/victory-sokolov/utils/blob/caee527f505518389286007305e12efcf44fe4fe/src/crypto.ts#L8)

`nanoid` implementation using Web Crypto `getRandomValues`.
Assumes a Web Crypto implementation is available (e.g. `window.crypto` or `globalThis.crypto`).

## Parameters

### size?

`number` = `21`

Length of the generated ID (default: 21)

## Returns

`string`
