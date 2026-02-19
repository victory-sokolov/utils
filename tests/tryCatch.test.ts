import { describe, expect, it } from 'vitest';
import { tryCatch } from '../src/tryCatch';

class CustomError extends Error {
    constructor(
        message: string,
        public status?: number,
        public cause?: unknown,
    ) {
        super(message);
        this.name = 'CustomError';
    }
}

interface ErrorWithStatus extends Error {
    status?: number;
}

const expectErrorResult = (
    result: { data: unknown; error: ErrorWithStatus | null },
    ErrorClass: new (message: string, status?: number, cause?: unknown) => Error,
    message: string,
    status: number,
    options?: { cause?: unknown },
) => {
    expect(result.data).toBeNull();
    expect(result.error).toBeInstanceOf(ErrorClass);
    expect(result.error?.message).toBe(message);
    expect(result.error?.status).toBe(status);
    if (options?.cause) {
        expect(result.error?.cause).toBe(options.cause);
    }
};

describe('tryCatch', () => {
    it('should return data and no error for a successful synchronous function', async () => {
        const result = await tryCatch(() => 'success data');
        expect(result.data).toBe('success data');
        expect(result.error).toBeNull();
    });

    it('should return data and no error for a successful asynchronous function', async () => {
        const result = await tryCatch(async () => 'async success');
        expect(result.data).toBe('async success');
        expect(result.error).toBeNull();
    });

    it('should return null data and an Error for a synchronous function that throws an Error', async () => {
        const errorMessage = 'Sync error';
        const result = await tryCatch(() => {
            throw new Error(errorMessage);
        });
        expectErrorResult(result, Error, errorMessage, 500);
    });

    it('should return null data and an Error for an asynchronous function that rejects with an Error', async () => {
        const errorMessage = 'Async error';
        const result = await tryCatch(async () => {
            throw new Error(errorMessage);
        });
        expectErrorResult(result, Error, errorMessage, 500);
    });

    it('should convert non-Error thrown values (strings) to Error instances with default status', async () => {
        const result = await tryCatch(() => {
            // eslint-disable-next-line no-throw-literal
            throw 'Non-error string';
        });
        expectErrorResult(result, Error, 'Non-error string', 500);
    });

    it('should convert actual non-Error thrown values (strings) to Error instances', async () => {
        const result = await tryCatch(() => {
            // eslint-disable-next-line no-throw-literal
            throw 'Plain string error';
        });
        expectErrorResult(result, Error, 'Plain string error', 500);
    });

    it('should use CustomErrorClass when provided in options for thrown Error', async () => {
        const errorMessage = 'Custom error message';
        const result = await tryCatch(
            () => {
                throw new Error(errorMessage);
            },
            { ErrorClass: CustomError },
        );
        expectErrorResult(result, CustomError, errorMessage, 500);
    });

    it('should preserve status from thrown error if ErrorClass is used and error has status', async () => {
        const errorMessage = 'API failed';
        const thrownError = Object.assign(new Error(errorMessage), {
            status: 404,
        });
        const result = await tryCatch(
            () => {
                throw thrownError;
            },
            { ErrorClass: CustomError },
        );
        expectErrorResult(result, CustomError, errorMessage, 404);
    });

    it('should use defaultStatus from options when thrown error has no status', async () => {
        const errorMessage = 'Generic failure';
        const result = await tryCatch(
            () => {
                throw new Error(errorMessage);
            },
            { ErrorClass: CustomError, defaultStatus: 400 },
        );
        expectErrorResult(result, CustomError, errorMessage, 400);
    });

    it('should convert non-Error thrown values to CustomError instances with provided defaultStatus', async () => {
        const result = await tryCatch(
            () => {
                throw new Error('Something went wrong');
            },
            { ErrorClass: CustomError, defaultStatus: 503 },
        );
        expectErrorResult(result, CustomError, 'Something went wrong', 503);
    });

    it('should handle functions resolving to null or undefined gracefully', async () => {
        const resultNull = await tryCatch(async () => null);
        expect(resultNull.data).toBeNull();
        expect(resultNull.error).toBeNull();

        const resultUndefined = await tryCatch(async () => undefined);
        expect(resultUndefined.data).toBeUndefined();
        expect(resultUndefined.error).toBeNull();
    });

    it('should preserve the original error instance if it is an instance of ErrorClass', async () => {
        const originalError = new CustomError('Existing custom error', 403);
        const result = await tryCatch(
            () => {
                throw originalError;
            },
            { ErrorClass: CustomError },
        );
        expect(result.data).toBeNull();
        expect(result.error).toBe(originalError);
    });

    it('should capture the cause property if present in the thrown error', async () => {
        const innerError = new Error('Database connection failed');
        const thrownError = Object.assign(new Error('Operation failed'), {
            cause: innerError,
        });
        const result = await tryCatch(() => {
            throw thrownError;
        });
        expectErrorResult(result, Error, 'Operation failed', 500, { cause: innerError });
    });

    it('should capture the cause property when using a custom error class', async () => {
        const innerError = new Error('Network issue');
        const thrownError = Object.assign(new Error('External service call failed'), {
            cause: innerError,
            status: 502,
        });
        const result = await tryCatch(
            () => {
                throw thrownError;
            },
            { ErrorClass: CustomError, defaultStatus: 500 },
        );
        expectErrorResult(result, CustomError, 'External service call failed', 502, {
            cause: innerError,
        });
    });

    it('should correctly handle thrown Error instances when no ErrorClass is provided', async () => {
        const error = new Error('Standard error');
        const result = await tryCatch(() => {
            throw error;
        });
        expect(result.data).toBeNull();
        expect(result.error).toBeInstanceOf(Error);
        expect(result.error).not.toBe(error);
        expect(result.error?.message).toBe('Standard error');
        expect(result.error?.status).toBe(500);
    });

    it('should handle errors with status but no message gracefully', async () => {
        const thrownError = { status: 401 }; // No message property
        const result = await tryCatch(() => {
            throw thrownError;
        });
        expectErrorResult(result, Error, '[object Object]', 401);
    });
});
