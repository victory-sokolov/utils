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
export const pipe = (...fns: Array<Function>) => fns.reduce((prevFunc: unknown, func) => func(prevFunc), fns[0]);

/**
 * Check if function is asynchronous
 * @param fn: Function to check
 * @returns True if function is asynchronous
 */
export const isAsync = (fn: Function) => fn.constructor.name === 'AsyncFunction';
