import multer from 'multer';
import path from 'path';
import { FileTypeValidator, FileValidationError } from '../constants/FileTypes';
import { PathConfig } from '../config/PathConstants';

/**
 * File upload middleware configuration.
 * Handles image uploads with validation.
 */
export class UploadMiddleware {
    private static pathConfig: PathConfig;

    /**
     * Initialize upload middleware
     */
    public static initialize(pathConfig: PathConfig): multer.Multer {
        this.pathConfig = pathConfig;

        const storage = multer.memoryStorage();

        const fileFilter = (req, file, cb) => {
            if (FileTypeValidator.isAllowedImageExtension(file.originalname)) {
                return cb(null, true);
            } else {
                cb(FileValidationError.UNSUPPORTED_FORMAT);
            }
        };

        return multer({ 
            storage, 
            fileFilter,
            limits: {
                fileSize: 5 * 1024 * 1024, // 5 mb limit
            }
        });
    }
}
