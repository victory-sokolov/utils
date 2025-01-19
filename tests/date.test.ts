import { describe, expect, it } from 'vitest';
import {
    cronToDateTime,
    dateRangeGenerator,
    dateTimeToCron,
    dateWithTimeStamp,
    getMonthFirstDay,
    getMonthLastDay,
    getMonthList,
    getWeekFirstDay,
    getWeekLastDay,
    isWeekday,
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
            expect(() => {
                toLongDate('invalid date');
            }).toThrow('Invalid date provided');
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
        it('returns the correct next date', ({ skip }) => {
            skip();
            const cronExpression = '34 12 18 8 3'; // Wednesday at 12:34 PM
            const expectedNextDate = new Date('2023-08-18T12:34:00Z'); // Assuming current date is 2023-08-18
            const result = cronToDateTime(cronExpression);

            expect(result.toISOString()).toBe(expectedNextDate.toISOString());
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
        it('should return correct UTC ISO string for Date object', () => {
            const date = new Date(2025, 0, 19, 16, 15);
            const result = toUtc(date);
            expect(result).toBe(new Date('2025-01-19T14:15:00.000Z').toISOString());
        });

        it('should return correct UTC ISO string for string input (valid date)', () => {
            const dateString = '2025-01-19T16:15:00';
            const result = toUtc(dateString);
            expect(result).toBe(new Date('2025-01-19T14:15:00.000Z').toISOString());
        });

        it('should handle invalid date string and return "Invalid Date"', () => {
            const exc = 'Invalid date string provided';
            expect(() => toUtc('invalid-date')).toThrow(exc);
            expect(() => toUtc('')).toThrow(exc);
        });
    });
});
