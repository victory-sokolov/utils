import { CameraEnvironment } from '../types';
import { isMobileDevice } from './browser';

/**
 * Detect which camera environment is used
 * @returns environment ur user camera
 */
export const cameraEnvironment = (): CameraEnvironment =>
    isMobileDevice() ? 'environment' : 'user';

/**
 * Get current resolution depending on device
 * @returns Video resolution
 */
export const getVideoConstraint = () => {
    const resolutions = {
        qqvga: { width: { exact: 160 }, height: { exact: 120 } },
        qvga: { width: { exact: 320 }, height: { exact: 240 } },
        vga: { width: { exact: 640 }, height: { exact: 480 } },
    } as const;
    let videoConstraint;

    if (isMobileDevice()) {
        videoConstraint = {
            width: { ideal: window.screen.height },
            height: { ideal: window.screen.width },
            facingMode: cameraEnvironment(),
        } as const;
    } else {
        if (window.innerWidth < 960) {
            videoConstraint = resolutions['qvga'];
        } else {
            videoConstraint = resolutions['vga'];
        }
    }
    return videoConstraint;
};

/**
 * Start Video stream
 * @param isStreaming Is camera streaming
 * @param video HTMLVideoElement
 * @returns
 */
export const startCamera = async (isStreaming: boolean, video: HTMLVideoElement): Promise<void> => {
    const constraint = getVideoConstraint();
    if (isStreaming) return;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: constraint,
                audio: false,
            });
            video.srcObject = stream;
            video.onloadedmetadata = () => {
                video.play();
            };
        } catch (err) {
            console.log(`An error occured! ${err}`);
        }
    } else {
        console.error('getUserMedia not supported');
    }
};

/**
 * Stop current video stream
 * @param stream Current video stream
 * @param isStreaming isStreaming
 * @returns
 */
export const stopCamera = (stream: MediaStream, isStreaming: boolean): void => {
    if (!isStreaming) return;

    stream.getTracks().forEach((track) => {
        track.stop();
    });
};
