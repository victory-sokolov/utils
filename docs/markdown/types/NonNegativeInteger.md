[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / NonNegativeInteger

# Type Alias: NonNegativeInteger\<T\>

> **NonNegativeInteger**\<`T`\> = `number` *extends* `T` ? `never` : `` `${T}` `` *extends* `` `-${string}` `` \| `` `${string}.${string}` `` ? `never` : `T`

Defined in: [types.ts:51](https://github.com/victory-sokolov/utils/blob/f15da8f6aa5988652bf061bf72db9cb74604095a/src/types.ts#L51)

Type to ensure a number is non-negative

## Type Parameters

### T

`T` *extends* `number`
