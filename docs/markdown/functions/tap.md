[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / tap

# Function: tap()

> **tap**\<`T`\>(`value`, `callback`): `T`

Defined in: [function.ts:117](https://github.com/victory-sokolov/utils/blob/2c4cc43a8b863a0ab511d642adc1b93c4bf812c5/src/function.ts#L117)

Pass the value through the callback, and return the value

## Type Parameters

### T

`T`

## Parameters

### value

`T`

The value to pass through

### callback

(`value`) => `void`

Callback to execute with the value

## Returns

`T`

The original value unchanged

## Example

```ts
function createUser(name: string): User {
  return tap(new User, user => {
    user.name = name
  })
}
```
