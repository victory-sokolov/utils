const SIZE_UNITS = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

/**
 * Pause execution
 * @param ms Pause in milliseconds
 * @returns
 */
export const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

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
