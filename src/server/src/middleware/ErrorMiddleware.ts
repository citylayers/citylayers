import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../constants/HttpStatus';
import { ViewTemplate } from '../config/PathConstants';

/**
 * Error handling middleware.
 * Catches all errors and provides consistent error responses.
 */
export class ErrorMiddleware {
    /**
     * Handle 404 errors (route not found)
     */
    public static notFound(req: Request, res: Response): void {
        res.status(HttpStatus.NOT_FOUND).render(ViewTemplate.NOT_FOUND);
    }

    /**
     * Global error handler
     */
    public static handleError(
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        console.error('Error:', err);

        // Check if response already sent
        if (res.headersSent) {
            return next(err);
        }

        // Determine status code
        const statusCode = (err as any).statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

        // Send JSON error for API routes
        if (req.path.startsWith('/api/') || req.xhr) {
            res.status(statusCode).json({
                success: false,
                error: err.message,
                stack: process.env.NODE_ENV === 'dev' ? err.stack : undefined
            });
            return;
        }

        // Render error page for regular routes
        res.status(statusCode).render(ViewTemplate.NOT_FOUND);
    }
}
