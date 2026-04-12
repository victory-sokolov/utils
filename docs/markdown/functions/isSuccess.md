[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / isSuccess

# Function: isSuccess()

> **isSuccess**\<`T`, `E`\>(`result`): `result is Success<T>`

Defined in: [try-catch.ts:109](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/try-catch.ts#L109)

Type guard that checks if a Result is a Success.

## Type Parameters

### T

`T`

### E

`E` *extends* `Error`

## Parameters

### result

[`Result`](../types/Result.md)\<`T`, `E`\>

The Result to check

## Returns

`result is Success<T>`

True if the result is a Success, with proper type narrowing
