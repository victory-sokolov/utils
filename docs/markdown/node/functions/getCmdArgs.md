[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / getCmdArgs

# Function: getCmdArgs()

> **getCmdArgs**(): `string`[]

Defined in: [utils.ts:10](https://github.com/victory-sokolov/utils/blob/08d23dd0d2e8c303e8548e693cf0af41a35a3482/src/node/utils.ts#L10)

Get CMD arguments
Example:
node my-script.js --name=John --age=30
getCmdArgs(); // ['--name=John', '--age=30']

## Returns

`string`[]

CMD args
