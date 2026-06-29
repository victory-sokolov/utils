[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / objectKeys

# Function: objectKeys()

> **objectKeys**\<`T`\>(`obj`): (`` `${keyof T & undefined}` `` \| `` `${keyof T & null}` `` \| `` `${keyof T & string}` `` \| `` `${keyof T & number}` `` \| `` `${keyof T & false}` `` \| `` `${keyof T & true}` ``)[]

Defined in: [object.ts:181](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/object.ts#L181)

Strict typed `Object.keys`

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### obj

`T`

## Returns

(`` `${keyof T & undefined}` `` \| `` `${keyof T & null}` `` \| `` `${keyof T & string}` `` \| `` `${keyof T & number}` `` \| `` `${keyof T & false}` `` \| `` `${keyof T & true}` ``)[]
