[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / groupBy

# Function: groupBy()

> **groupBy**\<`T`, `K`\>(`arr`, `getKey`): `Record`\<`K`, `T`[]\>

Defined in: [array.ts:368](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/array.ts#L368)

Group array items by a key extractor function

## Type Parameters

### T

`T`

### K

`K` *extends* `string` \| `number` \| `symbol`

## Parameters

### arr

readonly `T`[]

Array to group

### getKey

(`item`) => `K`

Function to extract group key from each item

## Returns

`Record`\<`K`, `T`[]\>

Record of arrays grouped by key

## Example

```ts
groupBy([{id: 1, type: 'a'}, {id: 2, type: 'b'}, {id: 3, type: 'a'}], item => item.type)
// { a: [{id: 1, type: 'a'}, {id: 3, type: 'a'}], b: [{id: 2, type: 'b'}] }
```
