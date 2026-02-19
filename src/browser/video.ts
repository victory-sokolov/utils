import type { CameraEnvironment } from '../types';
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
        qqvga: { height: { exact: 120 }, width: { exact: 160 } },
        qvga: { height: { exact: 240 }, width: { exact: 320 } },
        vga: { height: { exact: 480 }, width: { exact: 640 } },
    } as const;
    let videoConstraint;

    if (isMobileDevice()) {
        videoConstraint = {
            facingMode: cameraEnvironment(),
            height: { ideal: window.screen.width },
            width: { ideal: window.screen.height },
        } as const;
    } else {
        if (window.innerWidth < 960) {
            videoConstraint = resolutions.qvga;
        } else {
            videoConstraint = resolutions.vga;
        }
    }
    return videoConstraint;
};

/**
 * Start Video stream
 * @param isStreaming Is camera streaming
 * @param video HTMLVideoElement
 */
export const startCamera = async (isStreaming: boolean, video: HTMLVideoElement): Promise<void> => {
    const constraint = getVideoConstraint();
    if (isStreaming) {
        return;
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: constraint,
            });
            video.srcObject = stream;
            video.onloadedmetadata = () => {
                video.play();
            };
        } catch (error) {
            console.error(`An error occured! ${error}`);
        }
    } else {
        console.error('getUserMedia not supported');
    }
};

/**
 * Stop current video stream
 * @param stream Current video stream
 * @param isStreaming isStreaming
 */
export const stopCamera = (stream: MediaStream, isStreaming: boolean): void => {
    if (!isStreaming) {
        return;
    }

    stream.getTracks().forEach(track => {
        track.stop();
    });
};
