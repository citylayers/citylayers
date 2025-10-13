import express from 'express';
import * as fs from 'node:fs';

// Configuration
import { Environment, EnvironmentKey } from './config/Environment';
import { PathConfigFactory } from './config/PathConstants';

// Database
import { DBConnection } from './graph/graph';

// Repositories
import { ProjectRepository } from './repositories/ProjectRepository';
import { TeamRepository } from './repositories/TeamRepository';
import { ObservationRepository } from './repositories/ObservationRepository';

// Services
import { ProjectService } from './services/ProjectService';
import { TeamService } from './services/TeamService';
import { ObservationService } from './services/ObservationService';

// Controllers
import { ProjectController } from './controllers/ProjectController';
import { TeamController } from './controllers/TeamController';
import { MapController } from './controllers/MapController';
import { SubmissionController } from './controllers/SubmissionController';
import { StaticController } from './controllers/StaticController';
import { UploadController } from './controllers/UploadController';

// Middleware
import { CorsMiddleware } from './middleware/CorsMiddleware';
import { ErrorMiddleware } from './middleware/ErrorMiddleware';
import { UploadMiddleware } from './middleware/UploadMiddleware';

/**
 * Application bootstrap class.
 * Implements dependency injection and clean architecture patterns.
 */
class Application {
    private app: express.Application;
    private env: Environment;
    private db: DBConnection;

    constructor() {
        this.app = express();
        this.env = Environment.getInstance();
        this.env.init();
        this.db = new DBConnection();
    }

    /**
     * Initialize application
     */
    public async initialize(): Promise<void> {
        // Initialize database
        await this.db.init();

        // Setup Express
        this.setupExpress();

        // Setup middleware
        this.setupMiddleware();

        // Setup routes
        this.setupRoutes();

        // Setup error handling
        this.setupErrorHandling();
    }

    /**
     * Setup Express configuration
     */
    private setupExpress(): void {
        const paths = PathConfigFactory.create(__dirname);

        // View engine
        this.app.set('view engine', 'ejs');
        this.app.set('views', paths.getViewsPath());

        // Static files
        this.app.use(express.static(paths.getPublicPath()));
        this.app.use(express.static(paths.getStaticUploadsPath()));

        // Body parser
        this.app.use(express.json());

        // Ensure uploads directory exists
        const uploadsDir = paths.getUploadsPath();
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

        console.log('ENV:', this.env.getMode());
    }

    /**
     * Setup middleware
     */
    private setupMiddleware(): void {
        // CORS
        this.app.use(CorsMiddleware.handle);
    }

    /**
     * Setup all routes using controllers
     */
    private setupRoutes(): void {
        // Initialize repositories
        const projectRepo = new ProjectRepository(this.db);
        const teamRepo = new TeamRepository(this.db);
        const observationRepo = new ObservationRepository(this.db);

        // Initialize services
        const projectService = new ProjectService(projectRepo);
        const teamService = new TeamService(teamRepo);
        const observationService = new ObservationService(observationRepo);

        // Initialize controllers
        const projectController = new ProjectController(projectService);
        const teamController = new TeamController(teamService);
        const mapController = new MapController(observationService);
        const submissionController = new SubmissionController(observationService);
        const staticController = new StaticController();

        // Setup upload
        const paths = PathConfigFactory.getInstance();
        const upload = UploadMiddleware.initialize(paths);
        const uploadController = new UploadController(upload);

        // Register routes
        this.app.use(projectController.router);
        this.app.use(teamController.router);
        this.app.use(mapController.router);
        this.app.use(submissionController.router);
        this.app.use(staticController.router);
        this.app.use(uploadController.router);
    }

    /**
     * Setup error handling
     */
    private setupErrorHandling(): void {
        // 404 handler (must be after all routes)
        this.app.use(ErrorMiddleware.notFound);

        // Global error handler (must be last)
        this.app.use(ErrorMiddleware.handleError);
    }

    /**
     * Start the server
     */
    public start(): void {
        const port = this.env.getNumber(EnvironmentKey.PORT, 3000);
        const domain = this.env.get(EnvironmentKey.DOMAIN, 'localhost');

        this.app.listen(port, () => {
            console.log(`🚀 Express is listening at ${domain}:${port}`);
        });
    }
}

// Bootstrap application
const application = new Application();
application.initialize().then(() => {
    application.start();
}).catch(err => {
    console.error('Failed to start application:', err);
    process.exit(1);
});
