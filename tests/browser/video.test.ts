import { expect, vi } from 'vitest';
import {
    cameraEnvironment,
    getVideoConstraint,
    startCamera,
    stopCamera,
} from '../../src/browser/video';

const createVideoMock = () => {
    const srcObjectSetter = vi.fn();
    const videoMock = {
        onloadedmetadata: vi.fn(),
        play: vi.fn(),
    };
    Object.defineProperty(videoMock, 'srcObject', {
        configurable: true,
        get: vi.fn(),
        set: srcObjectSetter,
    });
    return { srcObjectSetter, videoMock };
};

describe('test camera', () => {
    describe('cameraEnvironment', () => {
        it('should return "user" if not on a mobile device', () => {
            const isMobileDeviceMock = vi.fn().mockReturnValue(false);
            (globalThis as any).isMobileDevice = isMobileDeviceMock;
            expect(cameraEnvironment()).toBe('user');
        });
    });

    describe('getVideoConstraint', () => {
        it('should return correct resolution if not on mobile device and window width is greater than or equal to 960', () => {
            const isMobileDeviceMock = vi.fn().mockReturnValue(false);
            (globalThis as any).isMobileDevice = isMobileDeviceMock;

            expect(getVideoConstraint()).toStrictEqual({
                height: { exact: 480 },
                width: { exact: 640 },
            });
        });

        it('should return QVGA resolution if not on mobile device and window width is less than 960', () => {
            const isMobileDeviceMock = vi.fn().mockReturnValue(false);
            (globalThis as any).isMobileDevice = isMobileDeviceMock;
            Object.defineProperty(window, 'innerWidth', { value: 800 });

            expect(getVideoConstraint()).toStrictEqual({
                height: { exact: 240 },
                width: { exact: 320 },
            });
        });

        it('should return mobile constraints if on mobile device', () => {
            Object.defineProperty(navigator, 'userAgent', { configurable: true, value: 'iPhone' });

            expect(getVideoConstraint()).toStrictEqual({
                facingMode: 'environment',
                height: { ideal: window.screen.height },
                width: { ideal: window.screen.width },
            });
        });
    });

    describe('startCamera', () => {
        it('should not start camera if already streaming', async () => {
            const { videoMock, srcObjectSetter } = createVideoMock();
            const extendedVideoMock: any = Object.assign(videoMock, {
                addTextTrack: vi.fn(),
                canPlayType: vi.fn(),
                captureStream: vi.fn(),
                fastSeek: vi.fn(),
            });
            const getUserMediaMock = vi.fn();
            (navigator as any).mediaDevices = {
                getUserMedia: getUserMediaMock,
            };

            await startCamera(true, extendedVideoMock as HTMLVideoElement);

            expect(getUserMediaMock).not.toHaveBeenCalled();
            expect(videoMock.play).not.toHaveBeenCalled();
            expect(srcObjectSetter).not.toHaveBeenCalled();
        });

        it('should handle getUserMedia error', async () => {
            const { videoMock } = createVideoMock();
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const getUserMediaMock = vi.fn().mockRejectedValue(new Error('Permission denied'));
            (navigator as any).mediaDevices = {
                getUserMedia: getUserMediaMock,
            };

            await startCamera(false, videoMock as any);

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'An error occurred! Error: Permission denied',
            );
            consoleErrorSpy.mockRestore();
        });

        it('should handle no getUserMedia support', async () => {
            const { videoMock } = createVideoMock();
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            (navigator as any).mediaDevices = undefined;

            await startCamera(false, videoMock as any);

            expect(consoleErrorSpy).toHaveBeenCalledWith('getUserMedia not supported');
            consoleErrorSpy.mockRestore();
        });
    });

    describe('stopCamera', () => {
        it('should stop tracks if streaming', () => {
            const trackMock = { stop: vi.fn() };
            const streamMock = { getTracks: vi.fn().mockReturnValue([trackMock]) };
            stopCamera(streamMock as any, true);
            expect(trackMock.stop).toHaveBeenCalledWith();
        });

        it('should not stop tracks if not streaming', () => {
            const trackMock = { stop: vi.fn() };
            const streamMock = { getTracks: vi.fn().mockReturnValue([trackMock]) };
            stopCamera(streamMock as any, false);
            expect(trackMock.stop).not.toHaveBeenCalled();
        });
    });
});
