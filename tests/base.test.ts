import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
    bytesToSize,
    debounce,
    perfStart,
    perfStop,
    throttle,
    wait,
} from '../src/base';

describe('bytesToSize', () => {
    it('should return "0" when given 0 bytes', () => {
        expect(bytesToSize(0)).toBe('0');
    });

    it('should correctly convert bytes to kilobytes', () => {
        expect(bytesToSize(1024)).toBe('1 KB');
        expect(bytesToSize(2048)).toBe('2 KB');
        expect(bytesToSize(3072)).toBe('3 KB');
        expect(bytesToSize(1536)).toBe('2 KB');
    });

    it('should correctly convert bytes to megabytes', () => {
        expect(bytesToSize(1048576)).toBe('1 MB');
        expect(bytesToSize(2097152)).toBe('2 MB');
        expect(bytesToSize(3145728)).toBe('3 MB');
        expect(bytesToSize(1572864)).toBe('2 MB');
    });

    it('should correctly convert bytes to gigabytes', () => {
        expect(bytesToSize(1073741824)).toBe('1 GB');
        expect(bytesToSize(2147483648)).toBe('2 GB');
        expect(bytesToSize(3221225472)).toBe('3 GB');
        expect(bytesToSize(1610612736)).toBe('2 GB');
    });

    it('should correctly convert bytes to terabytes', () => {
        expect(bytesToSize(1099511627776)).toBe('1 TB');
        expect(bytesToSize(2199023255552)).toBe('2 TB');
        expect(bytesToSize(3298534883328)).toBe('3 TB');
        expect(bytesToSize(1649267441664)).toBe('2 TB');
    });
});

describe('wait', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should resolve after the specified time', async () => {
        const ms = 1000;
        const promise = wait(ms);

        vi.advanceTimersByTime(ms);

        await expect(promise).resolves.toBeUndefined();
    });

    it('should resolve immediately for 0ms', async () => {
        const promise = wait(0);

        vi.advanceTimersByTime(0);

        await expect(promise).resolves.toBeUndefined();
    });
});

describe('perfStart and perfStop', () => {
    let mockPerformanceNow: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        vi.useFakeTimers();
        mockPerformanceNow = vi.spyOn(performance, 'now');
        mockPerformanceNow.mockReset(); // Reset mocks before each test
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return a number when perfStart is called', () => {
        mockPerformanceNow.mockReturnValueOnce(0); // Mock for the perfStart call
        expect(perfStart()).toBe(0);
        expect(mockPerformanceNow).toHaveBeenCalledTimes(1);
    });

    it('should return a string indicating the duration when perfStop is called', () => {
        mockPerformanceNow.mockReturnValueOnce(0); // For perfStart
        mockPerformanceNow.mockReturnValueOnce(1000); // For perfStop

        const startTime = perfStart();
        const result = perfStop(startTime);

        expect(result).toBe('Function took 1.00 seconds');
        expect(mockPerformanceNow).toHaveBeenCalledTimes(2);
    });

    it('should handle different time durations correctly', () => {
        mockPerformanceNow.mockReturnValueOnce(0);
        mockPerformanceNow.mockReturnValueOnce(500);

        const startTime = perfStart();
        const result = perfStop(startTime);

        expect(result).toBe('Function took 0.50 seconds');
        expect(mockPerformanceNow).toHaveBeenCalledTimes(2);
    });
});

describe('debounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should call the function only after the delay', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 100);

        debouncedFunc();
        debouncedFunc();
        debouncedFunc();

        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(99);
        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1);
        expect(func).toHaveBeenCalledTimes(1);
    });

    it('should call the function with the last arguments', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 100);

        debouncedFunc(1);
        debouncedFunc(2, 3);
        debouncedFunc(4, 5, 6);

        vi.advanceTimersByTime(100);

        expect(func).toHaveBeenCalledWith(4, 5, 6);
    });

    it('should not call the function if called again within the delay', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 100);

        debouncedFunc(1);
        vi.advanceTimersByTime(50);
        debouncedFunc(2);
        vi.advanceTimersByTime(50);
        debouncedFunc(3);
        vi.advanceTimersByTime(99);

        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1);
        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith(3);
    });

    it('should flush the function immediately', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 100);

        debouncedFunc(1);
        debouncedFunc.flush();

        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith(1);

        vi.advanceTimersByTime(100); // Should not call again
        expect(func).toHaveBeenCalledTimes(1);
    });

    it('should not call the function on flush if no pending calls', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 100);

        debouncedFunc.flush();
        expect(func).not.toHaveBeenCalled();
    });
});
