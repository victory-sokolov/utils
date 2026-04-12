[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / replaceItemAtIndex

# Function: replaceItemAtIndex()

> **replaceItemAtIndex**\<`T`\>(`index`, `newValue`, `arr?`): `T`[]

Defined in: [array.ts:261](https://github.com/victory-sokolov/utils/blob/aec88aef4778a8955e120244d504b1a222c7f010/src/array.ts#L261)

Replace an item at a given index

## Type Parameters

### T

`T`

## Parameters

### index

`number` \| [`IndexCallback`](../types/IndexCallback.md)\<`T`\>

An index or a callback provided to findIndex

### newValue

`T`

The value of the item to be replaced

### arr?

[`Maybe`](../types/Maybe.md)\<`T`[]\>

The array to replace in

## Returns

`T`[]

New array with the item replaced
