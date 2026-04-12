[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / isTruthyAndNotEmpty

# Function: isTruthyAndNotEmpty()

> **isTruthyAndNotEmpty**(`value`): `boolean`

Defined in: [is.ts:147](https://github.com/victory-sokolov/utils/blob/f15da8f6aa5988652bf061bf72db9cb74604095a/src/is.ts#L147)

Checks whether a value is "truthy" and not an empty object or empty array.

Rules:
- Falsy values (false, 0, '', null, undefined, NaN) return false.
- Empty arrays ([]) return false.
- Empty objects ({}) return false.
- All other values (non-empty arrays, non-empty objects, numbers, strings, booleans, etc.) return true.

## Parameters

### value

`unknown`

The value to check.

## Returns

`boolean`

`true` if the value is considered meaningful, otherwise `false`.
