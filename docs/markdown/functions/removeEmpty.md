[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / removeEmpty

# Function: removeEmpty()

> **removeEmpty**\<`T`\>(`value`): `T` \| `null`

Defined in: [object.ts:304](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/object.ts#L304)

Recursively remove empty values (null, undefined, '', [], {}) from object or array

## Type Parameters

### T

`T`

## Parameters

### value

`T`

Value to clean

## Returns

`T` \| `null`

Cleaned value or null if result is empty

## Example

```ts
removeEmpty({ a: 1, b: null, c: { d: [], e: 'hello' } })
// => { a: 1, c: { e: 'hello' } }
```
