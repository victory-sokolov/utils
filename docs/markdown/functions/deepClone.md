[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / deepClone

# Function: deepClone()

> **deepClone**\<`T`\>(`obj`): `T`

Defined in: [object.ts:375](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/object.ts#L375)

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
