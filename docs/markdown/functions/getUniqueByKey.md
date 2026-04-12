[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / getUniqueByKey

# Function: getUniqueByKey()

> **getUniqueByKey**\<`T`\>(`arr`, `key`): `T`[]

Defined in: [object.ts:202](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/object.ts#L202)

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
