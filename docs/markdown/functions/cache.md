[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / cache

# Function: cache()

> **cache**\<`T`\>(): [`CacheAPI`](../interfaces/_internal_.CacheAPI.md)\<`T`\>

Defined in: [cache.ts:37](https://github.com/victory-sokolov/utils/blob/2c4cc43a8b863a0ab511d642adc1b93c4bf812c5/src/cache.ts#L37)

Creates a simple cache without eviction or expiration.
Use `lruCache` for LRU eviction and TTL support.

## Type Parameters

### T

`T` = `unknown`

## Returns

[`CacheAPI`](../interfaces/_internal_.CacheAPI.md)\<`T`\>
