/**
 * HTTP status codes enum.
 * Prevents magic numbers in route handlers.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export enum HttpStatus {
    // Success responses
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,

    // Redirection messages
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    NOT_MODIFIED = 304,

    // Client error responses
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,

    // Server error responses
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
}

/**
 * HTTP methods enum
 */
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD',
}

/**
 * Common HTTP headers
 */
export enum HttpHeader {
    CONTENT_TYPE = 'Content-Type',
    AUTHORIZATION = 'Authorization',
    ACCEPT = 'Accept',
    USER_AGENT = 'User-Agent',
    CACHE_CONTROL = 'Cache-Control',
    ACCESS_CONTROL_ALLOW_ORIGIN = 'Access-Control-Allow-Origin',
    ACCESS_CONTROL_ALLOW_METHODS = 'Access-Control-Allow-Methods',
    ACCESS_CONTROL_ALLOW_HEADERS = 'Access-Control-Allow-Headers',
    ACCESS_CONTROL_MAX_AGE = 'Access-Control-Max-Age',
}

/**
 * Content types for HTTP responses
 */
export enum ContentType {
    JSON = 'application/json',
    HTML = 'text/html',
    TEXT = 'text/plain',
    XML = 'application/xml',
    FORM_URLENCODED = 'application/x-www-form-urlencoded',
    MULTIPART_FORM = 'multipart/form-data',
}

/**
 * CORS configuration values
 */
export enum CorsValue {
    ALLOW_ALL_ORIGINS = '*',
    MAX_AGE_ONE_HOUR = '3600',
}

/**
 * Utility class for HTTP status operations
 */
export class HttpStatusHelper {
    /**
     * Check if status code is success (2xx)
     */
    public static isSuccess(status: HttpStatus): boolean {
        return status >= 200 && status < 300;
    }

    /**
     * Check if status code is client error (4xx)
     */
    public static isClientError(status: HttpStatus): boolean {
        return status >= 400 && status < 500;
    }

    /**
     * Check if status code is server error (5xx)
     */
    public static isServerError(status: HttpStatus): boolean {
        return status >= 500 && status < 600;
    }

    /**
     * Get human-readable message for status code
     */
    public static getMessage(status: HttpStatus): string {
        switch (status) {
            case HttpStatus.OK:
                return 'OK';
            case HttpStatus.CREATED:
                return 'Created';
            case HttpStatus.NO_CONTENT:
                return 'No Content';
            case HttpStatus.BAD_REQUEST:
                return 'Bad Request';
            case HttpStatus.UNAUTHORIZED:
                return 'Unauthorized';
            case HttpStatus.FORBIDDEN:
                return 'Forbidden';
            case HttpStatus.NOT_FOUND:
                return 'Not Found';
            case HttpStatus.INTERNAL_SERVER_ERROR:
                return 'Internal Server Error';
            default:
                return 'Unknown Status';
        }
    }
}
