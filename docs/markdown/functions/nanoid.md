[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / nanoid

# Function: nanoid()

> **nanoid**(`size?`): `string`

Defined in: [crypto.ts:8](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/crypto.ts#L8)

`nanoid` implementation using Web Crypto `getRandomValues`.
Assumes a Web Crypto implementation is available (e.g. `window.crypto` or `globalThis.crypto`).

## Parameters

### size?

`number` = `21`

Length of the generated ID (default: 21)

## Returns

`string`
