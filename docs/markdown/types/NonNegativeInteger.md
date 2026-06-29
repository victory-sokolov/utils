[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / NonNegativeInteger

# Type Alias: NonNegativeInteger\<T\>

> **NonNegativeInteger**\<`T`\> = `number` *extends* `T` ? `never` : `` `${T}` `` *extends* `` `-${string}` `` \| `` `${string}.${string}` `` ? `never` : `T`

Defined in: [types.ts:51](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/types.ts#L51)

Type to ensure a number is non-negative

## Type Parameters

### T

`T` *extends* `number`
