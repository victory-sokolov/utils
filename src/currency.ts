type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'RUB' | 'INR' | 'CNY' | 'CHF';

const getFractionDigits = (dollars: number): number => {
    if (dollars % 1 === 0) {
        return 0;
    }
    return 2;
};

/**
 * Convert cents to dollars
 * @param cents Number of cents
 * @returns Currency formatted to dollars
 * @example
 * toDollars(1000); // '$10.00'
 */
export const toDollars = (cents: number, currency: Currency = 'USD', locale = 'en-US'): string =>
    (cents / 100).toLocaleString(locale, { currency, style: 'currency' });

/**
 * Format price in cents
 * @param priceInCents
 * @param currency
 * @returns Formated price
 */
export const formatPrice = (
    priceInCents: string,
    currency: Currency = 'USD',
    locale = 'en-US',
): string => {
    const price = Number.parseFloat(priceInCents);

    // Handle invalid numbers
    if (Number.isNaN(price)) {
        return 'Invalid price';
    }

    const dollars = price / 100;

    const minimumFractionDigits: number = getFractionDigits(dollars);
    return new Intl.NumberFormat(locale, {
        currency,
        minimumFractionDigits,
        style: 'currency',
    }).format(dollars);
};
