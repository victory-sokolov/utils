import type { MonthName } from './types';

/**
 * Format date to YYYY-MM-DD format
 * @param date - The date to format
 * @returns YYYY-MM-DD string or undefined if date is not provided
 */
export const formatDate = (date?: Date): string | undefined => {
    if (!date || Number.isNaN(date.getTime())) {
        return;
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Get month names as a list of strings
 * @returns Month array
 */
export const getMonthList = (): MonthName[] =>
    Array.from(
        { length: 12 },
        (_, index): MonthName =>
            new Date(0, index).toLocaleString('en-US', {
                month: 'long',
            }) as MonthName,
    );

/**
 * Convert timestamp to date format
 * @param timestamp Timestamp in string or number type
 * @returns Formatted date from timestamp
 */
export const timestampToDate = (timestamp: string | number): string =>
    formatDate(new Date(Number(timestamp))) ?? '';

/**
 * Convert Date to date with timestamp separated with dashes
 * @param date Date to convert
 * @returns Date with timestamp
 */
export const dateWithTimeStamp = (date: Date): string => {
    const json = date.toJSON();
    if (!json) throw new TypeError('Invalid date provided');
    return json.slice(0, 19).replace('T', '-').replaceAll(':', '-');
};

/**
 * Get last day of the week
 * @param date Date to get the last day of the week from
 * @returns Last day of the week
 */
export const getWeekLastDay = (date: Date): Date => {
    const weekLastDayInMilliseconds = date.getTime() + (6 - date.getDay()) * 86_400_000;
    const weekLastDay = new Date(weekLastDayInMilliseconds);
    return weekLastDay;
};

/**
 * Get first day of the week
 * @param date Date to get first day of the week from
 * @returns First day of the week
 */
export const getWeekFirstDay = (date: Date): Date => {
    const weekFirstDayInMilliseconds = date.getTime() - (date.getDay() - 1) * 86_400_000;
    const weekFirstDay = new Date(weekFirstDayInMilliseconds);
    return weekFirstDay;
};

/**
 * Get last day of the month
 * @param date Date to get the last day of the month
 * @returns Last day of the month
 */
export const getMonthLastDay = (date: Date): Date => {
    const monthNextFirstDay = new Date(date.getFullYear(), date.getMonth() + 1);
    const monthLastDayInMilliseconds = monthNextFirstDay.getTime() - 86_400_000;
    const monthLastDay = new Date(monthLastDayInMilliseconds);
    return monthLastDay;
};

/**
 * Get first day of the month
 * @param date Date to get first day of the month
 * @returns First day of the month
 */
export const getMonthFirstDay = (date: Date): Date => {
    const monthFirstDay = new Date(date.getFullYear(), date.getMonth());
    return monthFirstDay;
};

/**
 * Check if date is weekday
 * @param date Date to check
 * @returns true if date is weekday
 */
export const isWeekday = (date: Date): boolean => date.getDay() % 6 !== 0;

/**
 * Convert date to long date format
 * @param date Date to long date format
 * @returns Long date format
 */
export const toLongDate = (date: string): string => {
    if (!Date.parse(date)) {
        throw new Error(`Invalid date provided: ${date}`);
    }
    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

/**
 * Converts datetime to cron like syntax
 * @param date
 * @returns Cron style date time
 */
export const dateTimeToCron = (date: Date): string => {
    const minutes = date.getUTCMinutes();
    const hours = date.getUTCHours();
    const days = date.getUTCDate();
    const months = date.getUTCMonth() + 1;
    const dayOfWeek = date.getUTCDay();

    return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
};

/**
 * Convert cront like syntax "34 12 18 8 5" to Date object
 * @param cronSyntax
 * @returns Date object
 */
interface NormalizedCronValues {
    months: number;
    days: number;
    hours: number;
    minutes: number;
    dayOfWeek: number;
    year: number;
}

const normalizeCronValue = (value: string, defaultValue: number): number => {
    if (value === '*' || !value) return defaultValue;
    const num = Number(value);
    if (Number.isNaN(num)) return defaultValue;
    return num;
};

const createNextDate = (values: NormalizedCronValues): Date =>
    new Date(
        Date.UTC(values.year, values.months - 1, values.days, values.hours, values.minutes, 0),
    );

const adjustToDayOfWeek = (date: Date, targetDay: number): void => {
    if (targetDay === -1) return;
    date.setUTCDate(date.getUTCDate() + ((targetDay - date.getUTCDay() + 7) % 7));
};

const parseCronSyntax = (cronSyntax: string, now: Date): NormalizedCronValues => {
    const [minutes = '', hours = '', days = '', months = '', dayOfWeek = ''] =
        cronSyntax.split(' ');
    return {
        dayOfWeek: normalizeCronValue(dayOfWeek, -1),
        days: normalizeCronValue(days, 1),
        hours: normalizeCronValue(hours, 0),
        minutes: normalizeCronValue(minutes, 0),
        months: normalizeCronValue(months, now.getUTCMonth() + 1),
        year: now.getUTCFullYear(),
    };
};

export const cronToDateTime = (cronSyntax: string): Date => {
    const now = new Date();
    const values = parseCronSyntax(cronSyntax, now);
    const nextDate = createNextDate(values);

    adjustToDayOfWeek(nextDate, values.dayOfWeek);
    if (nextDate.getTime() <= now.getTime()) {
        nextDate.setUTCFullYear(nextDate.getUTCFullYear() + 1);
        adjustToDayOfWeek(nextDate, values.dayOfWeek);
    }
    return nextDate;
};

/**
 * Source: https://www.30secondsofcode.org/js/s/date-range-generator/
 * Usage: [...dateRangeGenerator(new Date('2021-06-01'), new Date('2021-06-04'))];
 * Generates dates in the given range
 * @param start
 * @param end
 * @param step
 * @returns Date range
 */
export const dateRangeGenerator = function* dateRangeGenerator(
    start: Date,
    end: Date,
    step = 1,
): Generator<Date> {
    let currentDateMs = start.getTime();
    const endMs = end.getTime();
    while (currentDateMs < endMs) {
        yield new Date(currentDateMs);
        currentDateMs += step * 86_400_000;
    }
};

/**
 * Convery days to seconds
 * @param days Days to convert to seconds
 * @returns Seconds in provided number of months
 */
export const secondsInDays = (days: number): number => {
    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;

    const secondsInMonth = days * secondsInDay;
    return secondsInMonth;
};

/**
 * Convert DateTime object to time ago string
 * @param date
 * @return Time ago string from Date object
 */
const TIME_INTERVALS: [number, string, string][] = [
    [31_536_000, 'year', 'years'],
    [2_592_000, 'month', 'months'],
    [86_400, 'day', 'days'],
    [3600, 'hour', 'hours'],
    [60, 'minute', 'minutes'],
];

export const timeAgo = (date: Date): string => {
    const seconds = Math.floor((Date.now() - date.valueOf()) / 1000);
    for (const [divisor, singular, plural] of TIME_INTERVALS) {
        const interval = Math.floor(seconds / divisor);
        if (interval >= 1) {
            if (interval === 1) {
                return `${interval} ${singular} ago`;
            }
            return `${interval} ${plural} ago`;
        }
    }
    if (seconds < 10) return 'just now';
    return `${seconds} seconds ago`;
};

/**
 * Get timezone from language string
 * @param lang
 * @returns Timezone
 */
export const getTimeZone = (lang: string): string => {
    const options = new Intl.DateTimeFormat(lang).resolvedOptions();
    return options.timeZone;
};

/**
 * Get current timestamp
 * @returns timestamp
 */
export const timestamp = (): number => Date.now();

/**
 * Get current ISO timestamp (2025-01-26T12:42:00.123Z")
 * @returns ISO timestamp string
 */
export const timestampIso = new Date().toISOString();

/**
 * Convert date to utc format
 * @param date Date as string or Date object
 * @returns UTC formatted date string
 */
export const toUtc = (date: string | Date): string => {
    const utcDate = new Date(date);

    // Check if the date is valid
    if (Number.isNaN(utcDate.getTime())) {
        throw new TypeError('Invalid date string provided');
    }

    return utcDate.toISOString();
};
