[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / getCmdArgs

# Function: getCmdArgs()

> **getCmdArgs**(): `string`[]

Defined in: [utils.ts:10](https://github.com/victory-sokolov/utils/blob/f15da8f6aa5988652bf061bf72db9cb74604095a/src/node/utils.ts#L10)

Get CMD arguments
Example:
node my-script.js --name=John --age=30
getCmdArgs(); // ['--name=John', '--age=30']

## Returns

`string`[]

CMD args
