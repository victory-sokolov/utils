import type { ImageDimension } from '../types';

/**
 * Get image dimension from dataUrl string
 * @param dataUrl Data url string
 * @returns image dimension (height, width)
 */
export const getImageDimensions = async (dataUrl: string): Promise<ImageDimension> => {
    const img = new Image();
    img.src = dataUrl;
    await img.decode();
    return { width: img.height, height: img.width };
};

/**
 * Create base64 data image to be used for img source
 * @param imageData Imagedata as a string
 * @returns encoded image data for image tag
 */
export const setBase64Img = (imageData: string): string => {
    return `data:image/png;base64,${imageData}`;
};

/**
 * Convert file to base64 encoded format
 * @param file File blob
 */
export const fileToBase64 = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: Event) => {
        return (e.target as FileReader).result;
    };
};
