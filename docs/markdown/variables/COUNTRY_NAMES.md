[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / COUNTRY\_NAMES

# Variable: COUNTRY\_NAMES

> `const` **COUNTRY\_NAMES**: `Record`\<`string`, `string`\>

Defined in: [countries.ts:11](https://github.com/victory-sokolov/utils/blob/2c4cc43a8b863a0ab511d642adc1b93c4bf812c5/src/countries.ts#L11)

COUNTRY_NAMES

Mapping of ISO 3166-1 alpha-2 country codes to human-readable country names.
Use this list when a deterministic, local mapping is needed instead of
relying on the runtime `Intl` APIs. Keys are upper-case two-letter codes.

Example:
COUNTRY_NAMES['US'] === 'United States'
