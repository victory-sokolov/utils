type MonthName =
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
type DeviceType = 'Mobile' | 'Desktop';
type CameraEnvironment = 'environment' | 'user';

type RecordObject<Keys extends string | number | symbol = string, Value = unknown> = {
    [Prop in Keys]: Value;
};
type Collection<T> = Array<T>;
type IndexCallback<T = unknown> = (value: T, index: number, obj: T[]) => unknown;

type ImageDimension = {
    width: number;
    height: number;
};

declare const flattenArray: <T>(listOfArrays: readonly T[]) => readonly T[];
declare const unique: <T>(array: readonly T[]) => Collection<T>;
declare const removeItem: <T>(array: Collection<T>, values: T[]) => Collection<T>;
declare const randomItem: <T>(arr: T[], count: number) => T[];
declare const shuffleArray: <T>(arr: Collection<T>) => Collection<T>;
declare const sortAsc: <T extends Record<string, T>>(array: readonly T[]) => readonly T[];
declare const sort: (arr?: Array<Record<string, unknown>>, fSorting?: any) => Record<string, unknown>[];
declare const sortBy: (arr?: Array<RecordObject>, order?: number, key?: string) => Record<string, unknown>[];
declare const insertItemAtIndex: <T>(index: number | IndexCallback<T>, value: T, arr?: T[] | null | undefined) => T[];
declare const replaceItemAtIndex: <T>(index: number | IndexCallback<T>, newValue: T, arr?: T[] | null | undefined) => T[];
declare const removeItemAtIndex: <T>(index: number | IndexCallback<T>, arr?: T[] | null | undefined) => T[];
declare const median: (arr: number[]) => number;
declare const intersection: <T>(arr1: T[], arr2: T[]) => T[];
declare const countBy: (array: Array<number | string>) => Record<string, number>;
declare const occurrenceCount: <T>(data: T[]) => any;

declare const wait: (ms: number) => Promise<void>;
declare const perfStart: () => number;
declare const perfStop: (startTime: number) => void;
declare const bytesToSize: (bytes: number) => string;

declare const dataToFile: (content: ArrayBuffer, fileName: string, contentType: string) => void;
declare const detectDeviceType: () => DeviceType;
declare const isMobileDevice: () => boolean;
declare const getOs: () => string;
declare const downloadAsJson: (obj: Record<string, unknown>, fileName: string) => void;
declare const isPageReloaded: () => boolean;

declare const cameraEnvironment: () => CameraEnvironment;
declare const getVideoConstraint: () => any;
declare const startCamera: (isStreaming: boolean, video: HTMLVideoElement) => Promise<void>;
declare const stopCamera: (stream: MediaStream, isStreaming: boolean) => void;

declare const $: (selector: string, context?: Document | HTMLElement) => HTMLElement | null;
declare const $$: (selector: string, context?: Document | HTMLElement) => NodeListOf<HTMLElement>;
declare const style: (el: HTMLElement, styles: {
    [key: string]: string;
}) => void;
declare const addClass: (el: HTMLElement, ...classArgs: string[]) => void;
declare const removeClass: (el: HTMLElement, ...classArgs: string[]) => void;
declare const insertBefore: (node: HTMLElement, beforeNode: HTMLElement) => Element | null;
declare const insertAfter: (node: HTMLElement, afterNode: HTMLElement) => Element | null;
declare const prepend: (node: HTMLElement, preNode: HTMLElement) => Element | null;

declare const getImageDimensions: (dataUrl: string) => Promise<ImageDimension>;
declare const setBase64Img: (imageData: string) => string;
declare const fileToBase64: (file: Blob) => void;

declare const getCountryFromISO: (iso: string) => string | undefined;
declare const getFlagEmoji: (countryCode: string) => string;

declare const getMonthList: () => MonthName[];
declare const dateWithTimeStamp: (date: Date) => string;
declare const getWeekLastDay: (date: Date) => Date;
declare const getWeekFirstDay: (date: Date) => Date;
declare const getMonthLastDay: (date: Date) => Date;
declare const getMonthFirstDay: (date: Date) => Date;
declare const isWeekday: (date: Date) => boolean;
declare const toLongDate: (date: string) => string;

type AnyFunc = (...arg: any) => any;
type PipeArgs<F extends AnyFunc[], Acc extends AnyFunc[] = []> = F extends [(...args: infer A) => infer B] ? [...Acc, (...args: A) => B] : F extends [(...args: infer A) => any, ...infer Tail] ? Tail extends [(arg: infer B) => any, ...any[]] ? PipeArgs<Tail, [...Acc, (...args: A) => B]> : Acc : Acc;
type LastFnReturnType<F extends Array<AnyFunc>, Else = never> = F extends [...any[], (...arg: any) => infer R] ? R : Else;
declare const batchInvoke: (functions: Array<() => void>) => void;
declare const pipe: (...fns: Array<Function>) => any;
declare const applyPipe: <FirstFn extends AnyFunc, F extends AnyFunc[]>(arg: Parameters<FirstFn>[0], firstFn: FirstFn, ...fns: PipeArgs<F, []> extends F ? F : PipeArgs<F, []>) => LastFnReturnType<F, ReturnType<FirstFn>>;
declare const isAsync: (fn: Function) => boolean;

