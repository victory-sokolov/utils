[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / cache

# Function: cache()

> **cache**\<`T`\>(): [`CacheAPI`](../interfaces/_internal_.CacheAPI.md)\<`T`\>

Defined in: [cache.ts:37](https://github.com/victory-sokolov/utils/blob/f15da8f6aa5988652bf061bf72db9cb74604095a/src/cache.ts#L37)

Creates a simple cache without eviction or expiration.
Use `lruCache` for LRU eviction and TTL support.

## Type Parameters

### T

`T` = `unknown`

## Returns

[`CacheAPI`](../interfaces/_internal_.CacheAPI.md)\<`T`\>
