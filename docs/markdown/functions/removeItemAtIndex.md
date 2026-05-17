[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / removeItemAtIndex

# Function: removeItemAtIndex()

> **removeItemAtIndex**\<`T`\>(`index`, `arr?`): `T`[]

Defined in: [array.ts:278](https://github.com/victory-sokolov/utils/blob/2c4cc43a8b863a0ab511d642adc1b93c4bf812c5/src/array.ts#L278)

Remove an item at an index

## Type Parameters

### T

`T`

## Parameters

### index

`number` \| [`IndexCallback`](../types/IndexCallback.md)\<`T`\>

An index or a callback provided to findIndex

### arr?

[`Maybe`](../types/Maybe.md)\<`T`[]\>

The array to remove from

## Returns

`T`[]

New array with the item removed
