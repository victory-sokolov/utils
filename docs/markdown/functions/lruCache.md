[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / lruCache

# Function: lruCache()

> **lruCache**\<`T`\>(`maxSize`, `ttl`): [`LRUCacheAPI`](../interfaces/LRUCacheAPI.md)\<`T`\>

Defined in: [cache.ts:109](https://github.com/victory-sokolov/utils/blob/c3dab124e97a1ab467fbdd458a80cbc8c287df05/src/cache.ts#L109)

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
