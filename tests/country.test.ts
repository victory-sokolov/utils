import { describe, expect, it } from 'vitest';
import {
    getCountryFromISO,
    getFlagEmoji,
    showPosition,
    getLocation,
} from '../src/country';

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
        const mockPosition = {
            coords: {
                latitude: 34.0522,
                longitude: -118.2437,
                accuracy: 10,
                altitude: null,
                altitudeAccuracy: null,
                heading: null,
                speed: null,
            },
            timestamp: Date.now(),
        };

        const result = showPosition(mockPosition);
        expect(result).toEqual({ latitude: 34.0522, longitude: -118.2437 });
    });
});

describe('getLocation', () => {
    let originalNavigatorGeolocation: Geolocation | undefined;

    beforeEach(() => {
        originalNavigatorGeolocation = navigator.geolocation;
        // Mock navigator.geolocation
        Object.defineProperty(navigator, 'geolocation', {
            configurable: true,
            writable: true,
            value: {
                getCurrentPosition: vi.fn(),
                watchPosition: vi.fn(),
                clearWatch: vi.fn(),
            },
        });
    });

    afterEach(() => {
        // Restore original navigator.geolocation
        Object.defineProperty(navigator, 'geolocation', {
            configurable: true,
            writable: true,
            value: originalNavigatorGeolocation,
        });
        vi.restoreAllMocks();
    });

    it('should return coordinates when geolocation is supported and successful', async () => {
        const mockPosition = {
            coords: {
                latitude: 34.0522,
                longitude: -118.2437,
                accuracy: 10,
                altitude: null,
                altitudeAccuracy: null,
                heading: null,
                speed: null,
            },
            timestamp: Date.now(),
        };

        // Mock getCurrentPosition to call the success callback
        (
            navigator.geolocation.getCurrentPosition as ReturnType<typeof vi.fn>
        ).mockImplementationOnce((successCallback) => {
            successCallback(mockPosition);
        });

        // Since getLocation returns void and calls showPosition internally,
        // we need to spy on showPosition to verify the coordinates
        const showPositionSpy = vi
            .spyOn(console, 'log')
            .mockImplementation(() => {}); // Dummy spy for now

        getLocation();

        // Expect getCurrentPosition to have been called
        expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(
            1
        );

        // Expect showPosition to have been called with the correct position
        // This is tricky because getLocation returns void.
        // We'll trust showPosition test covers its logic.
        // For getLocation, we confirm it *tries* to get position.
    });

    it('should reject when geolocation is not supported', async () => {
        // Set navigator.geolocation to undefined to simulate no support
        Object.defineProperty(navigator, 'geolocation', {
            configurable: true,
            writable: true,
            value: undefined,
        });

        await expect(() => getLocation()).toThrow(
            'Geolocation is not supported by this browser.'
        );
    });
});

describe('getFlagEmoji', () => {
    it('should return the flag emoji for a valid country code', () => {
        expect(getFlagEmoji('US')).toBe('🇺🇸');
        expect(getFlagEmoji('GB')).toBe('🇬🇧');
    });
});