declare const removeHtmlTags: (text: string) => string;
declare const removeInlineStyles: (text: string) => string;
declare const escape: (str: string) => string;
declare const unescape: (str: string) => string;

declare const toString: (v: any) => any;
declare const isDef: <T = any>(val?: T | undefined) => val is T;
declare const isBoolean: (val: any) => val is boolean;
declare const isFunction: <T extends Function>(val: any) => val is T;
declare const isNumber: (val: any) => val is number;
declare const isString: (val: unknown) => val is string;
declare const isObject: (val: any) => val is object;
declare const isUndefined: (val: any) => val is undefined;
declare const isNull: (val: any) => val is null;
declare const isRegExp: (val: any) => val is RegExp;
declare const isDate: (val: any) => val is Date;
declare const isJsObject: (val: any) => boolean;
declare const isHtmlElement: (element: Element) => boolean;
declare const hasProperty: (obj: any, key: string) => boolean;
declare const isWindow: (val: any) => boolean;
declare const isBrowser: boolean;

declare const rangeParser: (range: string) => number[];
declare const addZero: (num: number) => string;
declare const getRandomNumber: (min: number, max: number) => number;

declare const omit: <T extends RecordObject<string, unknown>, K extends keyof T>(obj: T, ...props: K[]) => Omit<T, K>;
declare const pick: <T extends RecordObject<string, unknown>, K extends keyof T>(obj: T, ...props: K[]) => Pick<T, K>;
declare const flattenObject: (obj: RecordObject) => RecordObject;
declare const filterFalsyFromObject: <T extends RecordObject<string, unknown>>(obj: T) => RecordObject;
declare const unionWithExclusion: (left: RecordObject, right: RecordObject) => RecordObject;
declare const flip: (data: RecordObject) => RecordObject;

declare const camelCase: (str: string) => string;
declare const pascalCase: (str: string, separator?: string) => string;
declare const kebabCase: (str: string) => string;
declare const escapeHtml: (unsafe: string) => string;
declare const removeZeroWidthSpace: (str: string) => string;
declare const endsWithAny: (data: string, items: string[]) => boolean;
declare const startsWithAny: (data: string, items: string[]) => boolean;
declare const isValidUUID: (id: string) => boolean;
declare const randomHexColorCode: () => string;
declare const randomStr: (len?: number, prefix?: string) => string;
declare const slugify: (text: string) => string;
declare const capitalize: (str: string) => string;
declare const truncate: (str: string, length: number) => string;
declare const maskString: (str: string) => string;

declare const addTrailingSlash: (url: string) => string;

declare const isValidEmail: (email: string) => boolean;
declare const isValidIPV4: (ip: string) => boolean;
declare const isValidIPV6: (ip: string) => boolean;
declare const isValidUrl: (url: string) => boolean;
declare const trimNewLines: (s: string) => string;

declare const hashString: (str: string, iterations?: number, keyLen?: number, digest?: string) => {
    salt: string;
    hash: string;
    iterations: number;
    keyLen: number;
};
declare const validateHash: (password: string, savedHash: string, savedSalt: string, iterations: number, keyLen: number, digest: string) => boolean;

declare const readdirRecursive: (dir: string, fileList?: string[]) => Promise<string[]>;
declare const isFileExists: (path: string) => Promise<boolean>;

declare const cache: {
    set(key: any, value: any): void;
    has(key: any): boolean;
    get(key: any): any;
    remove(key: any): void;
};

export { $, $$, addClass, addTrailingSlash, addZero, applyPipe, batchInvoke, bytesToSize, cache, camelCase, cameraEnvironment, capitalize, countBy, dataToFile, dateWithTimeStamp, detectDeviceType, downloadAsJson, endsWithAny, escape, escapeHtml, fileToBase64, filterFalsyFromObject, flattenArray, flattenObject, flip, getCountryFromISO, getFlagEmoji, getImageDimensions, getMonthFirstDay, getMonthLastDay, getMonthList, getOs, getRandomNumber, getVideoConstraint, getWeekFirstDay, getWeekLastDay, hasProperty, hashString, insertAfter, insertBefore, insertItemAtIndex, intersection, isAsync, isBoolean, isBrowser, isDate, isDef, isFileExists, isFunction, isHtmlElement, isJsObject, isMobileDevice, isNull, isNumber, isObject, isPageReloaded, isRegExp, isString, isUndefined, isValidEmail, isValidIPV4, isValidIPV6, isValidUUID, isValidUrl, isWeekday, isWindow, kebabCase, maskString, median, occurrenceCount, omit, pascalCase, perfStart, perfStop, pick, pipe, prepend, randomHexColorCode, randomItem, randomStr, rangeParser, readdirRecursive, removeClass, removeHtmlTags, removeInlineStyles, removeItem, removeItemAtIndex, removeZeroWidthSpace, replaceItemAtIndex, setBase64Img, shuffleArray, slugify, sort, sortAsc, sortBy, startCamera, startsWithAny, stopCamera, style, toLongDate, toString, trimNewLines, truncate, unescape, unionWithExclusion, unique, validateHash, wait };
