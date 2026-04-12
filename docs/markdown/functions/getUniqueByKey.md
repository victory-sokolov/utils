[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / getUniqueByKey

# Function: getUniqueByKey()

> **getUniqueByKey**\<`T`\>(`arr`, `key`): `T`[]

Defined in: [object.ts:202](https://github.com/victory-sokolov/utils/blob/f15da8f6aa5988652bf061bf72db9cb74604095a/src/object.ts#L202)

Get unique keys, values by provided key
const objArry = [{ id: 1 }, { id: 1 }, { id: 2 }, { id: 3 }];
   getUniqueByKey(objArry, 'id'); // [ { id: 1 }, { id: 2 }, { id: 3 } ]

## Type Parameters

### T

`T`

## Parameters

### arr

`T`[]

### key

keyof `T`

## Returns

`T`[]

Unique array of objects
