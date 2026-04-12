[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / deepClone

# Function: deepClone()

> **deepClone**\<`T`\>(`obj`): `T`

Defined in: [object.ts:375](https://github.com/victory-sokolov/utils/blob/65f11a56369c99065554109006908574974c4ac4/src/object.ts#L375)

Deep clone an object using structured cloning

## Type Parameters

### T

`T`

## Parameters

### obj

`T`

Object to clone

## Returns

`T`

Deep cloned object

## Example

```ts
const original = { a: 1, b: { c: 2 } }
const cloned = deepClone(original)
cloned.b.c = 3
original.b.c // still 2
```
