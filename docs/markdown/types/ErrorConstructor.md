[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / ErrorConstructor

# Type Alias: ErrorConstructor\<E\>

> **ErrorConstructor**\<`E`\> = (`message`, `status?`, `cause?`) => `E`

Defined in: [try-catch.ts:67](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/try-catch.ts#L67)

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
