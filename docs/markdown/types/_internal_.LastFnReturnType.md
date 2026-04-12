[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / [\<internal\>](../modules/_internal_.md) / LastFnReturnType

# Type Alias: LastFnReturnType\<F, Else\>

> **LastFnReturnType**\<`F`, `Else`\> = `F` *extends* \[`...never[]`, (...`arg`) => infer R\] ? `R` : `Else`

Defined in: [function.ts:17](https://github.com/victory-sokolov/utils/blob/c3dab124e97a1ab467fbdd458a80cbc8c287df05/src/function.ts#L17)

## Type Parameters

### F

`F` *extends* [`AnyFunc`](AnyFunc.md)[]

### Else

`Else` = `never`
