[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / toDollars

# Function: toDollars()

> **toDollars**(`cents`, `currency?`, `locale?`): `string`

Defined in: [currency.ts:17](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/currency.ts#L17)

Convert cents to dollars

## Parameters

### cents

`number`

Number of cents

### currency?

[`Currency`](../types/_internal_.Currency.md) = `'USD'`

### locale?

`string` = `'en-US'`

## Returns

`string`

Currency formatted to dollars

## Example

```ts
toDollars(1000); // '$10.00'
```
