export type AnyFunc = <Input, Output>(...args: Input[]) => Output;

// Helper type to get the return type of a function
type ReturnTypeOf<F extends AnyFunc> = F extends (...args: any[]) => infer R ? R : never;

// Helper type to get the parameter types of a function
type ParametersOf<F extends AnyFunc> = F extends (...args: infer P) => any ? P : never;

type PipeArgs<F extends AnyFunc[], Acc extends AnyFunc[] = []> = F extends [
    infer First extends AnyFunc,
    ...infer Rest extends AnyFunc[],
]
    ? Rest extends [infer Second extends AnyFunc, ...any[]]
        ? ReturnTypeOf<First> extends ParametersOf<Second>[number]
            ? PipeArgs<Rest, [...Acc, First]>
            : Acc
        : [...Acc, First]
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
export const pipe = (...fns: AnyFunc[]) =>
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
    return fns.reduce(
        (acc: any, fn: AnyFunc) => fn(...[acc]),
        firstFn(...[arg]),
    ) as LastFnReturnType<F, ReturnType<FirstFn>>;
};

/**
 * Check if function is asynchronous
 * @param fn Function to check
 * @returns True if function is asynchronous
 */
export const isAsync = <T extends (...args: any[]) => any>(fn: T): boolean =>
    fn.constructor.name === 'AsyncFunction';
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
