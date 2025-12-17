import type { MonthName } from './types';

/**
 * Get month names as a list of strings
 * @returns Month array
 */
export const getMonthList = () => {
    return Array.from({ length: 12 }, (_, i): MonthName => {
        return new Date(0, i).toLocaleString('en-US', {
            month: 'long',
        }) as MonthName;
    });
};

/**
 * Convert timestamp to date format
 * @param timestamp Timestamp in string or number type
 * @returns Formatted date from timestamp
 */
export const timeStamptToDate = (timestamp: string | number) => {
    const date = new Date(Number(timestamp));
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Format date to YY-MM-DD format
 * @param date
 * @returns YY-MM-DD string
 */
export const formatDate = (date?: Date): string | undefined => {
    if (!date) return;
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Convert Date to date with timestamp separated with dashes
 * @param date Date to convert
 * @returns Date with timestamp
 */
export const dateWithTimeStamp = (date: Date): string => {
    return date.toJSON().slice(0, 19).replace('T', '-').replaceAll(':', '-');
};

/**
 * Get last day of the week
 * @param date Date to get the last day of the week from
 * @returns Last day of the week
 */
export const getWeekLastDay = (date: Date): Date => {
    const weekLastDayInMilliseconds
        = date.getTime() + (6 - date.getDay()) * 86400000;
    const weekLastDay = new Date(weekLastDayInMilliseconds);
    return weekLastDay;
};

/**
 * Get first day of the week
 * @param date Date to get first day of the week from
 * @returns First day of the week
 */
export const getWeekFirstDay = (date: Date): Date => {
    const weekFirstDayInMilliseconds
        = date.getTime() - (date.getDay() - 1) * 86400000;
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
    const monthLastDayInMilliseconds = monthNextFirstDay.getTime() - 86400000;
    const monthLastDay = new Date(monthLastDayInMilliseconds);
    return monthLastDay;
};

/**
 * Get first day of the month
 * @param date Date to get first day of the month
 * @returns First day of the month
 */
export const getMonthFirstDay = (date: Date) => {
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
        throw new Error(`Invalid date provided`);
    }
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
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
export const cronToDateTime = (cronSyntax: string): Date => {
    const [minutes, hours, days, months, dayOfWeek] = cronSyntax.split(' ');

    const now = new Date();
    const currentYear = now.getUTCFullYear();

    const nextDate = new Date(
        Date.UTC(
            currentYear,
            Number(months) - 1,
            Number(days === '*' ? '1' : days),
            Number(hours),
            Number(minutes),
            0
        )
    );

    // Calculate day of the week adjustment
    const dayDiff = (Number(dayOfWeek) - nextDate.getUTCDay() + 7) % 7;
    nextDate.setUTCDate(nextDate.getUTCDate() + dayDiff);

    // Ensure the next date is in the future
    if (nextDate.getTime() <= now.getTime()) {
        nextDate.setUTCFullYear(currentYear + 1);
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
export const dateRangeGenerator = function* (
    start: Date,
    end: Date,
    step: number = 1
) {
    const d = start;
    while (d < end) {
        yield new Date(d);
        d.setDate(d.getDate() + step);
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
export const timeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return `${interval} years ago`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return `${interval} months ago`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return `${interval} days ago`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return `${interval} hours ago`;
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return `${interval} minutes ago`;
    }

    if (seconds < 10) return 'just now';

    return `${Math.floor(seconds)} seconds ago`;
};

/**
 * Get timezone from language string
 * @param lang
 * @returns Timezone
 */
export const getTimeZone = (lang: string): string => {
    const options = Intl.DateTimeFormat(lang).resolvedOptions();
    return options.timeZone;
};

/**
 * Get current timestamp
 * @returns timestamp
 */
export const timestamp = () => +Date.now();

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
    let utcDate = new Date();
    if (typeof date === 'string') {
        utcDate = new Date(date);
    } else {
        utcDate = new Date(date.getTime());
    }

    // Check if the date is valid
    if (Number.isNaN(utcDate.getTime())) {
        throw new TypeError('Invalid date string provided');
    }

    return utcDate.toISOString();
};
