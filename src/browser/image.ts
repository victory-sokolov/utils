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
    return img.decode().then(() => ({ width: img.width, height: img.height }));
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
export const fileToBase64 = (file: Blob): void => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener(
        'load',
        (event: Event): string | ArrayBuffer | null => (event.target as FileReader).result,
    );
};
