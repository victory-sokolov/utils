import {
    getMonthList,
    dateWithTimeStamp,
    getWeekLastDay,
    getWeekFirstDay,
    getMonthLastDay,
    getMonthFirstDay,
    isWeekday,
    toLongDate,
} from '../src/date';

describe('getMonthList', () => {
    test('month names', () => {
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
    test('date with timestamp', () => {
        const date = new Date(Date.UTC(2022, 11, 30, 13, 30, 30));
        expect(dateWithTimeStamp(date)).toBe('2022-12-30-13-30-30');
    });
});

describe('getWeekLastDay', () => {
    test('last day of week', () => {
        expect(getWeekLastDay(new Date(2022, 11, 30)).getTime()).toBe(new Date(2022, 11, 31).getTime());
    });
});

describe('getWeekFirstDay', () => {
    test('first day of week', () => {
        expect(getWeekFirstDay(new Date(2022, 11, 30)).getTime()).toBe(new Date(2022, 11, 26).getTime());
    });
});

describe('getMonthLastDay', () => {
    test('last day of month', () => {
        expect(getMonthLastDay(new Date(2022, 11, 30)).getTime()).toBe(new Date(2022, 11, 31).getTime());
    });
});

describe('getMonthFirstDay', () => {
    test('first day of month', () => {
        expect(getMonthFirstDay(new Date(2022, 11, 30)).getTime()).toBe(new Date(2022, 11, 1).getTime());
    });
});

describe('isWeekday', () => {
    test('weekday', () => {
        expect(isWeekday(new Date(2022, 11, 28))).toBe(true);
    });

    test('weekend', () => {
        expect(isWeekday(new Date(2022, 11, 5))).toBe(true);
        expect(isWeekday(new Date(2022, 11, 10))).toBe(false);
    });
});

describe('toLongDate', () => {
    it('should return a long date string in the format of Month Day, Year', () => {
        expect(toLongDate('2022-01-01')).toEqual('January 1, 2022');
    });

    it('toLongDate throws an error for an invalid date', () => {
        expect(() => {
            toLongDate('invalid date');
        }).toThrow('Invalid date provided');
    });
});
