import path from 'path';
import { Environment, EnvironmentMode } from './Environment';

/**
 * Enum for relative path segments used throughout the application.
 * All file system paths should use these constants.
 */
export enum PathSegment {
    PUBLIC = 'public',
    UPLOADS = 'uploads',
    HTML = 'html',
    PARENT_THREE_LEVELS = '../../../',
    PARENT_ONE_LEVEL = '../',
}

/**
 * Enum for view template names
 */
export enum ViewTemplate {
    LANDING = 'landing',
    ACCESSIBILITY = 'accessibility',
    PRIVACY = 'privacy',
    IMPRESSUM = 'impressum',
    POST_SUCCESS = 'postSuccess',
    TEAM = 'team',
    PROJECT_CARD = 'projectCard',
    ADD_PIN = 'addPin',
    KARTA = 'karta',
    SUNBURST_RESULT = 'sunburstResult',
    NOT_FOUND = '404',
}

/**
 * Centralized path configuration class.
 * Provides type-safe access to all file system paths used in the application.
 *
 * Usage:
 *   const paths = new PathConfig(__dirname);
 *   app.use(express.static(paths.getPublicPath()));
 */
export class PathConfig {
    private readonly baseDir: string;
    private readonly env: Environment;

    constructor(baseDir: string) {
        this.baseDir = baseDir;
        this.env = Environment.getInstance();
    }

    /**
     * Get the public directory path based on environment
     * Uses process.cwd() as base for more reliable path resolution
     */
    public getPublicPath(): string {
        // Use process.cwd() which is the project root when running from npm scripts
        const projectRoot = process.cwd();
        return path.join(projectRoot, PathSegment.PUBLIC);
    }

    /**
     * Get the uploads directory path
     */
    public getUploadsPath(): string {
        return path.join(this.getPublicPath(), PathSegment.UPLOADS);
    }

    /**
     * Get the views/templates directory path
     */
    public getViewsPath(): string {
        return path.join(this.getPublicPath(), PathSegment.HTML);
    }

    /**
     * Get relative path for static middleware (uploads)
     */
    public getStaticUploadsPath(): string {
        return path.join(this.getPublicPath(), PathSegment.UPLOADS);
    }

    /**
     * Get absolute path for file upload destination
     */
    public getUploadDestination(): string {
        return path.join(PathSegment.PUBLIC, PathSegment.UPLOADS, '/');
    }
}

/**
 * Factory class for creating PathConfig instances
 */
export class PathConfigFactory {
    private static instance: PathConfig;

    /**
     * Create or get PathConfig singleton
     * @param baseDir - Base directory (usually __dirname from app.ts)
     */
    public static create(baseDir: string): PathConfig {
        if (!PathConfigFactory.instance) {
            PathConfigFactory.instance = new PathConfig(baseDir);
        }
        return PathConfigFactory.instance;
    }

    /**
     * Get existing PathConfig instance
     * @throws Error if not initialized
     */
    public static getInstance(): PathConfig {
        if (!PathConfigFactory.instance) {
            throw new Error('PathConfig not initialized. Call create() first.');
        }
        return PathConfigFactory.instance;
    }
}
