[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / pick

# Function: pick()

> **pick**\<`T`, `K`\>(`obj`, ...`props`): \{ \[P in string \| number \| symbol\]: T\[P\] \}

Defined in: [object.ts:45](https://github.com/victory-sokolov/utils/blob/c3dab124e97a1ab467fbdd458a80cbc8c287df05/src/object.ts#L45)

Pick specific keys from object

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `unknown`\>

### K

`K` *extends* `string` \| `number` \| `symbol`

## Parameters

### obj

`T`

Object from which to pick keys

### props

...`K`[]

Keys to select from object

## Returns

\{ \[P in string \| number \| symbol\]: T\[P\] \}

Object with selected keys
