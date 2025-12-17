import { expect, vi } from 'vitest';
import {
    cameraEnvironment,
    getVideoConstraint,
    startCamera,
    stopCamera,
} from '../../src/browser/video';

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

            expect(getVideoConstraint()).toEqual({
                width: { exact: 640 },
                height: { exact: 480 },
            });
        });

        it('should return QVGA resolution if not on mobile device and window width is less than 960', () => {
            const isMobileDeviceMock = vi.fn().mockReturnValue(false);
            (globalThis as any).isMobileDevice = isMobileDeviceMock;
            Object.defineProperty(window, 'innerWidth', { value: 800 });

            expect(getVideoConstraint()).toEqual({
                width: { exact: 320 },
                height: { exact: 240 },
            });
        });

        it('should return mobile constraints if on mobile device', () => {
            Object.defineProperty(navigator, 'userAgent', { value: 'iPhone', configurable: true });

            expect(getVideoConstraint()).toEqual({
                width: { ideal: window.screen.height },
                height: { ideal: window.screen.width },
                facingMode: 'environment',
            });
        });
    });

    describe('startCamera', () => {
        it('should not start camera if already streaming', async () => {
            const videoMock: any = {
                onloadedmetadata: vi.fn(),
                play: vi.fn(),
                srcObject: vi.fn(),
                addTextTrack: vi.fn(),
                captureStream: vi.fn(),
                canPlayType: vi.fn(),
                fastSeek: vi.fn(),
            };
            const getUserMediaMock = vi.fn();
            (navigator as any).mediaDevices = {
                getUserMedia: getUserMediaMock,
            };

            await startCamera(true, videoMock as HTMLVideoElement);

            expect(getUserMediaMock).not.toHaveBeenCalled();
            expect(videoMock.play).not.toHaveBeenCalled();
            expect(videoMock.srcObject).not.toHaveBeenCalled();
        });

        it('should handle getUserMedia error', async () => {
            const videoMock: any = {
                onloadedmetadata: vi.fn(),
                play: vi.fn(),
                srcObject: vi.fn(),
            };
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const getUserMediaMock = vi.fn().mockRejectedValue(new Error('Permission denied'));
            (navigator as any).mediaDevices = {
                getUserMedia: getUserMediaMock,
            };

            await startCamera(false, videoMock as HTMLVideoElement);

            expect(consoleErrorSpy).toHaveBeenCalledWith('An error occured! Error: Permission denied');
            consoleErrorSpy.mockRestore();
        });

        it('should handle no getUserMedia support', async () => {
            const videoMock: any = {
                onloadedmetadata: vi.fn(),
                play: vi.fn(),
                srcObject: vi.fn(),
            };
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            (navigator as any).mediaDevices = undefined;

            await startCamera(false, videoMock as HTMLVideoElement);

            expect(consoleErrorSpy).toHaveBeenCalledWith('getUserMedia not supported');
            consoleErrorSpy.mockRestore();
        });
    });

    describe('stopCamera', () => {
        it('should stop tracks if streaming', () => {
            const trackMock = { stop: vi.fn() };
            const streamMock = { getTracks: vi.fn().mockReturnValue([trackMock]) };
            stopCamera(streamMock as any, true);
            expect(trackMock.stop).toHaveBeenCalled();
        });

        it('should not stop tracks if not streaming', () => {
            const trackMock = { stop: vi.fn() };
            const streamMock = { getTracks: vi.fn().mockReturnValue([trackMock]) };
            stopCamera(streamMock as any, false);
            expect(trackMock.stop).not.toHaveBeenCalled();
        });
    });
});
