export type MonthName =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';

/**
 * Function type
 */
export type Fn<T = void> = () => T;

/**
 * Infers the element type of an array
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never;

/**
 * A record object with flexible key and value types
 */
export type RecordObject<Keys extends string | number | symbol = string, Value = unknown> = Record<
    Keys,
    Value
>;

/**
 * Collection type alias for arrays
 */
export type Collection<T> = T[];

/**
 * Callable type for functions
 */
export type Callable = <T>(...params: Collection<T>) => T;

/**
 * Callback function type for array operations
 */
export type IndexCallback<T = unknown> = (value: T, index: number, obj: T[]) => unknown;

/**
 * Type to ensure a number is non-negative
 */
export type NonNegativeInteger<T extends number> = number extends T
    ? never
    : `${T}` extends `-${string}` | `${string}.${string}`
      ? never
      : T;

/**
 * Type representing a value that can be null or undefined
 */
export type Maybe<T> = T | null | undefined;

/**
 * Prettify nested objects by flattening the type intersection
 */
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & object;

/**
 * Type representing either a successful or failed fetch response
 */
export type FetchResponse<T> =
    | {
          statusCode: number;
          data: T;
          error: null;
      }
    | {
          statusCode: number | null;
          data: T | null;
          error: Error;
      };

/**
 * Constructs a type by excluding `null` and `undefined` from a given type `T`.
 *
 * @template T - The source type which may include `null` and/or `undefined`
 *
 * @example
 * // With optional properties
 * interface User {
 *   name: string;
 *   email?: string | null;
 * }
 * type RequiredEmail = NonNullable<User['email']>; // string
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * HTTP/HTTPS URL type
 */
export type URL = `${'http' | 'https'}://${string}`;
