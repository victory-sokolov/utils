[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / removeItemAtIndex

# Function: removeItemAtIndex()

> **removeItemAtIndex**\<`T`\>(`index`, `arr?`): `T`[]

Defined in: [array.ts:278](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/array.ts#L278)

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
