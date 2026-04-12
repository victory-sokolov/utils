[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / pick

# Function: pick()

> **pick**\<`T`, `K`\>(`obj`, ...`props`): \{ \[P in string \| number \| symbol\]: T\[P\] \}

Defined in: [object.ts:45](https://github.com/victory-sokolov/utils/blob/f15da8f6aa5988652bf061bf72db9cb74604095a/src/object.ts#L45)

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
