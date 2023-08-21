const SIZE_UNITS = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

/**
 * Pause execution
 * @param ms Pause in milliseconds
 * @returns
 */
export const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Start time
 * @returns {number} time in seconds
 */
export const perfStart = () => performance.now();

/**
 * End time of function
 * @param startTime
 */
export const perfStop = (startTime: number) => {
    const endTime = performance.now();
    const seconds = (endTime - startTime) / 1000;
    console.info(`Function took ${seconds.toFixed(2)} seconds`);
};

/**
 * Convert bytes to size in Human readable format
 * @param bytes Bytes
 * @returns Human readable size from bytes
 */
export const bytesToSize = (bytes: number): string => {
    if (bytes === 0) return '0';
    const exp = Math.floor(Math.log(bytes) / Math.log(1000));
    const size = bytes / 1000 ** exp;
    const short = Math.round(size);
    const unit = exp === 0 ? '' : ' ' + SIZE_UNITS[exp - 1];
    return short.toString() + unit;
};

/**
 * Debouncing used to improve the performance of frequently executed actions,
 * by delaying them, grouping them, and only executing the last call.
 * @param fn Function to debounce
 * @param delay Function delay
 * @returns new function
 */
export const debounce = <T extends unknown[]>(fn: (...args: T) => void, delay: number) => {
    let timeoutID: number | undefined;
    let lastArgs: T | undefined;

    const run = () => {
        if (lastArgs) {
            fn(...lastArgs);
            lastArgs = undefined;
        }
    };

    const debounced = (...args: T) => {
        clearTimeout(timeoutID);
        lastArgs = args;
        timeoutID = window.setTimeout(run, delay);
    };

    debounced.flush = () => {
        clearTimeout(timeoutID);
        run();
    };

    return debounced;
};

/**
 * @param fn Function to debounce used to improve the performance of frequently executed actions.
 * Guarantees the regular execution of an action.
 * @param cooldown Timer arg
 * @returns a new function, which when executed, stores the call arguments and starts the cooldown timer
 */
export const throttle = <Args extends unknown[]>(fn: (...args: Args) => void, cooldown: number) => {
    let lastArgs: Args | undefined;

    const run = () => {
        if (lastArgs) {
            fn(...lastArgs);
            lastArgs = undefined;
        }
    };

    const throttled = (...args: Args) => {
        const isOnCooldown = !!lastArgs;

        lastArgs = args;

        if (isOnCooldown) {
            return;
        }

        window.setTimeout(run, cooldown);
    };

    return throttled;
};
