import { describe, expect, it } from 'vitest';
import { tryCatch } from '../src/tryCatch';

// Define a custom error class for testing purposes
class CustomError extends Error {
    constructor(message: string, public status?: number, public cause?: Error) {
        super(message);
        this.name = 'CustomError';
    }
}

describe('tryCatch', () => {
    it('should return data and no error for a successful synchronous function', async () => {
        const result = await tryCatch(() => 'success data');
        expect(result.data).toBe('success data');
        expect(result.error).toBeNull();
    });

    it('should return data and no error for a successful asynchronous function', async () => {
        const result = await tryCatch(async () =>
            Promise.resolve('async success')
        );
        expect(result.data).toBe('async success');
        expect(result.error).toBeNull();
    });

    it('should return null data and an Error for a synchronous function that throws an Error', async () => {
        const errorMessage = 'Sync error';
        const result = await tryCatch(() => {
            throw new Error(errorMessage);
        });
        expect(result.data).toBeNull();
        expect(result.error).toBeInstanceOf(Error);
        expect(result.error?.message).toBe(errorMessage);
        expect(result.error?.status).toBe(500); // Default status
    });

    it('should return null data and an Error for an asynchronous function that rejects with an Error', async () => {
        const errorMessage = 'Async error';
        const result = await tryCatch(async () =>
            Promise.reject(new Error(errorMessage))
        );
        expect(result.data).toBeNull();
        expect(result.error).toBeInstanceOf(Error);
        expect(result.error?.message).toBe(errorMessage);
        expect(result.error?.status).toBe(500); // Default status
    });

    it('should convert Error thrown values to Error instances with default status', async () => {
        const result = await tryCatch(() => {
            throw new Error('Non-error string');
        });
        expect(result.data).toBeNull();
        expect(result.error).toBeInstanceOf(Error);
        expect(result.error?.message).toBe('Non-error string');
        expect(result.error?.status).toBe(500);
    });

    it('should convert actual non-Error thrown values (strings) to Error instances', async () => {
        const result = await tryCatch(() => {
            throw 'Plain string error';
        });
        expect(result.data).toBeNull();
        expect(result.error).toBeInstanceOf(Error);
        expect(result.error?.message).toBe('Plain string error');
        expect(result.error?.status).toBe(500);
    });

    it('should use CustomErrorClass when provided in options for thrown Error', async () => {
        const errorMessage = 'Custom error message';
        const result = await tryCatch(
            () => {
                throw new Error(errorMessage);
            },
            { ErrorClass: CustomError }
        );
        expect(result.data).toBeNull();
        expect(result.error).toBeInstanceOf(CustomError);
        expect(result.error?.message).toBe(errorMessage);
        expect(result.error?.status).toBe(500); // Default status
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
            { ErrorClass: CustomError }
        );
        expect(result.data).toBeNull();
        expect(result.error).toBeInstanceOf(CustomError);
        expect(result.error?.message).toBe(errorMessage);
        expect(result.error?.status).toBe(404);
    });

    it('should use defaultStatus from options when thrown error has no status', async () => {
        const errorMessage = 'Generic failure';
        const result = await tryCatch(
            () => {
                throw new Error(errorMessage);
            },
            { ErrorClass: CustomError, defaultStatus: 400 }
        );
        expect(result.data).toBeNull();
        expect(result.error).toBeInstanceOf(CustomError);
        expect(result.error?.message).toBe(errorMessage);
        expect(result.error?.status).toBe(400);
    });

    it('should convert non-Error thrown values to CustomError instances with provided defaultStatus', async () => {
        const result = await tryCatch(
            () => {
                throw new Error('Something went wrong');
            },
            { ErrorClass: CustomError, defaultStatus: 503 }
        );
        expect(result.data).toBeNull();
        expect(result.error).toBeInstanceOf(CustomError);
        expect(result.error?.message).toBe('Something went wrong');
        expect(result.error?.status).toBe(503);
    });

    it('should handle functions resolving to null or undefined gracefully', async () => {
        const resultNull = await tryCatch(async () => Promise.resolve(null));
        expect(resultNull.data).toBeNull();
        expect(resultNull.error).toBeNull();

        const resultUndefined = await tryCatch(async () =>
            Promise.resolve(undefined)
        );
        expect(resultUndefined.data).toBeUndefined();
        expect(resultUndefined.error).toBeNull();
    });

    it('should preserve the original error instance if it is an instance of ErrorClass', async () => {
        const originalError = new CustomError('Existing custom error', 403);
        const result = await tryCatch(
            () => {
                throw originalError;
            },
            { ErrorClass: CustomError }
        );
        expect(result.data).toBeNull();
        expect(result.error).toBe(originalError); // Expect exact instance
    });

    it('should capture the cause property if present in the thrown error', async () => {
        const innerError = new Error('Database connection failed');
        const thrownError = Object.assign(new Error('Operation failed'), {
            cause: innerError,
        });
        const result = await tryCatch(() => {
            throw thrownError;
        });
        expect(result.data).toBeNull();
        expect(result.error).toBeInstanceOf(Error);
        expect(result.error?.message).toBe('Operation failed');
        expect(result.error?.cause).toBe(innerError);
    });

    it('should capture the cause property when using a custom error class', async () => {
        const innerError = new Error('Network issue');
        const thrownError = Object.assign(
            new Error('External service call failed'),
            {
                cause: innerError,
                status: 502,
            }
        );
        const result = await tryCatch(
            () => {
                throw thrownError;
            },
            { ErrorClass: CustomError, defaultStatus: 500 }
        );
        expect(result.data).toBeNull();
        expect(result.error).toBeInstanceOf(CustomError);
        expect(result.error?.message).toBe('External service call failed');
        expect(result.error?.status).toBe(502);
        expect(result.error?.cause).toBe(innerError);
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
        expect(result.data).toBeNull();
        expect(result.error).toBeInstanceOf(Error);
        expect(result.error?.message).toBe('[object Object]'); // Default Error message for object
        expect(result.error?.status).toBe(401);
    });
});
