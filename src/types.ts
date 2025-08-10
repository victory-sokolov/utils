export type MonthName
    = | 'January'
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
export type DeviceType = 'Mobile' | 'Desktop';
export type CameraEnvironment = 'environment' | 'user';

/**
 * Function type
 */
export type Fn<T = void> = () => T;

/**
 * Infers the element type of an array
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never;

export type RecordObject<Keys extends string | number | symbol = string, Value = unknown> = {
    [Prop in Keys]: Value;
};
export type Collection<T> = Array<T>;
export type Callable = <T>(...params: Collection<T>) => T;
export type IndexCallback<T = unknown> = (value: T, index: number, obj: T[]) => unknown;

export interface ImageDimension {
    width: number;
    height: number;
}

export type NonNegativeInteger<T extends number> = number extends T
    ? never
    : `${T}` extends `-${string}` | `${string}.${string}`
        ? never
        : T;

export type Maybe<T> = T | null | undefined;

/**
 * Prettify nested objects
 */
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & object;

/**
 * Fetch response type
 */
export type FetchResponse<T>
    = | {
        statusCode: number;
        data: T;
        error: null;
    }
    | {
        statusCode: number | null;
        data: T | null;
        error: Error;
    };
