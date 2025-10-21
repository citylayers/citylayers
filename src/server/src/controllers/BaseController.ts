import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../constants/HttpStatus';

/**
 * Base controller class that all controllers should extend.
 * Provides common error handling and response utilities.
 *
 * Design Pattern: Template Method Pattern
 */
export abstract class BaseController {
    /**
     * Wrap async route handlers to catch errors
     * @param fn - Async function to wrap
     */
    protected asyncHandler(fn: Function) {
        return (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }

    /**
     * Send successful JSON response
     */
    protected sendSuccess(res: Response, data: any, status: HttpStatus = HttpStatus.OK): void {
        res.status(status).json({
            success: true,
            data
        });
    }

    /**
     * Send error JSON response
     */
    protected sendError(
        res: Response,
        message: string,
        status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
        details?: any
    ): void {
        res.status(status).json({
            success: false,
            error: message,
            details
        });
    }

    /**
     * Render view with error handling
     */
    protected renderView(
        res: Response,
        view: string,
        data?: any,
        onError?: (err: Error) => void
    ): void {
        try {
            res.render(view, data);
        } catch (err) {
            if (onError) {
                onError(err as Error);
            } else {
                this.sendError(res, 'Failed to render view', HttpStatus.INTERNAL_SERVER_ERROR, err);
            }
        }
    }

    /**
     * Get request parameter with default value
     */
    protected getParam(req: Request, key: string, defaultValue: string = ''): string {
        return req.params[key] || defaultValue;
    }

    /**
     * Get query parameter with default value
     */
    protected getQuery(req: Request, key: string, defaultValue: string = ''): string {
        return (req.query[key] as string) || defaultValue;
    }

    /**
     * Get request body field
     */
    protected getBody<T>(req: Request): T {
        return req.body as T;
    }

    /**
     * Validate required parameters
     * @throws Error if any parameter is missing
     */
    protected validateRequired(params: Record<string, any>): void {
        const missing = Object.entries(params)
            .filter(([_, value]) => value === undefined || value === null || value === '')
            .map(([key, _]) => key);

        if (missing.length > 0) {
            throw new Error(`Missing required parameters: ${missing.join(', ')}`);
        }
    }
}
