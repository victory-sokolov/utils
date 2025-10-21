/**
 * Result type representing either a success with data or a failure with error.
 * This discriminated union enables type-safe error handling without try/catch blocks.
 *
 * @template T - The type of the successful data
 * @template E - The type of the error, defaults to ErrorWithStatus
 *
 * @example
 *
 * const result: Result<string> = await tryCatch(fetchText());
 * if (result.error) {
 *   // TypeScript knows result.data is null here
 *   console.error(result.error.message);
 * } else {
 *   // TypeScript knows result.error is null here
 *   console.log(result.data.toUpperCase());
 * }
 *
 */
type Result<T, E = ErrorWithStatus> = Success<T> | Failure<E>;

/**
 * Success variant of Result containing data and no error.
 *
 * @template T - The type of the successful data
 */
interface Success<T> {
    data: T;
    error: null;
}

/**
 * Failure variant of Result containing error and no data.
 *
 * @template E - The type of the error
 */
interface Failure<E> {
    data: null;
    error: E;
}

/**
 * Extended Error interface with optional HTTP status code support.
 * This enables consistent error handling with status codes across the application.
 *
 * @example
 * ```typescript
 * throw Object.assign(new Error('User not found'), { status: 404 });
 *
 * // Or with custom class:
 * class ApiError extends Error implements ErrorWithStatus {
 *   constructor(message: string, public status?: number) {
 *     super(message);
 *   }
 * }
 * ```
 */
interface ErrorWithStatus extends Error {
    /** HTTP status code associated with the error (e.g., 400, 404, 500) */
    status?: number;
}

/**
 * Configuration options for the tryCatch function.
 *
 * @template E - The type of error class to use for error transformation
 *
 * @example
 * ```typescript
 * // Basic configuration
 * { defaultStatus: 400 }
 *
 * // With custom error class
 * { ErrorClass: ApiError, defaultStatus: 500 }
 * ```
 */
interface TryCatchOptions<E extends Error = Error> {
    /**
     * Custom error class constructor for transforming caught errors.
     * If provided, all caught errors will be converted to instances of this class.
     *
     * @default Error
     */
    ErrorClass?: new (message: string, status?: number, cause?: string) => E;

    /**
     * Default HTTP status code to use when caught error has no status property.
     *
     * @default 500
     */
    defaultStatus?: number;
}

/**
 * Wraps an asynchronous operation and returns a Result object instead of throwing exceptions.
 *
 * This function provides type-safe error handling for async operations using the Result pattern.
 * It catches any thrown errors and returns them in a consistent format, optionally transforming
 * them to custom error classes with status codes.
 *
 * @template T - The type of data returned by the successful operation
 * @template E - The type of error returned, defaults to Error
 *
 * @param fn - An function or async function or Promise to execute safely
 * @param options - Configuration options for error handling behavior
 *
 * @returns A Promise that resolves to a Result object containing either data or error
 *
 * @example
 * ## Basic Usage
 * ```typescript
 * const { data, error } = await tryCatch(fetchUserData());
 * if (error) {
 *   console.error('Operation failed:', error.message);
 *   return;
 * }
 * ```
 *
 * @example
 * ## With Async Function
 *
 * const { data, error } = await tryCatch(async () => {
 *   const user = await getUser();
 *   const profile = await getProfile(user.id);
 *   return { user, profile };
 * });
 *
 *
 * @example
 * ## With Custom Error Class and Status
 *
 * class ApiError extends Error {
 *   constructor(message: string, public status?: number) {
 *     super(message);
 *   }
 * }
 *
 * const { data, error } = await tryCatch(fetchApiData(), {
 *   ErrorClass: ApiError,
 *   defaultStatus: 500
 * });
 *
 * if (error) {
 *   error is typed as ApiError with status property
 *   console.log(`API Error ${error.status}: ${error.message}`);
 * }
 *
 *
 * @example
 * With Status Code Handling
 *
 * const { data, error } = await tryCatch(saveUserData(user), {
 *   defaultStatus: 400 // Use 400 Bad Request for validation errors
 * });
 *
 * if (error) {
 *   switch (error.status) {
 *     case 409:
 *       // Handle conflict error
 *       break;
 *     case 400:
 *       // Handle validation error
 *       break;
 *   }
 * }
 *
 *
 * @remarks
 * - If the operation succeeds: returns `{ data: T, error: null }`
 * - If the operation fails: returns `{ data: null, error: E }`
 * - Preserves the original error's status code if available
 * - Maintains error prototype chain for instanceof checks
 * - Converts non-Error thrown values to proper Error instances
 * - Supports both Promise objects and async functions
 *
 * @see {@link Result} for the return type structure
 * @see {@link TryCatchOptions} for configuration options
 * @see {@link ErrorWithStatus} for the default error type
 *
 */
export async function tryCatch<T, E extends Error = Error>(
    fn: () => T | Promise<T>,
    options: TryCatchOptions<E> = {}
): Promise<Result<T, E>> {
    const { ErrorClass = Error as any, defaultStatus = 500 } = options;

    try {
        const result = fn();
        const data = result instanceof Promise ? await result : result;
        return { data, error: null };
    } catch (error) {
        if (error instanceof ErrorClass) {
            return { data: null, error: error as E };
        }

        const message = error instanceof Error ? error.message : String(error);
        const cause
            = error instanceof Error ? (error.cause as Error) : undefined;
        const status = (error as any)?.status || defaultStatus;

        const customError = new ErrorClass(message, status, cause);
        return { data: null, error: customError as E };
    }
}
