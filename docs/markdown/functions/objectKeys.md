[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / objectKeys

# Function: objectKeys()

> **objectKeys**\<`T`\>(`obj`): (`` `${keyof T & undefined}` `` \| `` `${keyof T & null}` `` \| `` `${keyof T & string}` `` \| `` `${keyof T & number}` `` \| `` `${keyof T & false}` `` \| `` `${keyof T & true}` ``)[]

Defined in: [object.ts:181](https://github.com/victory-sokolov/utils/blob/aec88aef4778a8955e120244d504b1a222c7f010/src/object.ts#L181)

Strict typed `Object.keys`

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### obj

`T`

## Returns

(`` `${keyof T & undefined}` `` \| `` `${keyof T & null}` `` \| `` `${keyof T & string}` `` \| `` `${keyof T & number}` `` \| `` `${keyof T & false}` `` \| `` `${keyof T & true}` ``)[]
