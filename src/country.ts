type Position = {
    coords: {
        latitude: number;
        longitude: number;
    };
};

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
 * Position position object
 * @returns Position object with latitude and longitude properties
 */
export const showPosition = (position: Position) => {
    return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    };
};

/**
 * Returns coordinates
 * @returns Position object with latitude and longitude properties
 */
export const getLocation = (): Position | void => {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(showPosition);
    }
    throw new Error('Geolocation is not supported by this browser.');
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
