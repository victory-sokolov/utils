import { cameraEnvironment, getVideoConstraint, startCamera } from '../../src/browser/video';
import { jest } from '@jest/globals';

describe('test camera', () => {
    describe('cameraEnvironment', () => {
        it('should return "user" if not on a mobile device', () => {
            const isMobileDeviceMock = jest.fn().mockReturnValue(false);
            (global as any).isMobileDevice = isMobileDeviceMock;
            expect(cameraEnvironment()).toBe('user');
        });
    });

    describe('getVideoConstraint', () => {
        it('should return correct resolution if not on mobile device and window width is greater than or equal to 960', () => {
            const isMobileDeviceMock = jest.fn().mockReturnValue(false);
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
                onloadedmetadata: jest.fn(),
                play: jest.fn(),
                srcObject: jest.fn(),
                addTextTrack: jest.fn(),
                captureStream: jest.fn(),
                canPlayType: jest.fn(),
                fastSeek: jest.fn(),
            };
            const getUserMediaMock = jest.fn();
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
