import type { Maybe } from './types';

export { COUNTRY_NAMES } from './countries';

/**
 * Get country name from ISO code
 * @param iso ISO code
 * @returns Country name from ISO code
 * @example
 * getCountryFromISO('US'); // 'United States'
 */
export const getCountryFromISO = (iso: string): Maybe<string> => {
    const languageNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return languageNames.of(iso.toUpperCase());
};

/**
 * Extract coordinates from GeolocationPosition
 * @param position GeolocationPosition from the browser API
 * @returns Object with latitude and longitude properties
 */
export const showPosition = (
    position: GeolocationPosition,
): { latitude: number; longitude: number } => ({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
});

/**
 * Returns coordinates
 * @returns Promise with latitude and longitude properties
 */
export const getLocation = (): Promise<{ latitude: number; longitude: number }> =>
    new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser.'));
            return;
        }
        navigator.geolocation.getCurrentPosition(
            position => resolve(showPosition(position)),
            error => reject(error),
        );
    });

/**
 * Get flag emoji from country code
 * @param countryCode
 * @returns Flag emoji string
 */
export const getFlagEmoji = (countryCode: string): string => {
    const codePoints = [...countryCode.toUpperCase()].map(
        char => 127_397 + (char.codePointAt(0) ?? 0),
    );
    return String.fromCodePoint(...codePoints);
};
