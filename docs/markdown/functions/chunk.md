[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / chunk

# Function: chunk()

> **chunk**\<`T`\>(`arr`, `size`): `T`[][]

Defined in: [array.ts:348](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/array.ts#L348)

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
