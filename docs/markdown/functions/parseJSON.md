[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / parseJSON

# Function: parseJSON()

> **parseJSON**\<`T`\>(`json`, `fallback?`): `T` \| `null`

Defined in: [object.ts:390](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/object.ts#L390)

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
