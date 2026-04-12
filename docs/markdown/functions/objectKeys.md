[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / objectKeys

# Function: objectKeys()

> **objectKeys**\<`T`\>(`obj`): (`` `${keyof T & undefined}` `` \| `` `${keyof T & null}` `` \| `` `${keyof T & string}` `` \| `` `${keyof T & number}` `` \| `` `${keyof T & false}` `` \| `` `${keyof T & true}` ``)[]

Defined in: [object.ts:181](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/object.ts#L181)

Strict typed `Object.keys`

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### obj

`T`

## Returns

(`` `${keyof T & undefined}` `` \| `` `${keyof T & null}` `` \| `` `${keyof T & string}` `` \| `` `${keyof T & number}` `` \| `` `${keyof T & false}` `` \| `` `${keyof T & true}` ``)[]
