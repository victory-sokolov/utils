[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / sort

# Function: sort()

> **sort**\<`T`\>(`arr`, `fSorting?`): `T`[]

Defined in: [array.ts:103](https://github.com/victory-sokolov/utils/blob/f15da8f6aa5988652bf061bf72db9cb74604095a/src/array.ts#L103)

Sort array by specific function or by the first numeric value in objects

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `unknown`\>

## Parameters

### arr

`T`[]

Array to sort

### fSorting?

(`first`, `second`) => `number`

Function sorting algorithm, defaults to sorting by first numeric value

## Returns

`T`[]

Sorted array
