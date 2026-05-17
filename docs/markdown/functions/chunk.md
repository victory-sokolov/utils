[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / chunk

# Function: chunk()

> **chunk**\<`T`\>(`arr`, `size`): `T`[][]

Defined in: [array.ts:348](https://github.com/victory-sokolov/utils/blob/2c4cc43a8b863a0ab511d642adc1b93c4bf812c5/src/array.ts#L348)

Split array into chunks of specified size

## Type Parameters

### T

`T`

## Parameters

### arr

readonly `T`[]

Array to split into chunks

### size

`number`

Size of each chunk

## Returns

`T`[][]

Array of chunks

## Example

```ts
chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
```
