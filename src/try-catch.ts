/**
 * Success variant of Result containing data and no error.
 *
 * @template T - The type of the successful data
 */
export interface Success<T> {
    data: T;
    error: null;
}

/**
 * Failure variant of Result containing error and no data.
 *
 * @template E - The type of the error
 */
export interface Failure<E> {
    data: null;
    error: E;
}

/**
 * Result type representing either a success with data or a failure with error.
 * This discriminated union enables type-safe error handling without try/catch blocks.
 *
 * @template T - The type of the successful data
 * @template E - The type of the error, defaults to ErrorWithStatus
 *
 * @example
 * ```typescript
 * const result = tryCatch(() => JSON.parse(raw));
 * if (result.error) {
 *   // TypeScript knows result.data is null here
 *   console.error(result.error.message);
 * } else {
 *   // TypeScript knows result.error is null here
 *   console.log(result.data.toUpperCase());
 * }
 * ```
 */
export type Result<T, E = ErrorWithStatus> = Success<T> | Failure<E>;

/**
 * Extended Error interface with optional HTTP status code support.
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
export interface ErrorWithStatus extends Error {
    /** HTTP status code associated with the error (e.g., 400, 404, 500) */
    status?: number;
}

/**
 * Constructor signature for custom error classes used with tryCatch.
 *
 * @template E - The type of error class to construct
 */
export type ErrorConstructor<E extends Error> = new (
    message: string,
    status?: number,
    cause?: unknown,
) => E;

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
export interface TryCatchOptions<E extends Error = ErrorWithStatus> {
    /**
     * Default HTTP status code to use when caught error has no status property.
     *
     * @default 500
     */
    defaultStatus?: number;
    /**
     * Custom error class constructor for transforming caught errors.
     * If provided, all caught errors will be converted to instances of this class.
     *
     * @default Error
     */
    ErrorClass?: ErrorConstructor<E>;
}

/**
 * Type guard that checks if a Result is a Success.
 *
 * @param result - The Result to check
 * @returns True if the result is a Success, with proper type narrowing
 */
export const isSuccess = <T, E extends Error>(result: Result<T, E>): result is Success<T> =>
    result.error === null;

/**
 * Type guard that checks if a Result is a Failure.
 *
 * @param result - The Result to check
 * @returns True if the result is a Failure, with proper type narrowing
 */
export const isFailure = <T, E extends Error>(result: Result<T, E>): result is Failure<E> =>
    result.error !== null;

interface ExtractedErrorInfo {
    cause: Error | null;
    message: string;
    status: number;
}

const extractMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};

const extractCause = (error: unknown): Error | null => {
    if (error instanceof Error && error.cause) {
        return error.cause as Error;
    }
    return null;
};

const extractStatus = (error: unknown, defaultStatus: number): number => {
    if (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        typeof error.status === 'number'
    ) {
        const { status } = error;
        return status;
    }
    return defaultStatus;
};

const extractErrorInfo = (error: unknown, defaultStatus: number): ExtractedErrorInfo => ({
    cause: extractCause(error),
    message: extractMessage(error),
    status: extractStatus(error, defaultStatus),
});

interface ErrorParams {
    cause: Error | null;
    status: number;
}

const createErrorResult = <E extends Error>(error: E, params: ErrorParams): Failure<E> => {
    Object.assign(error, params);
    return { data: null, error };
};

const buildError = <E extends Error>(
    ErrorClass: ErrorConstructor<E>,
    message: string,
    params: ErrorParams,
): Failure<E> => {
    const newError = new ErrorClass(message, params.status, params.cause);
    return createErrorResult(newError, params);
};

interface HandleErrorConfig<E extends Error> {
    defaultStatus: number;
    ErrorClass: ErrorConstructor<E>;
    options: TryCatchOptions<E>;
}

const handleCaughtError = <E extends Error>(
    error: unknown,
    config: HandleErrorConfig<E>,
): Failure<E> => {
    const { message, cause, status } = extractErrorInfo(error, config.defaultStatus);
    const params: ErrorParams = { cause, status };
    if (config.options.ErrorClass && error instanceof config.options.ErrorClass) {
        return createErrorResult(error as E, params);
    }
    return buildError(config.ErrorClass, message, params);
};

/**
 * Wraps an operation and returns a Result object instead of throwing exceptions.
 *
 * - Sync functions return `Result<T, E>` directly (no Promise)
 * - Async functions and direct Promises return `Promise<Result<T, E>>`
 *
 * @template T - The type of data returned by the successful operation
 * @template E - The type of error returned, defaults to ErrorWithStatus
 *
 * @param fnOrPromise - A sync function, async function, or Promise to execute safely
 * @param options - Configuration options for error handling behavior
 *
 * @returns `Result<T, E>` for sync functions, `Promise<Result<T, E>>` for async/Promise inputs
 *
 * @example
 * ## Sync function (no await needed)
 * ```typescript
 * const { data, error } = tryCatch(() => JSON.parse(raw));
 * ```
 *
 * @example
 * ## Async function
 * ```typescript
 * const { data, error } = await tryCatch(async () => {
 *   const user = await getUser();
 *   const profile = await getProfile(user.id);
 *   return { user, profile };
 * });
 * ```
 *
 * @example
 * ## Direct Promise
 * ```typescript
 * const { data, error } = await tryCatch(fetchUserData());
 * ```
 *
 * @example
 * ## With custom error class
 * ```typescript
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
 * ```
 *
 * @example
 * ## Using type guards
 * ```typescript
 * const result = tryCatch(() => JSON.parse(raw));
 * if (isFailure(result)) {
 *   console.error(result.error.message);
 * } else {
 *   console.log(result.data);
 * }
 * ```
 *
 * @see {@link Result} for the return type structure
 * @see {@link TryCatchOptions} for configuration options
 * @see {@link isSuccess} and {@link isFailure} for type guard helpers
 */
export function tryCatch<T, E extends Error = ErrorWithStatus>(
    fnOrPromise: (() => Promise<T>) | Promise<T>,
    options?: TryCatchOptions<E>,
): Promise<Result<T, E>>;
export function tryCatch<T, E extends Error = ErrorWithStatus>(
    fn: () => T,
    options?: TryCatchOptions<E>,
): Result<T, E>;
// oxlint-disable-next-line max-statements
export function tryCatch<T, E extends Error = ErrorWithStatus>(
    fnOrPromise: (() => T) | Promise<T>,
    options: TryCatchOptions<E> = {},
): Result<T, E> | Promise<Result<T, E>> {
    const ErrorClass = (options.ErrorClass ?? (Error as unknown)) as ErrorConstructor<E>;
    const defaultStatus = options.defaultStatus ?? 500;
    const onError = (error: unknown): Failure<E> =>
        handleCaughtError(error, { ErrorClass, defaultStatus, options });

    if (fnOrPromise instanceof Promise) {
        return fnOrPromise.then(data => ({ data, error: null })).catch(onError);
    }

    try {
        const result = fnOrPromise();
        if (result instanceof Promise) {
            return result.then(data => ({ data, error: null })).catch(onError);
        }
        return { data: result, error: null };
    } catch (error) {
        return onError(error);
    }
}
