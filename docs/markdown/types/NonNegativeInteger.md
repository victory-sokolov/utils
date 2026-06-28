[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / NonNegativeInteger

# Type Alias: NonNegativeInteger\<T\>

> **NonNegativeInteger**\<`T`\> = `number` *extends* `T` ? `never` : `` `${T}` `` *extends* `` `-${string}` `` \| `` `${string}.${string}` `` ? `never` : `T`

Defined in: [types.ts:51](https://github.com/victory-sokolov/utils/blob/a50714d8016225aed5e3c160c65495a4f3bbb725/src/types.ts#L51)

Type to ensure a number is non-negative

## Type Parameters

### T

`T` *extends* `number`
