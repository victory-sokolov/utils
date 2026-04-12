[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / isDef

# Function: isDef()

> **isDef**\<`T`\>(`val`): `val is Exclude<T, undefined>`

Defined in: [is.ts:24](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/is.ts#L24)

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
