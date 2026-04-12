[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / lruCache

# Function: lruCache()

> **lruCache**\<`T`\>(`maxSize`, `ttl`): [`LRUCacheAPI`](../interfaces/LRUCacheAPI.md)\<`T`\>

Defined in: [cache.ts:109](https://github.com/victory-sokolov/utils/blob/aec88aef4778a8955e120244d504b1a222c7f010/src/cache.ts#L109)

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
