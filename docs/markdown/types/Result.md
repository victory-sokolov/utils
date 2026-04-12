[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / Result

# Type Alias: Result\<T, E\>

> **Result**\<`T`, `E`\> = [`Success`](../interfaces/Success.md)\<`T`\> \| [`Failure`](../interfaces/Failure.md)\<`E`\>

Defined in: [try-catch.ts:40](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/try-catch.ts#L40)

Result type representing either a success with data or a failure with error.
This discriminated union enables type-safe error handling without try/catch blocks.

## Type Parameters

### T

`T`

The type of the successful data

### E

`E` = [`ErrorWithStatus`](../interfaces/ErrorWithStatus.md)

The type of the error, defaults to ErrorWithStatus

## Example

```typescript
const result = tryCatch(() => JSON.parse(raw));
if (result.error) {
  // TypeScript knows result.data is null here
  console.error(result.error.message);
} else {
  // TypeScript knows result.error is null here
  console.log(result.data.toUpperCase());
}
```
