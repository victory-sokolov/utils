[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / getUniqueByKey

# Function: getUniqueByKey()

> **getUniqueByKey**\<`T`\>(`arr`, `key`): `T`[]

Defined in: [object.ts:202](https://github.com/victory-sokolov/utils/blob/caee527f505518389286007305e12efcf44fe4fe/src/object.ts#L202)

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
