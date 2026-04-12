[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / pipe

# Function: pipe()

## Call Signature

> **pipe**\<`FirstFn`, `F`\>(`arg`, `firstFn`, ...`fns`): [`LastFnReturnType`](../types/_internal_.LastFnReturnType.md)\<`F`, `ReturnType`\<`FirstFn`\>\>

Defined in: [function.ts:61](https://github.com/victory-sokolov/utils/blob/65f11a56369c99065554109006908574974c4ac4/src/function.ts#L61)

Composes functions from left to right, passing the result of each function to the next.

### Type Parameters

#### FirstFn

`FirstFn` *extends* [`AnyFunc`](../types/AnyFunc.md)\<`unknown`[], `unknown`\>

The first function in the pipeline

#### F

`F` *extends* [`AnyFunc`](../types/AnyFunc.md)\<`unknown`[], `unknown`\>[]

Array of subsequent functions to compose

### Parameters

#### arg

[`ParametersOf`](../types/_internal_.ParametersOf.md)\<`FirstFn`\>\[`0`\]

Initial value to pass to the first function (omit if first function takes no arguments)

#### firstFn

`FirstFn`

The first function to execute (or can be the only argument if it takes no parameters)

#### fns

...`F`

Additional functions to compose, where each function receives the return value of the previous function

### Returns

[`LastFnReturnType`](../types/_internal_.LastFnReturnType.md)\<`F`, `ReturnType`\<`FirstFn`\>\>

The return value of the last function in the pipeline

### Examples

```ts
With initial argument
const addTwo = (x: number) => x + 2;
const multiplyByThree = (x: number) => x * 3;
pipe(5, addTwo, multiplyByThree); // Returns 21: (5 + 2) * 3
```

```ts
Without initial argument (first function takes no parameters)
const getValue = () => 10;
const double = (x: number) => x * 2;
pipe(getValue, double); // Returns 20
```

## Call Signature

> **pipe**\<`FirstFn`, `F`\>(`firstFn`, ...`fns`): [`LastFnReturnType`](../types/_internal_.LastFnReturnType.md)\<`F`, `ReturnType`\<`FirstFn`\>\>

Defined in: [function.ts:68](https://github.com/victory-sokolov/utils/blob/65f11a56369c99065554109006908574974c4ac4/src/function.ts#L68)

Composes functions from left to right, passing the result of each function to the next.

### Type Parameters

#### FirstFn

`FirstFn` *extends* () => `unknown`

The first function in the pipeline

#### F

`F` *extends* [`AnyFunc`](../types/AnyFunc.md)\<`unknown`[], `unknown`\>[]

Array of subsequent functions to compose

### Parameters

#### firstFn

`FirstFn`

The first function to execute (or can be the only argument if it takes no parameters)

#### fns

...`F`

Additional functions to compose, where each function receives the return value of the previous function

### Returns

[`LastFnReturnType`](../types/_internal_.LastFnReturnType.md)\<`F`, `ReturnType`\<`FirstFn`\>\>

The return value of the last function in the pipeline

### Examples

```ts
With initial argument
const addTwo = (x: number) => x + 2;
const multiplyByThree = (x: number) => x * 3;
pipe(5, addTwo, multiplyByThree); // Returns 21: (5 + 2) * 3
```

```ts
Without initial argument (first function takes no parameters)
const getValue = () => 10;
const double = (x: number) => x * 2;
pipe(getValue, double); // Returns 20
```
