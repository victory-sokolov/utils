[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / isBlank

# Function: isBlank()

> **isBlank**(`value`): `boolean`

Defined in: [is.ts:236](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/is.ts#L236)

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
