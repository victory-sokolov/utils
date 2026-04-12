[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / tap

# Function: tap()

> **tap**\<`T`\>(`value`, `callback`): `T`

Defined in: [function.ts:117](https://github.com/victory-sokolov/utils/blob/e7d22c93962dbad237596d866270e8c5259fb0ca/src/function.ts#L117)

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
