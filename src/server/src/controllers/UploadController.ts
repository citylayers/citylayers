import { Request, Response, Router } from 'express';
import { BaseController } from './BaseController';
import { RoutePath } from '../config/RouteConstants';
import multer from 'multer';

/**
 * Controller for file upload routes.
 */
export class UploadController extends BaseController {
    public router: Router;
    private upload: multer.Multer;

    constructor(upload: multer.Multer) {
        super();
        this.upload = upload;
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            RoutePath.UPLOAD,
            this.upload.single('image'),
            this.asyncHandler(this.uploadImage.bind(this))
        );
    }

    /**
     * POST /upload - Upload image file
     */
    private async uploadImage(req: Request, res: Response): Promise<void> {
        if (!req.file) {
            this.sendError(res, 'No file uploaded');
            return;
        }

        this.sendSuccess(res, { content: req.file.filename });
    }
}
