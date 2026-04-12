[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / isFailure

# Function: isFailure()

> **isFailure**\<`T`, `E`\>(`result`): `result is Failure<E>`

Defined in: [try-catch.ts:118](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/try-catch.ts#L118)

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
