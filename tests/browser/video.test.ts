import { cameraEnvironment, getVideoConstraint, startCamera } from '../../src/browser/video';
import { expect, vi } from 'vitest';

describe('test camera', () => {
    describe('cameraEnvironment', () => {
        it('should return "user" if not on a mobile device', () => {
            const isMobileDeviceMock = vi.fn().mockReturnValue(false);
            (global as any).isMobileDevice = isMobileDeviceMock;
            expect(cameraEnvironment()).toBe('user');
        });
    });

    describe('getVideoConstraint', () => {
        it('should return correct resolution if not on mobile device and window width is greater than or equal to 960', () => {
            const isMobileDeviceMock = vi.fn().mockReturnValue(false);
            (global as any).isMobileDevice = isMobileDeviceMock;

            expect(getVideoConstraint()).toEqual({
                width: { exact: 640 },
                height: { exact: 480 },
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
    });
});
