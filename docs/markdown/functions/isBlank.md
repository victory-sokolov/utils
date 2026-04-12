[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / isBlank

# Function: isBlank()

> **isBlank**(`value`): `boolean`

Defined in: [is.ts:236](https://github.com/victory-sokolov/utils/blob/f15da8f6aa5988652bf061bf72db9cb74604095a/src/is.ts#L236)

Check if a value is blank (null, undefined, or empty string)
Preserves 0 and false unlike falsy checks

## Parameters

### value

`unknown`

The value to check

## Returns

`boolean`

True if the value is blank

## Example

```ts
isBlank(null) // true
isBlank(undefined) // true
isBlank('') // true
isBlank(0) // false
isBlank(false) // false
```
