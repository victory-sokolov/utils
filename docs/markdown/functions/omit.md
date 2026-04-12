[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / omit

# Function: omit()

## Call Signature

> **omit**\<`T`, `K`\>(`obj`, ...`keys`): `Omit`\<`T`, `K`\>

Defined in: [object.ts:10](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/object.ts#L10)

Remove specific keys from object

### Type Parameters

#### T

`T` *extends* `object`

#### K

`K` *extends* `string` \| `number` \| `symbol`

### Parameters

#### obj

`T`

#### keys

...`K`[]

Keys to remove from object

### Returns

`Omit`\<`T`, `K`\>

Object or array of objects with keys removed

## Call Signature

> **omit**\<`T`, `K`\>(`arr`, ...`keys`): `Omit`\<`T`, `K`\>[]

Defined in: [object.ts:11](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/object.ts#L11)

Remove specific keys from object

### Type Parameters

#### T

`T` *extends* `object`

#### K

`K` *extends* `string` \| `number` \| `symbol`

### Parameters

#### arr

`T`[]

#### keys

...`K`[]

Keys to remove from object

### Returns

`Omit`\<`T`, `K`\>[]

Object or array of objects with keys removed

## Call Signature

> **omit**\<`T`, `K`\>(`obj`, ...`keys`): `Omit`\<`T`, `K`\>

Defined in: [object.ts:15](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/object.ts#L15)

Remove specific keys from object

### Type Parameters

#### T

`T` *extends* `object`

#### K

`K` *extends* `PropertyKey`

### Parameters

#### obj

`T`

#### keys

...`K`[]

Keys to remove from object

### Returns

`Omit`\<`T`, `K`\>

Object or array of objects with keys removed

## Call Signature

> **omit**\<`T`, `K`\>(`arr`, ...`keys`): `Omit`\<`T`, `K`\>[]

Defined in: [object.ts:19](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/object.ts#L19)

Remove specific keys from object

### Type Parameters

#### T

`T` *extends* `object`

#### K

`K` *extends* `PropertyKey`

### Parameters

#### arr

`T`[]

#### keys

...`K`[]

Keys to remove from object

### Returns

`Omit`\<`T`, `K`\>[]

Object or array of objects with keys removed
