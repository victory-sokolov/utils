import { describe, expect, it } from 'vitest';
import {
    cronToDateTime,
    dateRangeGenerator,
    dateTimeToCron,
    dateWithTimeStamp,
    formatDate,
    getMonthFirstDay,
    getMonthLastDay,
    getMonthList,
    getTimeZone,
    getWeekFirstDay,
    getWeekLastDay,
    isWeekday,
    secondsInDays,
    timeAgo,
    timestamp,
    timestampIso,
    timeStamptToDate,
    toLongDate,
    toUtc,
} from '../src/date';

describe('test date utils', () => {
    describe('getMonthList', () => {
        it('month names', () => {
            expect(getMonthList()).toEqual([
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ]);
        });
    });

    describe('dateWithTimeStamp', () => {
        it('date with timestamp', () => {
            const date = new Date(Date.UTC(2022, 11, 30, 13, 30, 30));
            expect(dateWithTimeStamp(date)).toBe('2022-12-30-13-30-30');
        });
    });

    describe('getWeekLastDay', () => {
        it('last day of week', () => {
            expect(getWeekLastDay(new Date(2022, 11, 30)).getTime()).toBe(
                new Date(2022, 11, 31).getTime(),
            );
        });
    });

    describe('getWeekFirstDay', () => {
        it('first day of week', () => {
            expect(getWeekFirstDay(new Date(2022, 11, 30)).getTime()).toBe(
                new Date(2022, 11, 26).getTime(),
            );
        });
    });

    describe('getMonthLastDay', () => {
        it('last day of month', () => {
            expect(getMonthLastDay(new Date(2022, 11, 30)).getTime()).toBe(
                new Date(2022, 11, 31).getTime(),
            );
        });
    });

    describe('getMonthFirstDay', () => {
        it('first day of month', () => {
            expect(getMonthFirstDay(new Date(2022, 11, 30)).getTime()).toBe(
                new Date(2022, 11, 1).getTime(),
            );
        });
    });

    describe('isWeekday', () => {
        it('weekday', () => {
            expect(isWeekday(new Date(2022, 11, 28))).toBe(true);
        });

        it('weekend', () => {
            expect(isWeekday(new Date(2022, 11, 5))).toBe(true);
            expect(isWeekday(new Date(2022, 11, 10))).toBe(false);
        });
    });

    describe('toLongDate', () => {
        it('should return a long date string in the format of Month Day, Year', () => {
            expect(toLongDate('2022-01-01')).toBe('January 1, 2022');
        });

        it('toLongDate throws an error for an invalid date', () => {
            const date = "invalid date";
            expect(() => {
                toLongDate(date);
            }).toThrow(`Invalid date provided: ${date}`);
        });
    });

    describe('dateTimeToCron', () => {
        it('returns the correct cron format', () => {
            const testDate = new Date('2023-08-18T12:34:00Z');
            const expectedCronFormat = '34 12 18 8 5';
            const result = dateTimeToCron(testDate);

            expect(result).toBe(expectedCronFormat);
        });
    });

    describe('cronToDateTime', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('should return the correct next date for a future cron expression', () => {
            // Set current time to August 1, 2023, 10:00:00 UTC
            vi.setSystemTime(new Date('2023-08-01T10:00:00Z'));

            // Cron for August 18, 2023, 12:34:00 UTC (Friday, dayOfWeek 5)
            const cronExpression = '34 12 18 8 5';
            const expectedNextDate = new Date('2023-08-18T12:34:00Z');

            const result = cronToDateTime(cronExpression);
            expect(result.toISOString()).toBe(expectedNextDate.toISOString());
        });

        it('should adjust to the next year if the calculated date is in the past', () => {
            // Set current time to August 20, 2023, 10:00:00 UTC
            vi.setSystemTime(new Date('2023-08-20T10:00:00Z'));

            // Cron for August 18, 2023, 12:34:00 UTC (Friday, dayOfWeek 5)
            // This date is in the past relative to system time, so it should be adjusted to next year.
            const cronExpression = '34 12 18 8 5';
            const expectedNextDate = new Date('2024-08-18T12:34:00Z'); // Adjusted to next year

            const result = cronToDateTime(cronExpression);
            expect(result.toISOString()).toBe(expectedNextDate.toISOString());
        });

        it('should correctly handle day of week adjustment', () => {
            // Set current time to August 1, 2023, 10:00:00 UTC (Tuesday, dayOfWeek 2)
            vi.setSystemTime(new Date('2023-08-01T10:00:00Z'));

            // Cron for any day in August, 12:00:00 UTC, specifically Monday (dayOfWeek 1)
            const cronExpression = '0 12 * 8 1';
            // The first Monday in August 2023 is August 7.
            // cronToDateTime calculates 1st August, day 2. Needs to adjust to day 1.
            // 7 - 1 = 6. 1st + 6 = 7th.
            const expectedNextDate = new Date('2023-08-07T12:00:00Z');

            const result = cronToDateTime(cronExpression);
            expect(result.toISOString()).toBe(expectedNextDate.toISOString());
        });

        it('should handle different cron parts correctly', () => {
            // Set current time
            vi.setSystemTime(new Date('2023-01-01T00:00:00Z')); // Jan 1, 2023 is a Sunday (dayOfWeek 0)

            // Cron for 15:30 on the 10th day of the 3rd month (March), on a Tuesday (dayOfWeek 2)
            const cronExpression = '30 15 10 3 2';
            const expectedNextDate = new Date('2023-03-14T15:30:00Z'); // March 14, 2023 is a Tuesday

            const result = cronToDateTime(cronExpression);
            expect(result.toISOString()).toBe(expectedNextDate.toISOString());
        });
    });

    describe('timeStamptToDate', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('should convert a numeric timestamp to YYYY-MM-DD format', () => {
            const timestamp = 1672531200000; // January 1, 2023 00:00:00 UTC
            expect(timeStamptToDate(timestamp)).toBe('2023-01-01');
        });

        it('should convert a string timestamp to YYYY-MM-DD format', () => {
            const timestamp = '1672531200000'; // January 1, 2023 00:00:00 UTC
            expect(timeStamptToDate(timestamp)).toBe('2023-01-01');
        });

        it('should pad month and day with leading zeros', () => {
            const timestamp = 1672531200000; // Jan 1, 2023
            expect(timeStamptToDate(timestamp)).toBe('2023-01-01');
        });
    });

    describe('formatDate', () => {
        it('should format a valid Date object to YYYY-MM-DD format', () => {
            const date = new Date('2023-03-08T10:00:00Z');
            expect(formatDate(date)).toBe('2023-03-08');
        });

        it('should return undefined if no date is provided', () => {
            expect(formatDate(undefined)).toBeUndefined();
            expect(formatDate(null as any)).toBeUndefined();
        });

        it('should pad month and day with leading zeros', () => {
            const date = new Date('2023-01-01T00:00:00Z');
            expect(formatDate(date)).toBe('2023-01-01');
        });
    });

    describe('secondsInDays', () => {
        it('should convert days to seconds correctly', () => {
            expect(secondsInDays(1)).toBe(86400); // 1 day = 24 * 60 * 60 seconds
            expect(secondsInDays(5)).toBe(432000); // 5 days
            expect(secondsInDays(0)).toBe(0);
        });
    });

    describe('timeAgo', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('should return "just now" for dates less than 10 seconds ago', () => {
            const now = new Date('2023-01-01T12:00:00Z');
            vi.setSystemTime(now);
            const date = new Date(now.getTime() - 5 * 1000); // 5 seconds ago
            expect(timeAgo(date)).toBe('just now');
        });

        it('should return "X seconds ago" for dates between 10 and 59 seconds ago', () => {
            const now = new Date('2023-01-01T12:00:00Z');
            vi.setSystemTime(now);
            const date = new Date(now.getTime() - 15 * 1000); // 15 seconds ago
            expect(timeAgo(date)).toBe('15 seconds ago');
        });

        it('should return "X minutes ago" for dates between 1 and 59 minutes ago', () => {
            const now = new Date('2023-01-01T12:00:00Z');
            vi.setSystemTime(now);
            const date = new Date(now.getTime() - 2 * 60 * 1000); // 2 minutes ago
            expect(timeAgo(date)).toBe('2 minutes ago');
        });

        it('should return "X hours ago" for dates between 1 and 23 hours ago', () => {
            const now = new Date('2023-01-01T12:00:00Z');
            vi.setSystemTime(now);
            const date = new Date(now.getTime() - 3 * 3600 * 1000); // 3 hours ago
            expect(timeAgo(date)).toBe('3 hours ago');
        });

        it('should return "X days ago" for dates between 1 and 29 days ago', () => {
            const now = new Date('2023-01-01T12:00:00Z');
            vi.setSystemTime(now);
            const date = new Date(now.getTime() - 4 * 86400 * 1000); // 4 days ago
            expect(timeAgo(date)).toBe('4 days ago');
        });

        it('should return "X months ago" for dates between 1 and 11 months ago', () => {
            const now = new Date('2023-01-01T12:00:00Z');
            vi.setSystemTime(now);
            const date = new Date(now.getTime() - 2 * 30 * 86400 * 1000); // Roughly 2 months ago
            expect(timeAgo(date)).toBe('2 months ago');
        });

        it('should return "X years ago" for dates 1 year or more ago', () => {
            const now = new Date('2023-01-01T12:00:00Z');
            vi.setSystemTime(now);
            const date = new Date(now.getTime() - 2 * 365 * 86400 * 1000); // Roughly 2 years ago
            expect(timeAgo(date)).toBe('2 years ago');
        });
    });

    describe('getTimeZone', () => {
        let originalIntlDateTimeFormat: typeof Intl.DateTimeFormat;

        beforeEach(() => {
            originalIntlDateTimeFormat = Intl.DateTimeFormat;
            // Mock Intl.DateTimeFormat().resolvedOptions().timeZone
            (Intl as any).DateTimeFormat = vi.fn(() => ({
                resolvedOptions: () => ({ timeZone: 'America/New_York' }),
            }));
        });

        afterEach(() => {
            Intl.DateTimeFormat = originalIntlDateTimeFormat;
            vi.restoreAllMocks();
        });

        it('should return the correct timezone for a given language', () => {
            expect(getTimeZone('en-US')).toBe('America/New_York');
            expect(Intl.DateTimeFormat).toHaveBeenCalledWith('en-US');
        });
    });

    describe('timestamp', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('should return the current timestamp', () => {
            const now = 1672531200000; // January 1, 2023 00:00:00 UTC
            vi.setSystemTime(now);
            expect(timestamp()).toBe(now);
        });
    });

    describe('timestampIso', () => {
        // timestampIso is a top-level const, so its value is determined when the module is loaded.
        // To test it with fake timers, we need to mock Date.prototype.toISOString directly before module import
        // or reload the module after setting up fake timers.
        // For simplicity and to avoid module reload complexities in vitest,
        // we'll assume a basic check of its format.
        it('should return a string in ISO 8601 format', () => {
            // This test is less precise about the exact time due to const export behavior
            // but confirms the format.
            const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
            expect(timestampIso).toMatch(isoRegex);
        });
    });

    describe('dateRangeGenerator', () => {
        it('should generate a range of dates', () => {
            const startDate = new Date('2023-08-01');
            const endDate = new Date('2023-08-05');
            const step = 1;
            const dateGenerator = dateRangeGenerator(startDate, endDate, step);

            const expectedDates = [
                new Date('2023-08-01'),
                new Date('2023-08-02'),
                new Date('2023-08-03'),
                new Date('2023-08-04'),
            ];

            for (const expectedDate of expectedDates) {
                const generatedDate = dateGenerator.next().value;
                expect(generatedDate).toEqual(expectedDate);
            }

            // Ensure that the generator stops after generating all dates
            const lastGeneratedDate = dateGenerator.next().value;
            expect(lastGeneratedDate).toBeUndefined();
        });
    });

    describe('toUtc function', () => {
        it('should preserve UTC time when given an ISO string', () => {
            const timestamp = '2025-01-19T16:15:00+02:00';
            const expected = new Date(timestamp).toISOString();

            const result = toUtc(timestamp);
            expect(result).toBe(expected);
        });

        it('should handle local date string', () => {
            const localDateString = '2025-01-19T16:15:00';
            const expected = new Date(localDateString).toISOString();
            const result = toUtc(localDateString);
            expect(result).toBe(expected);
        });

        it('should handle invalid date string and return "Invalid Date"', () => {
            const exc = 'Invalid date string provided';
            expect(() => toUtc('invalid-date')).toThrow(exc);
            expect(() => toUtc('')).toThrow(exc);
        });

        it('should handle Date object input', () => {
            const dateObj = new Date('2025-01-19T16:15:00');
            const result = toUtc(dateObj);
            expect(result).toBe(dateObj.toISOString());
        });
    });
});
