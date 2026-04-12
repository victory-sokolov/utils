[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / ErrorConstructor

# Type Alias: ErrorConstructor\<E\>

> **ErrorConstructor**\<`E`\> = (`message`, `status?`, `cause?`) => `E`

Defined in: [try-catch.ts:67](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/try-catch.ts#L67)

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
