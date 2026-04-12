[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / FetchResponse

# Type Alias: FetchResponse\<T\>

> **FetchResponse**\<`T`\> = \{ `statusCode`: `number`; `data`: `T`; `error`: `null`; \} \| \{ `statusCode`: `number` \| `null`; `data`: `T` \| `null`; `error`: `Error`; \}

Defined in: [types.ts:72](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/types.ts#L72)

Type representing either a successful or failed fetch response

## Type Parameters

### T

`T`
