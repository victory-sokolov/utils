[**@vsokolov/utils v1.5.0**](../index.md)

***

[@vsokolov/utils](../modules.md) / filterFalsyFromObject

# Function: filterFalsyFromObject()

## Call Signature

> **filterFalsyFromObject**\<`T`\>(`obj`): `T`

Defined in: [object.ts:94](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/object.ts#L94)

Removes falsy or empty values (`null`, `undefined`, `''`, `0`, `false`, etc.)
from a plain object or an array of objects.

- If you pass an object, returns a new object with falsy values removed.
- If you pass an array, returns a new array of objects with each item filtered.

### Type Parameters

#### T

`T` *extends* [`RecordObject`](../types/RecordObject.md)

The object type to filter.

### Parameters

#### obj

`T`

An object or array of objects to filter.

### Returns

`T`

A filtered object (or array of filtered objects) of the same shape.

### Example

```ts
filterFalsyFromObject({ a: 1, b: '', c: null });
// => { a: 1 }

filterFalsyFromObject([{ a: 1, b: '' }, { a: 0, b: 'ok' }]);
// => [{ a: 1 }, { b: 'ok' }]
```

## Call Signature

> **filterFalsyFromObject**\<`T`\>(`arr`): `T`[]

Defined in: [object.ts:95](https://github.com/victory-sokolov/utils/blob/e6d77a3ea80bbfb952e9b5be031657c285122c6d/src/object.ts#L95)

Removes falsy or empty values (`null`, `undefined`, `''`, `0`, `false`, etc.)
from a plain object or an array of objects.

- If you pass an object, returns a new object with falsy values removed.
- If you pass an array, returns a new array of objects with each item filtered.

### Type Parameters

#### T

`T` *extends* [`RecordObject`](../types/RecordObject.md)

The object type to filter.

### Parameters

#### arr

`T`[]

### Returns

`T`[]

A filtered object (or array of filtered objects) of the same shape.

### Example

```ts
filterFalsyFromObject({ a: 1, b: '', c: null });
// => { a: 1 }

filterFalsyFromObject([{ a: 1, b: '' }, { a: 0, b: 'ok' }]);
// => [{ a: 1 }, { b: 'ok' }]
```
