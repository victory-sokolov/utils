[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / isDef

# Function: isDef()

> **isDef**\<`T`\>(`val`): `val is Exclude<T, undefined>`

Defined in: [is.ts:24](https://github.com/victory-sokolov/utils/blob/2c4cc43a8b863a0ab511d642adc1b93c4bf812c5/src/is.ts#L24)

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
