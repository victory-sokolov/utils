import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
        expect(bytesToSize(1_048_576)).toBe('1 MB');
        expect(bytesToSize(2_097_152)).toBe('2 MB');
        expect(bytesToSize(3_145_728)).toBe('3 MB');
        expect(bytesToSize(1_572_864)).toBe('2 MB');
    });

    it('should correctly convert bytes to gigabytes', () => {
        expect(bytesToSize(1_073_741_824)).toBe('1 GB');
        expect(bytesToSize(2_147_483_648)).toBe('2 GB');
        expect(bytesToSize(3_221_225_472)).toBe('3 GB');
        expect(bytesToSize(1_610_612_736)).toBe('2 GB');
    });

    it('should correctly convert bytes to terabytes', () => {
        expect(bytesToSize(1_099_511_627_776)).toBe('1 TB');
        expect(bytesToSize(2_199_023_255_552)).toBe('2 TB');
        expect(bytesToSize(3_298_534_883_328)).toBe('3 TB');
        expect(bytesToSize(1_649_267_441_664)).toBe('2 TB');
    });

    it('should correctly format bytes less than 1000 without a unit', () => {
        expect(bytesToSize(500)).toBe('500');
        expect(bytesToSize(999)).toBe('999');
    });
});

describe('timer-based functions', () => {
    beforeEach(() => {
        vi.useFakeTimers({
            toFake: ['setTimeout', 'setInterval', 'clearTimeout', 'clearInterval'],
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    describe('wait', () => {
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
        it('perfStart should return a number representing the current time', () => {
            vi.spyOn(performance, 'now').mockReturnValue(1000);
            expect(typeof perfStart()).toBe('number');
            expect(perfStart()).toBe(1000);
        });

        it('perfStop should calculate the correct elapsed time', () => {
            vi.spyOn(performance, 'now').mockReturnValueOnce(1000).mockReturnValueOnce(2500);

            const startTime = perfStart();
            vi.advanceTimersByTime(1500);
            const result = perfStop(startTime);

            expect(result).toBe('Function took 1.50 seconds');

            vi.spyOn(performance, 'now').mockReturnValueOnce(0).mockReturnValueOnce(12_345);

            const startTime2 = perfStart();
            vi.advanceTimersByTime(12_345);
            const result2 = perfStop(startTime2);
            expect(result2).toBe('Function took 12.35 seconds');
        });

        it('perfStop should handle zero elapsed time', () => {
            vi.spyOn(performance, 'now').mockReturnValueOnce(500).mockReturnValueOnce(500);

            const startTime = perfStart();
            const result = perfStop(startTime);

            expect(result).toBe('Function took 0.00 seconds');
        });
    });

    describe('debounce', () => {
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

            vi.advanceTimersByTime(50);
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

            vi.advanceTimersByTime(100);
            expect(func).toHaveBeenCalledTimes(1);
        });

        it('should not call the function again after flush if new calls are made before delay passes', () => {
            const func = vi.fn();
            const debouncedFunc = debounce(func, 100);

            debouncedFunc(1);
            debouncedFunc.flush();
            expect(func).toHaveBeenCalledTimes(1);
            expect(func).toHaveBeenCalledWith(1);

            debouncedFunc(2);
            expect(func).toHaveBeenCalledTimes(1);

            vi.advanceTimersByTime(100);
            expect(func).toHaveBeenCalledTimes(2);
            expect(func).toHaveBeenCalledWith(2);
        });

        it('should handle flush() when the debounced function has never been invoked', () => {
            const func = vi.fn();
            const debouncedFunc = debounce(func, 100);

            debouncedFunc.flush();
            expect(func).not.toHaveBeenCalled();

            vi.advanceTimersByTime(100);
            expect(func).not.toHaveBeenCalled();
        });
    });

    describe('throttle', () => {
        it('should call the function after the cooldown on the first invocation', () => {
            const func = vi.fn();
            const throttledFunc = throttle(func, 100);

            throttledFunc('first');
            expect(func).not.toHaveBeenCalled();

            vi.advanceTimersByTime(100);
            expect(func).toHaveBeenCalledTimes(1);
            expect(func).toHaveBeenCalledWith('first');
        });

        it('should call the function only once within the cooldown period, with the last arguments', () => {
            const func = vi.fn();
            const throttledFunc = throttle(func, 100);

            throttledFunc('a');
            expect(func).not.toHaveBeenCalled();

            vi.advanceTimersByTime(50);
            throttledFunc('b');
            expect(func).not.toHaveBeenCalled();

            vi.advanceTimersByTime(49);
            throttledFunc('c');
            expect(func).not.toHaveBeenCalled();

            vi.advanceTimersByTime(1);
            expect(func).toHaveBeenCalledTimes(1);
            expect(func).toHaveBeenCalledWith('c');
        });

        it('should allow the function to be called again after the cooldown period', () => {
            const func = vi.fn();
            const throttledFunc = throttle(func, 100);

            throttledFunc(1);
            vi.advanceTimersByTime(100);
            expect(func).toHaveBeenCalledTimes(1);
            expect(func).toHaveBeenCalledWith(1);

            throttledFunc(2);
            vi.advanceTimersByTime(100);
            expect(func).toHaveBeenCalledTimes(2);
            expect(func).toHaveBeenCalledWith(2);

            throttledFunc(3);
            vi.advanceTimersByTime(100);
            expect(func).toHaveBeenCalledTimes(3);
            expect(func).toHaveBeenCalledWith(3);
        });

        it('should not call the function if no calls were made within cooldown after initial call', () => {
            const func = vi.fn();
            const throttledFunc = throttle(func, 100);

            throttledFunc('initial');
            expect(func).not.toHaveBeenCalled();

            vi.advanceTimersByTime(200);
            expect(func).toHaveBeenCalledTimes(1);
            expect(func).toHaveBeenCalledWith('initial');

            vi.advanceTimersByTime(100);
            expect(func).toHaveBeenCalledTimes(1);
        });
    });
});
