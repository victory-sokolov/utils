[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / zip

# Function: zip()

> **zip**\<`T`\>(...`arrays`): `T`[]

Defined in: [array.ts:391](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/array.ts#L391)

Zip multiple arrays together into an array of tuples

## Type Parameters

### T

`T` *extends* readonly `unknown`[]

## Parameters

### arrays

...\{ \[K in string \| number \| symbol\]: readonly T\[K\<K\>\]\[\] \}

Arrays to zip together

## Returns

`T`[]

Array of tuples where each tuple contains one element from each input array

## Example

```ts
zip([1, 2, 3], ['a', 'b', 'c']) // [[1, 'a'], [2, 'b'], [3, 'c']]
zip([1, 2], ['a', 'b'], [true, false]) // [[1, 'a', true], [2, 'b', false]]
```
