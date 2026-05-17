[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / throttle

# Function: throttle()

> **throttle**\<`Args`\>(`fn`, `cooldown`): (...`args`) => `void`

Defined in: [base.ts:96](https://github.com/victory-sokolov/utils/blob/2c4cc43a8b863a0ab511d642adc1b93c4bf812c5/src/base.ts#L96)

## Type Parameters

### Args

`Args` *extends* `unknown`[]

## Parameters

### fn

(...`args`) => `void`

Function to debounce used to improve the performance of frequently executed actions.
Guarantees the regular execution of an action.

### cooldown

`number`

Timer arg

## Returns

a new function, which when executed, stores the call arguments and starts the cooldown timer

(...`args`) => `void`
