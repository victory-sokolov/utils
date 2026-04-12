[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / sort

# Function: sort()

> **sort**\<`T`\>(`arr`, `fSorting?`): `T`[]

Defined in: [array.ts:103](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/array.ts#L103)

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
