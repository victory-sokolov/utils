[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / isSuccess

# Function: isSuccess()

> **isSuccess**\<`T`, `E`\>(`result`): `result is Success<T>`

Defined in: [try-catch.ts:109](https://github.com/victory-sokolov/utils/blob/2c4cc43a8b863a0ab511d642adc1b93c4bf812c5/src/try-catch.ts#L109)

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
