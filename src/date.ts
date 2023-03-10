import { MonthName } from './types/';

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
    const weekLastDayInMilliseconds = date.getTime() + (6 - date.getDay()) * 86400000;
    const weekLastDay = new Date(weekLastDayInMilliseconds);
    return weekLastDay;
};

/**
 * Get first day of the week
 * @param date Date to get first day of the week from
 * @returns First day of the week
 */
export const getWeekFirstDay = (date: Date): Date => {
    const weekFirstDayInMilliseconds = date.getTime() - (date.getDay() - 1) * 86400000;
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
