import { Request, Response, NextFunction } from 'express';
import { Environment, EnvironmentKey } from '../config/Environment';
import { HttpStatus } from '../constants/HttpStatus';

/**
 * Middleware for protecting API endpoints from external access.
 * Only allows requests from:
 * 1. Same origin (internal app requests)
 * 2. Requests with valid API key (for authorized external access)
 */
export class AuthMiddleware {
    private static env = Environment.getInstance();

    /**
     * Verify that the request comes from an authorized source.
     * Checks referer header and API key.
     * NOTE: This blocks direct browser access - use verifyInternalOrBrowser for pages.
     */
    public static verifyInternalAccess(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        // Get allowed domain from environment
        const allowedDomain = AuthMiddleware.env.get(EnvironmentKey.DOMAIN, 'localhost');
        const port = AuthMiddleware.env.getNumber(EnvironmentKey.PORT, 3000);
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

        // Build allowed origins
        const allowedOrigins = [
            `${protocol}://${allowedDomain}`,
            `${protocol}://${allowedDomain}:${port}`,
            `http://localhost:${port}`,
            `http://127.0.0.1:${port}`,
        ];

        // Check if request has valid referer
        const referer = req.get('referer') || req.get('origin');

        if (referer) {
            const refererUrl = new URL(referer);
            const refererOrigin = `${refererUrl.protocol}//${refererUrl.host}`;

            if (allowedOrigins.some(origin => refererOrigin.startsWith(origin))) {
                return next();
            }
        }

        // Check for API key in header or query
        const apiKey = req.get('X-API-Key') || req.query.apiKey;
        const validApiKey = process.env.API_KEY;

        if (validApiKey && apiKey === validApiKey) {
            return next();
        }

        // If no valid authentication found, deny access
        res.status(HttpStatus.FORBIDDEN).json({
            error: 'Access denied',
            message: 'This endpoint is only accessible from the CityLayers application'
        });
    }

    /**
     * Verify internal access OR allow direct browser navigation.
     * Use this for page endpoints that should be accessible via direct URL.
     * API endpoints (JSON responses) should use verifyInternalAccess instead.
     */
    public static verifyInternalOrBrowser(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        // Check if request accepts HTML (browser request)
        const acceptsHtml = req.accepts('html');
        const userAgent = req.get('user-agent') || '';

        // Allow browser requests (direct URL navigation)
        if (acceptsHtml && userAgent.toLowerCase().includes('mozilla')) {
            return next();
        }

        // For non-browser requests, use strict verification
        AuthMiddleware.verifyInternalAccess(req, res, next);
    }

    /**
     * Middleware factory that allows certain user agents (like search engine crawlers)
     * while blocking others.
     */
    public static allowCrawlers(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        const userAgent = req.get('user-agent') || '';

        // Allow common search engine crawlers
        const allowedCrawlers = [
            'googlebot',
            'bingbot',
            'slurp',
            'duckduckbot',
            'baiduspider',
            'yandexbot',
            'facebookexternalhit',
            'twitterbot',
            'rogerbot',
            'linkedinbot',
            'embedly',
            'showyoubot',
            'outbrain',
            'pinterest'
        ];

        const isAllowedCrawler = allowedCrawlers.some(crawler =>
            userAgent.toLowerCase().includes(crawler)
        );

        if (isAllowedCrawler) {
            return next();
        }

        // If not a crawler, proceed with normal auth check
        AuthMiddleware.verifyInternalAccess(req, res, next);
    }
}