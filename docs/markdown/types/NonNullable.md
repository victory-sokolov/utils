[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / NonNullable

# Type Alias: NonNullable\<T\>

> **NonNullable**\<`T`\> = `T` *extends* `null` \| `undefined` ? `never` : `T`

Defined in: [types.ts:97](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/types.ts#L97)

Constructs a type by excluding `null` and `undefined` from a given type `T`.

## Type Parameters

### T

`T`

The source type which may include `null` and/or `undefined`

## Example

```ts
// With optional properties
interface User {
  name: string;
  email?: string | null;
}
type RequiredEmail = NonNullable<User['email']>; // string
```
