[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / isDef

# Function: isDef()

> **isDef**\<`T`\>(`val`): `val is Exclude<T, undefined>`

Defined in: [is.ts:24](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/is.ts#L24)

Check if a value is defined (not undefined)

## Type Parameters

### T

`T` = `unknown`

## Parameters

### val

`T`

The value to check

## Returns

`val is Exclude<T, undefined>`

True if the value is not undefined
