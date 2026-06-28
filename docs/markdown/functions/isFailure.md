[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / isFailure

# Function: isFailure()

> **isFailure**\<`T`, `E`\>(`result`): `result is Failure<E>`

Defined in: [try-catch.ts:118](https://github.com/victory-sokolov/utils/blob/a50714d8016225aed5e3c160c65495a4f3bbb725/src/try-catch.ts#L118)

Type guard that checks if a Result is a Failure.

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

`result is Failure<E>`

True if the result is a Failure, with proper type narrowing
