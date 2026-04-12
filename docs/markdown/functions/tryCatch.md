[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / tryCatch

# Function: tryCatch()

## Call Signature

> **tryCatch**\<`T`, `E`\>(`fnOrPromise`, `options?`): `Promise`\<[`Result`](../types/Result.md)\<`T`, `E`\>\>

Defined in: [try-catch.ts:263](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/try-catch.ts#L263)

Wraps an operation and returns a Result object instead of throwing exceptions.

- Sync functions return `Result<T, E>` directly (no Promise)
- Async functions and direct Promises return `Promise<Result<T, E>>`

### Type Parameters

#### T

`T`

The type of data returned by the successful operation

#### E

`E` *extends* `Error` = [`ErrorWithStatus`](../interfaces/ErrorWithStatus.md)

The type of error returned, defaults to ErrorWithStatus

### Parameters

#### fnOrPromise

`Promise`\<`T`\> \| (() => `Promise`\<`T`\>)

A sync function, async function, or Promise to execute safely

#### options?

[`TryCatchOptions`](../interfaces/TryCatchOptions.md)\<`E`\>

Configuration options for error handling behavior

### Returns

`Promise`\<[`Result`](../types/Result.md)\<`T`, `E`\>\>

`Result<T, E>` for sync functions, `Promise<Result<T, E>>` for async/Promise inputs

### Examples

## Sync function (no await needed)
```typescript
const { data, error } = tryCatch(() => JSON.parse(raw));
```

## Async function
```typescript
const { data, error } = await tryCatch(async () => {
  const user = await getUser();
  const profile = await getProfile(user.id);
  return { user, profile };
});
```

## Direct Promise
```typescript
const { data, error } = await tryCatch(fetchUserData());
```

## With custom error class
```typescript
class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
  }
}

const { data, error } = await tryCatch(fetchApiData(), {
  ErrorClass: ApiError,
  defaultStatus: 500
});
```

## Using type guards
```typescript
const result = tryCatch(() => JSON.parse(raw));
if (isFailure(result)) {
  console.error(result.error.message);
} else {
  console.log(result.data);
}
```

### See

 - [Result](../types/Result.md) for the return type structure
 - [TryCatchOptions](../interfaces/TryCatchOptions.md) for configuration options
 - [isSuccess](isSuccess.md) and [isFailure](isFailure.md) for type guard helpers

## Call Signature

> **tryCatch**\<`T`, `E`\>(`fn`, `options?`): [`Result`](../types/Result.md)\<`T`, `E`\>

Defined in: [try-catch.ts:267](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/try-catch.ts#L267)

Wraps an operation and returns a Result object instead of throwing exceptions.

- Sync functions return `Result<T, E>` directly (no Promise)
- Async functions and direct Promises return `Promise<Result<T, E>>`

### Type Parameters

#### T

`T`

The type of data returned by the successful operation

#### E

`E` *extends* `Error` = [`ErrorWithStatus`](../interfaces/ErrorWithStatus.md)

The type of error returned, defaults to ErrorWithStatus

### Parameters

#### fn

() => `T`

#### options?

[`TryCatchOptions`](../interfaces/TryCatchOptions.md)\<`E`\>

Configuration options for error handling behavior

### Returns

[`Result`](../types/Result.md)\<`T`, `E`\>

`Result<T, E>` for sync functions, `Promise<Result<T, E>>` for async/Promise inputs

### Examples

## Sync function (no await needed)
```typescript
const { data, error } = tryCatch(() => JSON.parse(raw));
```

## Async function
```typescript
const { data, error } = await tryCatch(async () => {
  const user = await getUser();
  const profile = await getProfile(user.id);
  return { user, profile };
});
```

## Direct Promise
```typescript
const { data, error } = await tryCatch(fetchUserData());
```

## With custom error class
```typescript
class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
  }
}

const { data, error } = await tryCatch(fetchApiData(), {
  ErrorClass: ApiError,
  defaultStatus: 500
});
```

## Using type guards
```typescript
const result = tryCatch(() => JSON.parse(raw));
if (isFailure(result)) {
  console.error(result.error.message);
} else {
  console.log(result.data);
}
```

### See

 - [Result](../types/Result.md) for the return type structure
 - [TryCatchOptions](../interfaces/TryCatchOptions.md) for configuration options
 - [isSuccess](isSuccess.md) and [isFailure](isFailure.md) for type guard helpers
