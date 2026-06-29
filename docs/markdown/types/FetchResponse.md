[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / FetchResponse

# Type Alias: FetchResponse\<T\>

> **FetchResponse**\<`T`\> = \{ `statusCode`: `number`; `data`: `T`; `error`: `null`; \} \| \{ `statusCode`: `number` \| `null`; `data`: `T` \| `null`; `error`: `Error`; \}

Defined in: [types.ts:72](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/types.ts#L72)

Type representing either a successful or failed fetch response

## Type Parameters

### T

`T`
