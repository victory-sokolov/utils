type Currency =
    | 'USD' // United States Dollar
    | 'EUR' // Euro
    | 'GBP' // British Pound Sterling
    | 'JPY' // Japanese Yen
    | 'CAD' // Canadian Dollar
    | 'AUD' // Australian Dollar
    | 'RUB' // Russian Ruble
    | 'INR' // Indian Rupee
    | 'CNY' // Chinese Yuan
    | 'CHF'; // Swiss Franc

/**
 * Convert cents to dollars
 * @param cents Number of cents
 * @returns Currency formatted to dollars
 */
export const toDollars = (cents: number, currency: Currency = 'USD', locale: string = 'en-US') =>
    (cents / 100).toLocaleString(locale, { style: 'currency', currency });

/**
 * Format price in cents
 * @param priceInCents
 * @param currency
 * @returns Formated price
 */
export const formatPrice = (
    priceInCents: string,
    currency: Currency = 'USD',
    locale: string = 'en-US',
) => {
    const price = Number.parseFloat(priceInCents);
    const dollars = price / 100;

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        // Use minimumFractionDigits to handle cases like $59.00 -> $59
        minimumFractionDigits: dollars % 1 !== 0 ? 2 : 0,
    }).format(dollars);
};
