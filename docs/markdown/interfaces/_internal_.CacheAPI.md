[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / [\<internal\>](../modules/_internal_.md) / CacheAPI

# Interface: CacheAPI\<T\>

Defined in: [cache.ts:3](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/cache.ts#L3)

## Extended by

- [`LRUCacheAPI`](LRUCacheAPI.md)

## Type Parameters

### T

`T` = `unknown`

## Properties

### clear

> **clear**: () => `void`

Defined in: [cache.ts:4](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/cache.ts#L4)

#### Returns

`void`

***

### get

> **get**: (`key`) => [`Maybe`](../types/Maybe.md)\<`T`\>

Defined in: [cache.ts:5](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/cache.ts#L5)

#### Parameters

##### key

`string`

#### Returns

[`Maybe`](../types/Maybe.md)\<`T`\>

***

### has

> **has**: (`key`) => `boolean`

Defined in: [cache.ts:6](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/cache.ts#L6)

#### Parameters

##### key

`string`

#### Returns

`boolean`

***

### remove

> **remove**: (`key`) => `void`

Defined in: [cache.ts:7](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/cache.ts#L7)

#### Parameters

##### key

`string`

#### Returns

`void`

***

### set

> **set**: (`key`, `value`) => `void`

Defined in: [cache.ts:8](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/cache.ts#L8)

#### Parameters

##### key

`string`

##### value

`T`

#### Returns

`void`

***

### size

> `readonly` **size**: `number`

Defined in: [cache.ts:9](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/cache.ts#L9)
