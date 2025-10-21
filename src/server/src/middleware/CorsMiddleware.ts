import { Request, Response, NextFunction } from 'express';
import { HttpHeader, CorsValue } from '../constants/HttpStatus';

/**
 * CORS middleware for handling Cross-Origin Resource Sharing.
 * Implements Middleware Pattern.
 */
export class CorsMiddleware {
    /**
     * Apply CORS headers to all responses
     */
    public static handle(req: Request, res: Response, next: NextFunction): void {
        res.header(HttpHeader.ACCESS_CONTROL_ALLOW_ORIGIN, CorsValue.ALLOW_ALL_ORIGINS);
        res.header(HttpHeader.ACCESS_CONTROL_ALLOW_HEADERS, CorsValue.ALLOW_ALL_ORIGINS);
        res.header(HttpHeader.ACCESS_CONTROL_ALLOW_METHODS, CorsValue.ALLOW_ALL_ORIGINS);
        next();
    }
}
