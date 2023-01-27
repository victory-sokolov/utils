import { DeviceType } from '../types';

const devices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

/**
 * Data type to file
 * @param content ArrayBuffer
 * @param fileName Output file name
 * @param contentType Output file type
 */
export const dataToFile = (content: ArrayBuffer, fileName: string, contentType: string): void => {
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

/**
 * Get Operating System
 * @returns Operating System
 */
export const getOs = () => {
    return navigator?.userAgentData?.platform || navigator?.platform || 'unknown';
};

/**
 * Save object to json file and download it
 * @param obj Object to export
 * @param fileName output file name
 */
export const downloadAsJson = (obj: Record<string, unknown>, fileName: string) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `${fileName}.json`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};

/**
 * Check if page is reloaded
 * @returns True if page reloaded
 */
export const isPageReloaded = () => {
    return window.performance
        .getEntriesByType('navigation')
        .map((nav) => nav.entryType)
        .includes('reload');
};
