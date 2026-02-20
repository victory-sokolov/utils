import { isMobileDevice } from './browser';

type CameraEnvironment = 'environment' | 'user';

interface VideoConstraint {
    facingMode?: CameraEnvironment;
    height: { exact?: number; ideal?: number };
    width: { exact?: number; ideal?: number };
}

/**
 * Detect which camera environment is used
 * @returns environment ur user camera
 */
export const cameraEnvironment = (): CameraEnvironment => {
    if (isMobileDevice()) {
        return 'environment';
    }
    return 'user';
};

/**
 * Get current resolution depending on device
 * @returns Video resolution
 */
export const getVideoConstraint = (): VideoConstraint => {
    const resolutions = {
        qqvga: { height: { exact: 120 }, width: { exact: 160 } },
        qvga: { height: { exact: 240 }, width: { exact: 320 } },
        vga: { height: { exact: 480 }, width: { exact: 640 } },
    } as const;
    let videoConstraint: VideoConstraint = {
        facingMode: cameraEnvironment(),
        height: { ideal: window.screen.height },
        width: { ideal: window.screen.width },
    };

    if (!isMobileDevice()) {
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
export const startCamera = (isStreaming: boolean, video: HTMLVideoElement): Promise<void> => {
    const constraint = getVideoConstraint();
    if (isStreaming) {
        return Promise.resolve();
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        return navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: constraint,
            })
            .then(stream => {
                video.srcObject = stream;
                video.addEventListener('loadedmetadata', (): void => {
                    video.play();
                });
            })
            .catch((error: unknown) => {
                // oxlint-disable-next-line no-console
                console.error(`An error occurred! ${error}`);
            });
    }
    // oxlint-disable-next-line no-console
    console.error('getUserMedia not supported');
    return Promise.resolve();
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

    const tracks = stream.getTracks();
    for (const track of tracks) {
        track.stop();
    }
};
