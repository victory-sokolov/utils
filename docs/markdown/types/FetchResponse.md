[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / FetchResponse

# Type Alias: FetchResponse\<T\>

> **FetchResponse**\<`T`\> = \{ `statusCode`: `number`; `data`: `T`; `error`: `null`; \} \| \{ `statusCode`: `number` \| `null`; `data`: `T` \| `null`; `error`: `Error`; \}

Defined in: [types.ts:72](https://github.com/victory-sokolov/utils/blob/c3dab124e97a1ab467fbdd458a80cbc8c287df05/src/types.ts#L72)

Type representing either a successful or failed fetch response

## Type Parameters

### T

`T`
