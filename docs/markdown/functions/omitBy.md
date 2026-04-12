[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / omitBy

# Function: omitBy()

> **omitBy**\<`T`, `K`\>(`obj`, `predicate`): `Partial`\<`T`\>

Defined in: [object.ts:215](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/object.ts#L215)

Remove properties from object where predicate returns true

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `unknown`\>

### K

`K` *extends* `string`

## Parameters

### obj

`T`

Object to filter

### predicate

(`value`, `key`) => `boolean`

Function that returns true for properties to remove

## Returns

`Partial`\<`T`\>

Object with properties removed

## Example

```ts
omitBy({ a: 1, b: null, c: undefined }, (v) => v === null || v === undefined)
// => { a: 1 }
```
