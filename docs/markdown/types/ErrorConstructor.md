[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / ErrorConstructor

# Type Alias: ErrorConstructor\<E\>

> **ErrorConstructor**\<`E`\> = (`message`, `status?`, `cause?`) => `E`

Defined in: [try-catch.ts:67](https://github.com/victory-sokolov/utils/blob/a50714d8016225aed5e3c160c65495a4f3bbb725/src/try-catch.ts#L67)

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
