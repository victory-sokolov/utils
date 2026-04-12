[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / LRUCacheAPI

# Interface: LRUCacheAPI\<T\>

Defined in: [cache.ts:13](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/cache.ts#L13)

LRU cache API with TTL support

## Extends

- [`CacheAPI`](_internal_.CacheAPI.md)\<`T`\>

## Type Parameters

### T

`T` = `unknown`

## Properties

### get

> **get**: (`key`) => [`Maybe`](../types/Maybe.md)\<`T`\>

Defined in: [cache.ts:15](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/cache.ts#L15)

Get a value, returning null if expired or not found

#### Parameters

##### key

`string`

#### Returns

[`Maybe`](../types/Maybe.md)\<`T`\>

#### Overrides

[`CacheAPI`](_internal_.CacheAPI.md).[`get`](_internal_.CacheAPI.md#get)

***

### set

> **set**: (`key`, `value`) => `void`

Defined in: [cache.ts:17](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/cache.ts#L17)

Set a value with automatic expiration based on TTL

#### Parameters

##### key

`string`

##### value

`T`

#### Returns

`void`

#### Overrides

[`CacheAPI`](_internal_.CacheAPI.md).[`set`](_internal_.CacheAPI.md#set)

***

### has

> **has**: (`key`) => `boolean`

Defined in: [cache.ts:19](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/cache.ts#L19)

Check if key exists and hasn't expired

#### Parameters

##### key

`string`

#### Returns

`boolean`

#### Overrides

[`CacheAPI`](_internal_.CacheAPI.md).[`has`](_internal_.CacheAPI.md#has)

***

### remove

> **remove**: (`key`) => `boolean`

Defined in: [cache.ts:21](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/cache.ts#L21)

Delete a key from cache

#### Parameters

##### key

`string`

#### Returns

`boolean`

#### Overrides

[`CacheAPI`](_internal_.CacheAPI.md).[`remove`](_internal_.CacheAPI.md#remove)

***

### clear

> **clear**: () => `void`

Defined in: [cache.ts:23](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/cache.ts#L23)

Clear all entries

#### Returns

`void`

#### Overrides

[`CacheAPI`](_internal_.CacheAPI.md).[`clear`](_internal_.CacheAPI.md#clear)

***

### size

> `readonly` **size**: `number`

Defined in: [cache.ts:25](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/cache.ts#L25)

Current number of entries

#### Overrides

[`CacheAPI`](_internal_.CacheAPI.md).[`size`](_internal_.CacheAPI.md#size)
