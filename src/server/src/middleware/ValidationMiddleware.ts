import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../constants/HttpStatus';

/**
 * Validation rules for request parameters
 */
export interface ValidationRule {
    field: string;
    required?: boolean;
    type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean;
    message?: string;
}

/**
 * Validation middleware for request validation.
 * Provides declarative validation rules without external dependencies.
 */
export class ValidationMiddleware {
    /**
     * Validate request body
     */
    public static validateBody(rules: ValidationRule[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            const errors = this.validate(req.body, rules);

            if (errors.length > 0) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    error: 'Validation failed',
                    details: errors
                });
            }

            next();
        };
    }

    /**
     * Validate request parameters
     */
    public static validateParams(rules: ValidationRule[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            const errors = this.validate(req.params, rules);

            if (errors.length > 0) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    error: 'Invalid parameters',
                    details: errors
                });
            }

            next();
        };
    }

    /**
     * Validate request query parameters
     */
    public static validateQuery(rules: ValidationRule[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            const errors = this.validate(req.query, rules);

            if (errors.length > 0) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    error: 'Invalid query parameters',
                    details: errors
                });
            }

            next();
        };
    }

    /**
     * Validate data against rules
     */
    private static validate(data: any, rules: ValidationRule[]): string[] {
        const errors: string[] = [];

        for (const rule of rules) {
            const value = data[rule.field];

            // Check required
            if (rule.required && (value === undefined || value === null || value === '')) {
                errors.push(rule.message || `${rule.field} is required`);
                continue;
            }

            // Skip validation if not required and value is empty
            if (!rule.required && (value === undefined || value === null || value === '')) {
                continue;
            }

            // Check type
            if (rule.type) {
                const actualType = Array.isArray(value) ? 'array' : typeof value;
                if (actualType !== rule.type) {
                    errors.push(rule.message || `${rule.field} must be of type ${rule.type}`);
                    continue;
                }
            }

            // Check string length
            if (rule.type === 'string' || typeof value === 'string') {
                if (rule.minLength && value.length < rule.minLength) {
                    errors.push(rule.message || `${rule.field} must be at least ${rule.minLength} characters`);
                }
                if (rule.maxLength && value.length > rule.maxLength) {
                    errors.push(rule.message || `${rule.field} must be at most ${rule.maxLength} characters`);
                }
            }

            // Check number range
            if (rule.type === 'number' || typeof value === 'number') {
                if (rule.min !== undefined && value < rule.min) {
                    errors.push(rule.message || `${rule.field} must be at least ${rule.min}`);
                }
                if (rule.max !== undefined && value > rule.max) {
                    errors.push(rule.message || `${rule.field} must be at most ${rule.max}`);
                }
            }

            // Check pattern
            if (rule.pattern && !rule.pattern.test(String(value))) {
                errors.push(rule.message || `${rule.field} has invalid format`);
            }

            // Custom validation
            if (rule.custom && !rule.custom(value)) {
                errors.push(rule.message || `${rule.field} is invalid`);
            }
        }

        return errors;
    }
}

/**
 * Common validation rules
 */
export class ValidationRules {
    public static readonly PROJECT_NAME: ValidationRule = {
        field: 'project',
        required: true,
        type: 'string',
        minLength: 1,
        maxLength: 255,
        message: 'Project name must be between 1 and 255 characters'
    };

    public static readonly COORDINATES: ValidationRule[] = [
        {
            field: 'lat',
            required: true,
            type: 'number',
            min: -90,
            max: 90,
            message: 'Latitude must be between -90 and 90'
        },
        {
            field: 'lon',
            required: true,
            type: 'number',
            min: -180,
            max: 180,
            message: 'Longitude must be between -180 and 180'
        }
    ];

    public static readonly OBSERVATION_DATA: ValidationRule[] = [
        {
            field: 'data',
            required: true,
            type: 'array',
            custom: (value) => Array.isArray(value) && value.length > 0,
            message: 'Data must be a non-empty array'
        },
        ...ValidationRules.COORDINATES
    ];
}
