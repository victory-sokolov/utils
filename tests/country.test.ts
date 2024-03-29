import { getCountryFromISO, getFlagEmoji } from '../src/country';
import { describe, it, expect } from 'vitest';

describe('getCountryFromISO', () => {
    it('should return the country name for a valid ISO code', () => {
        expect(getCountryFromISO('US')).toBe('United States');
        expect(getCountryFromISO('GB')).toBe('United Kingdom');
    });
});

describe('getFlagEmoji', () => {
    it('should return the flag emoji for a valid country code', () => {
        expect(getFlagEmoji('US')).toBe('🇺🇸');
        expect(getFlagEmoji('GB')).toBe('🇬🇧');
    });

});
