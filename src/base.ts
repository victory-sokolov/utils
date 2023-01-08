/**
 * Pause execution
 * @param ms Pause in milliseconds
 * @returns
 */
export const wait = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));
