/**
 * Enum for allowed image file extensions.
 * Used for file upload validation.
 */
export enum ImageExtension {
    PNG = '.png',
    JPG = '.jpg',
    JPEG = '.jpeg',
}

/**
 * Enum for MIME types
 */
export enum MimeType {
    PNG = 'image/png',
    JPEG = 'image/jpeg',
    JPG = 'image/jpg',
}

/**
 * Utility class for file type validation and operations
 */
export class FileTypeValidator {
    /**
     * Get regex pattern for allowed image extensions
     */
    public static getImageExtensionPattern(): RegExp {
        const extensions = Object.values(ImageExtension).join('|');
        return new RegExp(`${extensions}`, 'i');
    }

    /**
     * Validate if file extension is allowed
     * @param filename - File name to validate
     * @returns true if extension is allowed, false otherwise
     */
    public static isAllowedImageExtension(filename: string): boolean {
        const pattern = this.getImageExtensionPattern();
        return pattern.test(filename.toLowerCase());
    }

    /**
     * Get file extension from filename
     * @param filename - File name
     * @returns Extension including the dot (e.g., '.png')
     */
    public static getExtension(filename: string): string {
        const match = filename.match(/\.[^.]+$/);
        return match ? match[0].toLowerCase() : '';
    }

    /**
     * Check if extension is valid image type
     * @param extension - Extension to check (with or without dot)
     */
    public static isValidImageExtension(extension: string): boolean {
        const normalized = extension.startsWith('.') ? extension : `.${extension}`;
        return Object.values(ImageExtension).includes(normalized.toLowerCase() as ImageExtension);
    }

    /**
     * Get all allowed extensions as array
     */
    public static getAllowedExtensions(): string[] {
        return Object.values(ImageExtension);
    }

    /**
     * Get MIME type from extension
     * @param extension - File extension
     * @returns MIME type or undefined
     */
    public static getMimeType(extension: string): MimeType | undefined {
        const normalized = extension.toLowerCase().replace('.', '');

        switch (normalized) {
            case 'png':
                return MimeType.PNG;
            case 'jpg':
                return MimeType.JPG;
            case 'jpeg':
                return MimeType.JPEG;
            default:
                return undefined;
        }
    }
}

/**
 * Error messages for file validation
 */
export enum FileValidationError {
    UNSUPPORTED_FORMAT = 'Error: format is not supported!',
    FILE_TOO_LARGE = 'Error: file size exceeds maximum limit!',
    INVALID_FILE = 'Error: invalid file!',
}
