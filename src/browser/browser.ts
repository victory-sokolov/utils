import { DeviceType } from '../types';

const devices =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

/**
 * Data type to file
 * @param content ArrayBuffer
 * @param fileName Output file name
 * @param contentType Output file type
 */
export const dataToFile = (
    content: ArrayBuffer,
    fileName: string,
    contentType: string
): void => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
};

/**
 * Detect device type: Mobile or Desktop
 * @returns Device type: Mobile or Desktop
 */
export const detectDeviceType = (): DeviceType => {
    return devices.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
};

/**
 * Check if user uses mobile device or desktop
 * @returns True if Mobile device is used
 */
export const isMobileDevice = (): boolean => {
    if (devices.test(navigator.userAgent)) {
        return true;
    }
    return false;
};
