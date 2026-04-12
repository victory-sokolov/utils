[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / debounce

# Function: debounce()

> **debounce**\<`T`\>(`fn`, `delay`): (...`args`) => `void` & `object`

Defined in: [base.ts:56](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/base.ts#L56)

Debouncing used to improve the performance of frequently executed actions,
by delaying them, grouping them, and only executing the last call.

## Type Parameters

### T

`T` *extends* `unknown`[]

## Parameters

### fn

(...`args`) => `void`

Function to debounce

### delay

`number`

Function delay

## Returns

(...`args`) => `void` & `object`

new function
