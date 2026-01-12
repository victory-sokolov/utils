# @vsokolov/utils

[![Documentation](https://img.shields.io/badge/docs-TypeDoc-blue)](https://victory-sokolov.github.io/utils/)
[![NPM version](https://img.shields.io/npm/v/@vsokolov/utils)](https://www.npmjs.com/package/@victory-sokolov/utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/@vsokolov/utils)](https://www.npmjs.com/package/@vsokolov/utils)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/victory-sokolov/utils)

A comprehensive collection of TypeScript/JavaScript utility functions for both Node.js and browser environments. This library provides a wide range of helper functions for common programming tasks, including array manipulation, date handling, string operations, and more.

## Features

- **Array Utilities**: Flatten, sort, filter, and manipulate arrays with ease
- **Date/Time Handling**: Comprehensive date parsing, formatting, and manipulation
- **String Operations**: Common string manipulation and validation functions
- **Type Checking**: Type-safe type checking utilities
- **Object Manipulation**: Deep cloning, merging, and property manipulation
- **Browser & Node.js Support**: Works in both environments
- **Fully Typed**: Written in TypeScript with full type definitions
- **Tree-shakeable**: Only include what you use in your bundle

## Installation

Using npm:

```bash
npm install @vsokolov/utils
```

Using yarn:

```bash
yarn add @vsokolov/utils
```

Using pnpm:

```bash
pnpm add @vsokolov/utils
```

## Usage

### Importing

You can import the entire library:

```typescript
import * as utils from '@vsokolov/utils';
```

Or import individual functions for better tree-shaking:

```typescript
import { flattenArray, formatDate, isString } from '@vsokolov/utils';
```

### Examples

#### Array Utilities

```typescript
import { flattenArray, sortBy, unique } from '@vsokolov/utils';

// Flatten nested arrays
const nested = [1, [2, [3, [4]], 5]];
const flat = flattenArray(nested); // [1, 2, 3, 4, 5]

// Get unique values
const duplicates = [1, 2, 2, 3, 3, 3];
const uniqueValues = unique(duplicates); // [1, 2, 3]

// Sort array of objects
const users = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Doe', age: 35 }
];
const sortedUsers = sortBy(users, 1, 'age'); // Sort by age in ascending order
```

#### Date Utilities

```typescript
import { formatDate, getMonthList, timeAgo } from '@vsokolov/utils';

// Format date
const today = new Date();
const formatted = formatDate(today); // '2023-06-30'

// Time ago
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const timeSince = timeAgo(yesterday); // '1 day ago'

// Get month names
const months = getMonthList(); // ['January', 'February', ...]
```

#### String Utilities

```typescript
import { isEmail, slugify, truncate } from '@vsokolov/utils';

// Truncate string
truncate('This is a long string', 10); // 'This is a...'

// Create URL-friendly slug
slugify('Hello World!'); // 'hello-world'

// Validate email
const isValid = isEmail('test@example.com'); // true
```

## API Reference

### Array

- `flattenArray<T>(array: T[]): T[]` - Flatten nested arrays
- `unique<T>(array: T[]): T[]` - Get unique values from array
- `sortBy(arr: Record<string, any>[], order: 1 | -1, key: string)` - Sort array of objects by key
- `removeItem<T>(array: T[], values: T[]): T[]` - Remove items from array
- `randomItem<T>(array: T[], count: number): T[]` - Get random items from array
- `intersection<T>(arr1: T[], arr2: T[]): T[]` - Get intersection of two arrays
- `countBy(array: Array<number | string>): Record<string, number>` - Count occurrences of each value

### Date

- `formatDate(date?: Date): string` - Format date as YYYY-MM-DD
- `timeAgo(date: Date): string` - Get time ago string (e.g., "2 hours ago")
- `getMonthList(): string[]` - Get list of month names
- `timeStamptToDate(timestamp: string | number): string` - Convert timestamp to date string
- `dateTimeToCron(date: Date): string` - Convert Date to cron syntax
- `cronToDateTime(cronSyntax: string): Date` - Convert cron syntax to Date

### String

- `truncate(str: string, maxLength: number, suffix = '...'): string` - Truncate string with ellipsis
- `slugify(str: string): string` - Convert string to URL-friendly slug
- `camelToKebab(str: string): string` - Convert camelCase to kebab-case
- `kebabToCamel(str: string): string` - Convert kebab-case to camelCase

### Object

- `deepClone<T>(obj: T): T` - Deep clone an object
- `mergeDeep(target: object, ...sources: object[]): object` - Deep merge objects
- `pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>` - Pick properties from object
- `omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>` - Omit properties from object

### Type Checking

- `isString(value: any): value is string`
- `isNumber(value: any): value is number`
- `isObject(value: any): value is object`
- `isArray(value: any): value is any[]`
- `isFunction(value: any): value is Function`
- `isPromise(value: any): value is Promise<any>`
- `isEmail(value: string): boolean`
- `isUrl(value: string): boolean`

## Browser Support

This library supports all modern browsers and Node.js 14+. For older browsers, you may need to include polyfills for:

- `Array.prototype.flat` (or use the provided `flattenArray` function)
- `Object.entries`
- `Object.values`
- `Promise`
- `URL` and `URLSearchParams`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this library useful, please consider giving it a ⭐️ on [GitHub](https://github.com/victory-sokolov/utils).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes in each version.
