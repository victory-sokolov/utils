[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / isEmpty

# Function: isEmpty()

> **isEmpty**(`value`): `boolean`

Defined in: [is.ts:209](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/is.ts#L209)

Check if a value is empty (null, undefined, empty string, empty array, or empty plain object)

## Parameters

### value

`unknown`

The value to check

## Returns

`boolean`

True if the value is empty

## Example

```ts
isEmpty(null) // true
isEmpty(undefined) // true
isEmpty('') // true
isEmpty([]) // true
isEmpty({}) // true
isEmpty(0) // false
isEmpty(false) // false
isEmpty('hello') // false
isEmpty([1]) // false
isEmpty({ a: 1 }) // false
```
