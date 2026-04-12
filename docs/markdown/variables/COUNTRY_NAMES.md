[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / COUNTRY\_NAMES

# Variable: COUNTRY\_NAMES

> `const` **COUNTRY\_NAMES**: `Record`\<`string`, `string`\>

Defined in: [countries.ts:11](https://github.com/victory-sokolov/utils/blob/c3dab124e97a1ab467fbdd458a80cbc8c287df05/src/countries.ts#L11)

COUNTRY_NAMES

Mapping of ISO 3166-1 alpha-2 country codes to human-readable country names.
Use this list when a deterministic, local mapping is needed instead of
relying on the runtime `Intl` APIs. Keys are upper-case two-letter codes.

Example:
COUNTRY_NAMES['US'] === 'United States'
