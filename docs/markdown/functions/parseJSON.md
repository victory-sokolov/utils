[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / parseJSON

# Function: parseJSON()

> **parseJSON**\<`T`\>(`json`, `fallback?`): `T` \| `null`

Defined in: [object.ts:390](https://github.com/victory-sokolov/utils/blob/65f11a56369c99065554109006908574974c4ac4/src/object.ts#L390)

Safely parse JSON string with fallback

## Type Parameters

### T

`T` = `unknown`

## Parameters

### json

`string`

JSON string to parse

### fallback?

`T` \| `null`

Value to return if parsing fails (default: null)

## Returns

`T` \| `null`

Parsed object or fallback value

## Example

```ts
parseJSON('{"a": 1}') // { a: 1 }
parseJSON('invalid', {}) // {}
parseJSON('invalid') // null
```
