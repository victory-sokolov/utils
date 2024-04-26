type AnyFunc = (...arg: any) => any;

type PipeArgs<F extends AnyFunc[], Acc extends AnyFunc[] = []> = F extends [
    (...args: infer A) => infer B,
]
    ? [...Acc, (...args: A) => B]
    : F extends [(...args: infer A) => any, ...infer Tail]
        ? Tail extends [(arg: infer B) => any, ...any[]]
            ? PipeArgs<Tail, [...Acc, (...args: A) => B]>
            : Acc
        : Acc;

type LastFnReturnType<F extends Array<AnyFunc>, Else = never> = F extends [
    ...any[],
    (...arg: any) => infer R,
]
    ? R
    : Else;

/**
 * Call every function in an array
 * @param functions List of functions to call
 */
export const batchInvoke = (functions: Array<() => void>): void => {
    functions.forEach((fn) => fn && fn());
};

/**
 * Passing result from one function to another
 * @param fns Array of functions
 * @returns result of last invoked function
 */
export const pipe = (...fns: Array<Function>) =>
    fns.reduce((prevFunc: unknown, func) => func(prevFunc), fns[0]);

/**
 * Passing result of one function to another with arguments
 * @param arg Argument for the first function
 * @param firstFn First function to execute
 * @param fns Array of functions
 * @returns Result of last invoked function
 */
export const applyPipe = <FirstFn extends AnyFunc, F extends AnyFunc[]>(
    arg: Parameters<FirstFn>[0],
    firstFn: FirstFn,
    ...fns: PipeArgs<F> extends F ? F : PipeArgs<F>
): LastFnReturnType<F, ReturnType<FirstFn>> => {
    return (fns as AnyFunc[]).reduce((acc, fn) => fn(acc), firstFn(arg));
};

/**
 * Check if function is asynchronous
 * @param fn Function to check
 * @returns True if function is asynchronous
 */
export const isAsync = (fn: Function) => fn.constructor.name === 'AsyncFunction';

/**
 * Pass the value through the callback, and return the value
 *
 * @example
 * ```
 * function createUser(name: string): User {
 *   return tap(new User, user => {
 *     user.name = name
 *   })
 * }
 * ```
 */
export function tap<T>(value: T, callback: (value: T) => void): T {
    callback(value);
    return value;
}
