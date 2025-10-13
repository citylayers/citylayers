import { Environment, EnvironmentKey } from './Environment';

/**
 * Enum for database session modes
 */
export enum DatabaseMode {
    READ = 0,
    WRITE = 1,
}

/**
 * Database connection configuration class.
 * Encapsulates all Neo4j connection settings and validation.
 *
 * Usage:
 *   const dbConfig = DatabaseConfig.fromEnvironment();
 *   const uri = dbConfig.getUri();
 */
export class DatabaseConfig {
    private readonly uri: string;
    private readonly user: string;
    private readonly password: string;
    private readonly disableLosslessIntegers: boolean;
    private readonly defaultTimeout: number;

    constructor(
        uri: string,
        user: string,
        password: string,
        disableLosslessIntegers: boolean = true,
        defaultTimeout: number = 3000
    ) {
        this.uri = uri;
        this.user = user;
        this.password = password;
        this.disableLosslessIntegers = disableLosslessIntegers;
        this.defaultTimeout = defaultTimeout;
    }

    /**
     * Create DatabaseConfig from environment variables
     * @throws Error if required variables are missing
     */
    public static fromEnvironment(): DatabaseConfig {
        const env = Environment.getInstance();

        // Ensure environment is initialized
        if (!env.has(EnvironmentKey.NEO4J_URI)) {
            env.init();
        }

        // Validate required variables exist
        env.validateRequired([
            EnvironmentKey.NEO4J_URI,
            EnvironmentKey.NEO4J_USER,
            EnvironmentKey.NEO4J_PWD,
        ]);

        return new DatabaseConfig(
            env.get(EnvironmentKey.NEO4J_URI),
            env.get(EnvironmentKey.NEO4J_USER),
            env.get(EnvironmentKey.NEO4J_PWD)
        );
    }

    /**
     * Get database URI
     */
    public getUri(): string {
        return this.uri;
    }

    /**
     * Get database username
     */
    public getUser(): string {
        return this.user;
    }

    /**
     * Get database password
     */
    public getPassword(): string {
        return this.password;
    }

    /**
     * Get lossless integers setting
     */
    public shouldDisableLosslessIntegers(): boolean {
        return this.disableLosslessIntegers;
    }

    /**
     * Get default query timeout in milliseconds
     */
    public getDefaultTimeout(): number {
        return this.defaultTimeout;
    }

    /**
     * Validate that all configuration values are present
     * @throws Error if any value is missing
     */
    public validate(): void {
        if (!this.uri || !this.user || !this.password) {
            throw new Error(
                'Database configuration incomplete. Check NEO4J_URI, NEO4J_USER, and NEO4J_PWD environment variables.'
            );
        }
    }

    /**
     * Get connection string for logging (password masked)
     */
    public getConnectionStringMasked(): string {
        return `${this.uri} (user: ${this.user})`;
    }
}

/**
 * Database session configuration
 */
export interface SessionConfig {
    mode: DatabaseMode;
    timeout?: number;
}

/**
 * Database query result metadata
 */
export interface QueryMetadata {
    executionTime?: number;
    recordCount?: number;
}
