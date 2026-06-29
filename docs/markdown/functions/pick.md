[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / pick

# Function: pick()

> **pick**\<`T`, `K`\>(`obj`, ...`props`): \{ \[P in string \| number \| symbol\]: T\[P\] \}

Defined in: [object.ts:45](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/object.ts#L45)

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
