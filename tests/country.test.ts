import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getCountryFromISO, getFlagEmoji, getLocation, showPosition } from '../src/country';

const createMockPosition = () => ({
    coords: {
        accuracy: 10,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: 34.0522,
        longitude: -118.2437,
        speed: null,
    },
    timestamp: Date.now(),
});

describe('getCountryFromISO', () => {
    it('should return the country name for a valid ISO code', () => {
        expect(getCountryFromISO('US')).toBe('United States');
        expect(getCountryFromISO('GB')).toBe('United Kingdom');
    });

    it('should return valid code for reserved codes like XX', () => {
        expect(getCountryFromISO('XX')).toBe('XX');
    });

    it('should throw RangeError for structurally invalid codes', () => {
        expect(() => getCountryFromISO('INVALID')).toThrow(RangeError);
    });
});

describe('showPosition', () => {
    it('should extract latitude and longitude from a Position object', () => {
        const result = showPosition(createMockPosition());
        expect(result).toStrictEqual({ latitude: 34.0522, longitude: -118.2437 });
    });
});

describe('getLocation', () => {
    let originalNavigatorGeolocation: Geolocation | undefined;

    beforeEach(() => {
        originalNavigatorGeolocation = navigator.geolocation;
        Object.defineProperty(navigator, 'geolocation', {
            configurable: true,
            value: {
                getCurrentPosition: vi.fn(),
                watchPosition: vi.fn(),
                clearWatch: vi.fn(),
            },
            writable: true,
        });
    });

    afterEach(() => {
        Object.defineProperty(navigator, 'geolocation', {
            configurable: true,
            value: originalNavigatorGeolocation,
            writable: true,
        });
        vi.restoreAllMocks();
    });

    it('should return coordinates when geolocation is supported and successful', async () => {
        (
            navigator.geolocation.getCurrentPosition as ReturnType<typeof vi.fn>
        ).mockImplementationOnce(successCallback => {
            successCallback(createMockPosition());
        });
        getLocation();

        expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    });

    it('should reject when geolocation is not supported', async () => {
        Object.defineProperty(navigator, 'geolocation', {
            configurable: true,
            value: undefined,
            writable: true,
        });

        await expect(() => getLocation()).toThrow('Geolocation is not supported by this browser.');
    });
});

describe('getFlagEmoji', () => {
    it('should return the flag emoji for a valid country code', () => {
        expect(getFlagEmoji('US')).toBe('🇺🇸');
        expect(getFlagEmoji('GB')).toBe('🇬🇧');
    });
});
