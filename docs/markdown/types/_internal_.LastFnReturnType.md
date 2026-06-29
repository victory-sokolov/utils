[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / [\<internal\>](../modules/_internal_.md) / LastFnReturnType

# Type Alias: LastFnReturnType\<F, Else\>

> **LastFnReturnType**\<`F`, `Else`\> = `F` *extends* \[`...never[]`, (...`arg`) => infer R\] ? `R` : `Else`

Defined in: [function.ts:17](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/function.ts#L17)

## Type Parameters

### F

`F` *extends* [`AnyFunc`](AnyFunc.md)[]

### Else

`Else` = `never`
