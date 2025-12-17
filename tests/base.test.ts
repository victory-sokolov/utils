import { describe, expect, it } from 'vitest';
import { bytesToSize, debounce, perfStart, perfStop, throttle, wait } from '../src/base';

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

    it('should correctly format bytes less than 1000 without a unit', () => {
        expect(bytesToSize(500)).toBe('500');
        expect(bytesToSize(999)).toBe('999');
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
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('perfStart should return a number representing the current time', () => {
        vi.spyOn(performance, 'now').mockReturnValue(1000); // Mock starting time
        expect(typeof perfStart()).toBe('number');
        expect(perfStart()).toBe(1000);
    });

    it('perfStop should calculate the correct elapsed time', () => {
        vi.spyOn(performance, 'now')
            .mockReturnValueOnce(1000) // Start time
            .mockReturnValueOnce(2500); // End time

        const startTime = perfStart(); // This will use the first mocked value (1000)
        vi.advanceTimersByTime(1500); // Advance timers
        const result = perfStop(startTime); // This will use the second mocked value (2500)

        expect(result).toBe('Function took 1.50 seconds');

        vi.spyOn(performance, 'now')
            .mockReturnValueOnce(0) // Start time
            .mockReturnValueOnce(12345); // End time

        const startTime2 = perfStart();
        vi.advanceTimersByTime(12345);
        const result2 = perfStop(startTime2);
        expect(result2).toBe('Function took 12.35 seconds');
    });

    it('perfStop should handle zero elapsed time', () => {
        vi.spyOn(performance, 'now')
            .mockReturnValueOnce(500)
            .mockReturnValueOnce(500);

        const startTime = perfStart();
        const result = perfStop(startTime);

        expect(result).toBe('Function took 0.00 seconds');
    });
});

describe('debounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should call the function only once after the delay', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 100);

        debouncedFunc();
        debouncedFunc();
        debouncedFunc();

        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(100);
        expect(func).toHaveBeenCalledTimes(1);
    });

    it('should not call the function if called again within the delay', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 100);

        debouncedFunc();
        vi.advanceTimersByTime(50);
        debouncedFunc();
        vi.advanceTimersByTime(50);
        debouncedFunc();
        vi.advanceTimersByTime(50);

        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(50); // Complete the last 100ms delay
        expect(func).toHaveBeenCalledTimes(1);
    });

    it('should pass the latest arguments to the function', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 100);

        debouncedFunc(1);
        debouncedFunc(2);
        debouncedFunc(3);

        vi.advanceTimersByTime(100);
        expect(func).toHaveBeenCalledWith(3);
    });

    it('should allow immediate invocation with flush()', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 100);

        debouncedFunc(1);
        debouncedFunc(2);
        debouncedFunc.flush();

        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith(2);

        vi.advanceTimersByTime(100); // Should not call again
        expect(func).toHaveBeenCalledTimes(1);
    });

    it('should not call the function again after flush if new calls are made before delay passes', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 100);

        debouncedFunc(1);
        debouncedFunc.flush(); // Called once with 1
        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith(1);

        debouncedFunc(2); // New call
        expect(func).toHaveBeenCalledTimes(1); // Should not call immediately

        vi.advanceTimersByTime(100); // Delay passes
        expect(func).toHaveBeenCalledTimes(2); // Should call again with 2
        expect(func).toHaveBeenCalledWith(2);
    });

    it('should handle flush() when the debounced function has never been invoked', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 100);

        debouncedFunc.flush(); // Should do nothing if not invoked
        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(100);
        expect(func).not.toHaveBeenCalled();
    });
});

describe('throttle', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should call the function after the cooldown on the first invocation', () => {
        const func = vi.fn();
        const throttledFunc = throttle(func, 100);

        throttledFunc('first');
        expect(func).not.toHaveBeenCalled(); // Not called immediately

        vi.advanceTimersByTime(100);
        expect(func).toHaveBeenCalledTimes(1); // Called after cooldown
        expect(func).toHaveBeenCalledWith('first');
    });

    it('should call the function only once within the cooldown period, with the last arguments', () => {
        const func = vi.fn();
        const throttledFunc = throttle(func, 100);

        throttledFunc('a');
        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(50); // Advance half way
        throttledFunc('b'); // Still within cooldown
        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(49); // Still within cooldown
        throttledFunc('c'); // Last call before cooldown ends
        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1); // Cooldown passes
        expect(func).toHaveBeenCalledTimes(1); // Only one call
        expect(func).toHaveBeenCalledWith('c'); // With the last arguments
    });

    it('should allow the function to be called again after the cooldown period', () => {
        const func = vi.fn();
        const throttledFunc = throttle(func, 100);

        throttledFunc(1);
        vi.advanceTimersByTime(100);
        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith(1);

        throttledFunc(2); // New call after cooldown
        vi.advanceTimersByTime(100);
        expect(func).toHaveBeenCalledTimes(2);
        expect(func).toHaveBeenCalledWith(2);

        throttledFunc(3); // Another new call after cooldown
        vi.advanceTimersByTime(100);
        expect(func).toHaveBeenCalledTimes(3);
        expect(func).toHaveBeenCalledWith(3);
    });

    it('should not call the function if no calls were made within cooldown after initial call', () => {
        const func = vi.fn();
        const throttledFunc = throttle(func, 100);

        throttledFunc('initial');
        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(200); // Pass cooldown
        expect(func).toHaveBeenCalledTimes(1); // Initial call executed
        expect(func).toHaveBeenCalledWith('initial');

        vi.advanceTimersByTime(100); // No new calls, no further execution
        expect(func).toHaveBeenCalledTimes(1);
    });
});
