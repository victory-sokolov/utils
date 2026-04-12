[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / ErrorConstructor

# Type Alias: ErrorConstructor\<E\>

> **ErrorConstructor**\<`E`\> = (`message`, `status?`, `cause?`) => `E`

Defined in: [try-catch.ts:67](https://github.com/victory-sokolov/utils/blob/f15da8f6aa5988652bf061bf72db9cb74604095a/src/try-catch.ts#L67)

Constructor signature for custom error classes used with tryCatch.

## Type Parameters

### E

`E` *extends* `Error`

The type of error class to construct

## Parameters

### message

`string`

### status?

`number`

### cause?

`unknown`

## Returns

`E`
