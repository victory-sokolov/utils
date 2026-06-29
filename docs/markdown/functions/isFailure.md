[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / isFailure

# Function: isFailure()

> **isFailure**\<`T`, `E`\>(`result`): `result is Failure<E>`

Defined in: [try-catch.ts:118](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/try-catch.ts#L118)

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
