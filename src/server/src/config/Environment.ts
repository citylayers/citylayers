import { config, configDotenv } from 'dotenv';

/**
 * Enum for all environment variable keys used in the application.
 * Prevents hardcoded strings and provides type safety.
 */
export enum EnvironmentKey {
    NODE_ENV = 'NODE_ENV',
    PORT = 'PORT',
    DOMAIN = 'DOMAIN',
    NEO4J_URI = 'NEO4J_URI',
    NEO4J_USER = 'NEO4J_USER',
    NEO4J_PWD = 'NEO4J_PWD',
}

/**
 * Enum for environment modes
 */
export enum EnvironmentMode {
    DEVELOPMENT = 'dev',
    PRODUCTION = 'production',
    TEST = 'test',
}

/**
 * Centralized environment configuration class.
 * Follows Singleton pattern to ensure single source of truth.
 *
 * Usage:
 *   const env = Environment.getInstance();
 *   const port = env.get(EnvironmentKey.PORT, '3000');
 */
export class Environment {
    private static instance: Environment;
    private initialized: boolean = false;

    private constructor() {}

    /**
     * Get singleton instance of Environment
     */
    public static getInstance(): Environment {
        if (!Environment.instance) {
            Environment.instance = new Environment();
        }
        return Environment.instance;
    }

    /**
     * Initialize environment variables from .env file
     * @param envFilePath - Optional custom path to .env file
     */
    public init(envFilePath?: string): void {
        if (!this.initialized) {
            if (envFilePath) {
                configDotenv({ path: envFilePath });
            } else {
                // Load .dev.env for development, .env otherwise
                const defaultPath = this.getMode() === EnvironmentMode.DEVELOPMENT
                    ? '.dev.env'
                    : '.env';
                configDotenv({ path: defaultPath });
            }
            this.initialized = true;
        }
    }

    /**
     * Get environment variable value with optional default
     * @param key - Environment variable key from EnvironmentKey enum
     * @param defaultValue - Optional default value if key not found
     * @returns Environment variable value or default
     */
    public get(key: EnvironmentKey, defaultValue?: string): string {
        return process.env[key] || defaultValue || '';
    }

    /**
     * Get environment variable as number
     * @param key - Environment variable key
     * @param defaultValue - Optional default value
     * @returns Parsed number or default
     */
    public getNumber(key: EnvironmentKey, defaultValue?: number): number {
        const value = this.get(key);
        const parsed = parseInt(value, 10);
        return isNaN(parsed) ? (defaultValue || 0) : parsed;
    }

    /**
     * Get environment variable as boolean
     * @param key - Environment variable key
     * @param defaultValue - Optional default value
     * @returns Boolean value
     */
    public getBoolean(key: EnvironmentKey, defaultValue: boolean = false): boolean {
        const value = this.get(key).toLowerCase();
        if (value === 'true' || value === '1') return true;
        if (value === 'false' || value === '0') return false;
        return defaultValue;
    }

    /**
     * Check if environment variable exists
     * @param key - Environment variable key
     * @returns true if exists, false otherwise
     */
    public has(key: EnvironmentKey): boolean {
        return process.env[key] !== undefined;
    }

    /**
     * Get current environment mode
     * @returns EnvironmentMode enum value
     */
    public getMode(): EnvironmentMode {
        const mode = this.get(EnvironmentKey.NODE_ENV);
        switch (mode) {
            case 'dev':
            case 'development':
                return EnvironmentMode.DEVELOPMENT;
            case 'production':
            case 'prod':
                return EnvironmentMode.PRODUCTION;
            case 'test':
                return EnvironmentMode.TEST;
            default:
                return EnvironmentMode.DEVELOPMENT;
        }
    }

    /**
     * Check if running in development mode
     */
    public isDevelopment(): boolean {
        return this.getMode() === EnvironmentMode.DEVELOPMENT;
    }

    /**
     * Check if running in production mode
     */
    public isProduction(): boolean {
        return this.getMode() === EnvironmentMode.PRODUCTION;
    }

    /**
     * Check if running in test mode
     */
    public isTest(): boolean {
        return this.getMode() === EnvironmentMode.TEST;
    }

    /**
     * Validate that all required environment variables are set
     * @param required - Array of required EnvironmentKey values
     * @throws Error if any required variable is missing
     */
    public validateRequired(required: EnvironmentKey[]): void {
        const missing = required.filter(key => !this.has(key));
        if (missing.length > 0) {
            throw new Error(
                `Missing required environment variables: ${missing.join(', ')}`
            );
        }
    }
}
