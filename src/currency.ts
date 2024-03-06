/**
 * Convert cents to dollars
 * @param cents Number of cents
 * @returns Currency formatted to dollars
 */
export const toDollars = (cents: number) =>
    (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
