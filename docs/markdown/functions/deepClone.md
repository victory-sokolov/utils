[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / deepClone

# Function: deepClone()

> **deepClone**\<`T`\>(`obj`): `T`

Defined in: [object.ts:375](https://github.com/victory-sokolov/utils/blob/2c4cc43a8b863a0ab511d642adc1b93c4bf812c5/src/object.ts#L375)

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
