[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / NonNegativeInteger

# Type Alias: NonNegativeInteger\<T\>

> **NonNegativeInteger**\<`T`\> = `number` *extends* `T` ? `never` : `` `${T}` `` *extends* `` `-${string}` `` \| `` `${string}.${string}` `` ? `never` : `T`

Defined in: [types.ts:51](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/types.ts#L51)

Type to ensure a number is non-negative

## Type Parameters

### T

`T` *extends* `number`
