[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / lruCache

# Function: lruCache()

> **lruCache**\<`T`\>(`maxSize`, `ttl`): [`LRUCacheAPI`](../interfaces/LRUCacheAPI.md)\<`T`\>

Defined in: [cache.ts:109](https://github.com/victory-sokolov/utils/blob/f15da8f6aa5988652bf061bf72db9cb74604095a/src/cache.ts#L109)

Creates an LRU cache with TTL (time-to-live) support.

## Type Parameters

### T

`T` = `unknown`

## Parameters

### maxSize

`number`

Maximum number of entries before eviction

### ttl

`number`

Time-to-live in milliseconds

## Returns

[`LRUCacheAPI`](../interfaces/LRUCacheAPI.md)\<`T`\>
