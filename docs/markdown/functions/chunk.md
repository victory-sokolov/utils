[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / chunk

# Function: chunk()

> **chunk**\<`T`\>(`arr`, `size`): `T`[][]

Defined in: [array.ts:348](https://github.com/victory-sokolov/utils/blob/a50714d8016225aed5e3c160c65495a4f3bbb725/src/array.ts#L348)

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
