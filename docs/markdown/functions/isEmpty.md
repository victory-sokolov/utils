[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / isEmpty

# Function: isEmpty()

> **isEmpty**(`value`): `boolean`

Defined in: [is.ts:209](https://github.com/victory-sokolov/utils/blob/f15da8f6aa5988652bf061bf72db9cb74604095a/src/is.ts#L209)

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
