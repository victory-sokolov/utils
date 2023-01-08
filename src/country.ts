/**
 * Get country name from ISO code
 * @param iso ISO code
 * @returns Country name from ISO code
 */
export const getCountryFromISO = (iso: string): string | undefined => {
    const languageNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return languageNames.of(iso.toUpperCase());
};

/**
 * Get flag emoji from country code
 * @param countryCode
 * @returns Flag emoji string
 */
export const getFlagEmoji = (countryCode: string): string => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};
