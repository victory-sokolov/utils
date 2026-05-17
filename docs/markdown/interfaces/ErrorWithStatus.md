[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / ErrorWithStatus

# Interface: ErrorWithStatus

Defined in: [try-catch.ts:57](https://github.com/victory-sokolov/utils/blob/2c4cc43a8b863a0ab511d642adc1b93c4bf812c5/src/try-catch.ts#L57)

Extended Error interface with optional HTTP status code support.

## Example

```typescript
throw Object.assign(new Error('User not found'), { status: 404 });

// Or with custom class:
class ApiError extends Error implements ErrorWithStatus {
  constructor(message: string, public status?: number) {
    super(message);
  }
}
```

## Extends

- `Error`

## Properties

### status?

> `optional` **status?**: `number`

Defined in: [try-catch.ts:59](https://github.com/victory-sokolov/utils/blob/2c4cc43a8b863a0ab511d642adc1b93c4bf812c5/src/try-catch.ts#L59)

HTTP status code associated with the error (e.g., 400, 404, 500)
