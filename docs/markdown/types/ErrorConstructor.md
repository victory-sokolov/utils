[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / ErrorConstructor

# Type Alias: ErrorConstructor\<E\>

> **ErrorConstructor**\<`E`\> = (`message`, `status?`, `cause?`) => `E`

Defined in: [try-catch.ts:67](https://github.com/victory-sokolov/utils/blob/aec88aef4778a8955e120244d504b1a222c7f010/src/try-catch.ts#L67)

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
