[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / insertItemAtIndex

# Function: insertItemAtIndex()

> **insertItemAtIndex**\<`T`\>(`index`, `value`, `arr?`): `T`[]

Defined in: [array.ts:239](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/array.ts#L239)

Insert an item at a given index

## Type Parameters

### T

`T`

## Parameters

### index

`number` \| [`IndexCallback`](../types/IndexCallback.md)\<`T`\>

An index or a callback provided to findIndex

### value

`T`

The value of the item to insert

### arr?

[`Maybe`](../types/Maybe.md)\<`T`[]\>

The array to insert into

## Returns

`T`[]

New array with the item inserted
