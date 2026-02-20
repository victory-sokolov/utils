interface ImageDimension {
    width: number;
    height: number;
}

/**
 * Get image dimension from dataUrl string
 * @param dataUrl Data url string
 * @returns image dimension (height, width)
 */
export const getImageDimensions = (dataUrl: string): Promise<ImageDimension> => {
    const img = new Image();
    img.src = dataUrl;
    return img.decode().then(() => ({ height: img.height, width: img.width }));
};

/**
 * Create base64 data image to be used for img source
 * @param imageData Imagedata as a string
 * @returns encoded image data for image tag
 */
export const setBase64Img = (imageData: string): string => `data:image/png;base64,${imageData}`;

/**
 * Convert file to base64 encoded format
 * @param file File blob
 */
export const fileToBase64 = (file: Blob): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', (): void => resolve(reader.result));
        reader.addEventListener('error', (error): void => reject(error));
    });
