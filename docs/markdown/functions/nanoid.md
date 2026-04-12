[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / nanoid

# Function: nanoid()

> **nanoid**(`size?`): `string`

Defined in: [crypto.ts:8](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/crypto.ts#L8)

`nanoid` implementation using Web Crypto `getRandomValues`.
Assumes a Web Crypto implementation is available (e.g. `window.crypto` or `globalThis.crypto`).

## Parameters

### size?

`number` = `21`

Length of the generated ID (default: 21)

## Returns

`string`
