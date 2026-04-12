[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / withCache

# Function: withCache()

> **withCache**\<`TArgs`, `TResult`\>(`fn`, `cacheInstance`, `getKey`): (...`args`) => `Promise`\<\{ `cached`: `boolean`; `result`: `TResult`; \}\>

Defined in: [cache.ts:144](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/cache.ts#L144)

Wraps an async function with caching.

## Type Parameters

### TArgs

`TArgs` *extends* `unknown`[]

### TResult

`TResult`

## Parameters

### fn

(...`args`) => `Promise`\<`TResult`\>

The async function to cache

### cacheInstance

[`LRUCacheAPI`](../interfaces/LRUCacheAPI.md)\<\{ `cached`: `boolean`; `result`: `TResult`; \}\>

The cache instance to use

### getKey

(...`args`) => `string`

Function to generate cache key from arguments

## Returns

(...`args`) => `Promise`\<\{ `cached`: `boolean`; `result`: `TResult`; \}\>
