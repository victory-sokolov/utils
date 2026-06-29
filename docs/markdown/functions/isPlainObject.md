[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / isPlainObject

# Function: isPlainObject()

> **isPlainObject**(`val`): `val is RecordObject`

Defined in: [is.ts:182](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/is.ts#L182)

Check if a value is a plain object (created by {} or new Object())
Returns false for arrays, Date, RegExp, Map, Set, class instances, etc.

## Parameters

### val

`unknown`

The value to check

## Returns

`val is RecordObject`

True if the value is a plain object

## Example

```ts
isPlainObject({}) // true
isPlainObject({ a: 1 }) // true
isPlainObject([]) // false
isPlainObject(new Date()) // false
isPlainObject(null) // false
isPlainObject(class Foo {}) // false
```
