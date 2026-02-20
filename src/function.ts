export type AnyFunc<Args extends unknown[] = unknown[], Return = unknown> = (
    ...args: Args
) => Return;
export type AnyAsyncFunc<Input extends unknown[] = unknown[], Output = unknown> = (
    ...args: Input
) => Promise<Output>;

type FirstParameter<F extends AnyFunc> = F extends (
    arg: infer P,
    ...args: never
) => unknown
    ? P
    : never;

// Helper type to get the parameter types of a function
type ParametersOf<F extends AnyFunc> = F extends (...args: infer P) => unknown ? P : never;

type LastFnReturnType<F extends Array<AnyFunc>, Else = never> = F extends [
    ...never[],
    (...arg: never) => infer R,
]
    ? R
    : Else;

/**
 * Call every function in an array
 * @param functions List of functions to call
 */
export const batchInvoke = (functions: (() => void)[]): void => {
    for (const fn of functions) {
        if (fn) {
            fn();
        }
    }
};

/**
 * Composes functions from left to right, passing the result of each function to the next.
 *
 * @template FirstFn - The first function in the pipeline
 * @template F - Array of subsequent functions to compose
 *
 * @param arg - Initial value to pass to the first function (omit if first function takes no arguments)
 * @param firstFn - The first function to execute (or can be the only argument if it takes no parameters)
 * @param fns - Additional functions to compose, where each function receives the return value of the previous function
 *
 * @returns The return value of the last function in the pipeline
 *
 * @example
 * With initial argument
 * const addTwo = (x: number) => x + 2;
 * const multiplyByThree = (x: number) => x * 3;
 * pipe(5, addTwo, multiplyByThree); // Returns 21: (5 + 2) * 3
 *
 * @example
 * Without initial argument (first function takes no parameters)
 * const getValue = () => 10;
 * const double = (x: number) => x * 2;
 * pipe(getValue, double); // Returns 20
 */
// Overload 1: With argument - stricter type checking
export function pipe<FirstFn extends AnyFunc, F extends AnyFunc[]>(
    arg: ParametersOf<FirstFn>[0],
    firstFn: FirstFn,
    ...fns: F
): LastFnReturnType<F, ReturnType<FirstFn>>;

// Overload 2: Without argument - firstFn must take no parameters
export function pipe<FirstFn extends () => unknown, F extends AnyFunc[]>(
    firstFn: FirstFn,
    ...fns: F
): LastFnReturnType<F, ReturnType<FirstFn>>;

// Implementation
export function pipe<FirstFn extends AnyFunc, F extends AnyFunc[]>(
    argOrFirstFn?: FirstParameter<FirstFn> | FirstFn,
    firstFnOrSecondFn?: FirstFn | F[0],
    ...fns: F
): unknown {
    if (typeof argOrFirstFn === 'function') {
        const allFns = [firstFnOrSecondFn, ...fns].filter(Boolean as (fn: unknown) => fn is AnyFunc);
        let result = (argOrFirstFn as AnyFunc)();
        for (const fn of allFns) {
            result = fn(result);
        }
        return result;
    }
    let result = (firstFnOrSecondFn as FirstFn)(argOrFirstFn);
    for (const fn of fns) {
        result = fn(result);
    }
    return result;
}

/**
 * Check if function is asynchronous
 * @param fn Function to check
 * @returns True if function is asynchronous
 */
export const isAsync = <T extends (...args: unknown[]) => unknown>(fn: T): boolean =>
    fn.constructor.name === 'AsyncFunction';

/**
 * Pass the value through the callback, and return the value
 *
 * @example
 *
 * function createUser(name: string): User {
 *   return tap(new User, user => {
 *     user.name = name
 *   })
 * }
 *
 */
export const tap = <T>(value: T, callback: (value: T) => void): T => {
    callback(value);
    return value;
};
