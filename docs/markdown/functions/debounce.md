[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / debounce

# Function: debounce()

> **debounce**\<`T`\>(`fn`, `delay`): (...`args`) => `void` & `object`

Defined in: [base.ts:56](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/base.ts#L56)

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
