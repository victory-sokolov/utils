[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / objectKeys

# Function: objectKeys()

> **objectKeys**\<`T`\>(`obj`): (`` `${keyof T & undefined}` `` \| `` `${keyof T & null}` `` \| `` `${keyof T & string}` `` \| `` `${keyof T & number}` `` \| `` `${keyof T & false}` `` \| `` `${keyof T & true}` ``)[]

Defined in: [object.ts:181](https://github.com/victory-sokolov/utils/blob/f15da8f6aa5988652bf061bf72db9cb74604095a/src/object.ts#L181)

Strict typed `Object.keys`

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### obj

`T`

## Returns

(`` `${keyof T & undefined}` `` \| `` `${keyof T & null}` `` \| `` `${keyof T & string}` `` \| `` `${keyof T & number}` `` \| `` `${keyof T & false}` `` \| `` `${keyof T & true}` ``)[]
