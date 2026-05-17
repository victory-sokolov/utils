[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / TryCatchOptions

# Interface: TryCatchOptions\<E\>

Defined in: [try-catch.ts:87](https://github.com/victory-sokolov/utils/blob/2c4cc43a8b863a0ab511d642adc1b93c4bf812c5/src/try-catch.ts#L87)

Configuration options for the tryCatch function.

## Example

```typescript
// Basic configuration
{ defaultStatus: 400 }

// With custom error class
{ ErrorClass: ApiError, defaultStatus: 500 }
```

## Type Parameters

### E

`E` *extends* `Error` = [`ErrorWithStatus`](ErrorWithStatus.md)

The type of error class to use for error transformation

## Properties

### defaultStatus?

> `optional` **defaultStatus?**: `number`

Defined in: [try-catch.ts:93](https://github.com/victory-sokolov/utils/blob/2c4cc43a8b863a0ab511d642adc1b93c4bf812c5/src/try-catch.ts#L93)

Default HTTP status code to use when caught error has no status property.

#### Default

```ts
500
```

***

### ErrorClass?

> `optional` **ErrorClass?**: [`ErrorConstructor`](../types/ErrorConstructor.md)\<`E`\>

Defined in: [try-catch.ts:100](https://github.com/victory-sokolov/utils/blob/2c4cc43a8b863a0ab511d642adc1b93c4bf812c5/src/try-catch.ts#L100)

Custom error class constructor for transforming caught errors.
If provided, all caught errors will be converted to instances of this class.

#### Default

```ts
Error
```
