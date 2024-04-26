type NumberRange = `${string}-${string}` | `${string},${string}` | string;

/**
 * Converts range of numbers in string format to array of number seequence
 * Format: 1,6 or 1-6 or 6
 * @param range range of numbers
 * @returns array of number seequence
 */
export const rangeParser = (range: NumberRange): number[] => {
    let [start = 0, end = 0] = range.split(/[,-]/).map(Number);
    if (!end) {
        end = start;
        start = 1;
    }
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

/**
 * Prepend leading zero to number
 * @param num Number to prepend leading zero
 * @returns String with leading zero
 */
export const addZero = (num: number) => {
    return num > 9 ? num.toString() : `0${num}`;
};

/**
 * Get random number between two numbers
 * @param min Min number
 * @param max Max number
 * @returns Number between min and max number
 */
export const getRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

/**
 * Format string like 20k, 1m to number
 * @param amount amount as string
 * @returns Formatted number
 */
export const nFormatter = (amount: string): number => {
    const multipliers = { k: 1000, m: 1000000 };
    return Number.parseFloat(amount) * multipliers[amount.charAt(amount.length - 1).toLowerCase()];
};
