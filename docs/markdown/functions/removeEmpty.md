[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / removeEmpty

# Function: removeEmpty()

> **removeEmpty**\<`T`\>(`value`): `T` \| `null`

Defined in: [object.ts:304](https://github.com/victory-sokolov/utils/blob/aec88aef4778a8955e120244d504b1a222c7f010/src/object.ts#L304)

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
