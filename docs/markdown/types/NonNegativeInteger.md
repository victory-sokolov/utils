[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / NonNegativeInteger

# Type Alias: NonNegativeInteger\<T\>

> **NonNegativeInteger**\<`T`\> = `number` *extends* `T` ? `never` : `` `${T}` `` *extends* `` `-${string}` `` \| `` `${string}.${string}` `` ? `never` : `T`

Defined in: [types.ts:51](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/types.ts#L51)

Type to ensure a number is non-negative

## Type Parameters

### T

`T` *extends* `number`
