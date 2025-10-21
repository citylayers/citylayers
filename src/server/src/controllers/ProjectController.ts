import { Request, Response, Router } from 'express';
import { BaseController } from './BaseController';
import { ProjectService } from '../services/ProjectService';
import { RoutePath, RouteParser } from '../config/RouteConstants';
import { ViewTemplate } from '../config/PathConstants';
import { AuthMiddleware } from '../middleware/AuthMiddleware';

/**
 * Controller for Project-related routes.
 * Handles all HTTP requests related to projects.
 */
export class ProjectController extends BaseController {
    private projectService: ProjectService;
    public router: Router;

    constructor(projectService: ProjectService) {
        super();
        this.projectService = projectService;
        this.router = Router();
        this.initializeRoutes();
    }

    /**
     * Initialize all project routes
     */
    private initializeRoutes(): void {
        // Landing page - all projects
        this.router.get(
            RoutePath.ROOT,
            this.asyncHandler(this.getAllProjects.bind(this))
        );

        // Get projects list (API) - Protected
        this.router.get(
            RoutePath.GET_PROJECTS,
            AuthMiddleware.verifyInternalAccess,
            this.asyncHandler(this.getProjectsList.bind(this))
        );

        // Get specific project details
        this.router.get(
            RoutePath.PROJECT_DETAIL,
            this.asyncHandler(this.getProjectDetail.bind(this))
        );

        // Get project team (API) - Protected
        this.router.get(
            RoutePath.PROJECT_TEAM,
            AuthMiddleware.verifyInternalAccess,
            this.asyncHandler(this.getProjectTeam.bind(this))
        );

        // Get project illustrations (API) - Protected
        this.router.get(
            RoutePath.PROJECT_ILLUSTRATIONS,
            AuthMiddleware.verifyInternalAccess,
            this.asyncHandler(this.getProjectIllustrations.bind(this))
        );

        // Get project partners (API) - Protected
        this.router.get(
            RoutePath.PROJECT_PARTNERS,
            AuthMiddleware.verifyInternalAccess,
            this.asyncHandler(this.getProjectPartners.bind(this))
        );

        // Get project recognitions (API) - Protected
        this.router.get(
            RoutePath.PROJECT_RECOGNITIONS,
            AuthMiddleware.verifyInternalAccess,
            this.asyncHandler(this.getProjectRecognitions.bind(this))
        );

        // Get project info (API) - Protected
        this.router.get(
            RoutePath.PROJECT_INFO,
            AuthMiddleware.verifyInternalAccess,
            this.asyncHandler(this.getProjectInfo.bind(this))
        );
    }

    /**
     * GET / - Landing page with all projects
     */
    private async getAllProjects(req: Request, res: Response): Promise<void> {
        const projects = await this.projectService.getAllProjects();
        this.renderView(res, ViewTemplate.LANDING, {
            data: projects,
            title: 'CityLayers'
        });
    }

    /**
     * GET /getprojects - API endpoint for projects list
     */
    private async getProjectsList(req: Request, res: Response): Promise<void> {
        const projects = await this.projectService.getAllProjects();
        this.sendSuccess(res, projects);
    }

    /**
     * GET /project/:project - Project detail page
     */
    private async getProjectDetail(req: Request, res: Response): Promise<void> {
        const projectName = RouteParser.decodeProjectName(
            this.getParam(req, 'project')
        );

        const project = await this.projectService.getCompleteProject(projectName);

        this.renderView(res, ViewTemplate.PROJECT_CARD, {
            data: project,
            title: projectName
        });
    }

    /**
     * GET /project/team/:project - Get project team (API)
     */
    private async getProjectTeam(req: Request, res: Response): Promise<void> {
        const projectName = RouteParser.decodeProjectName(
            this.getParam(req, 'project')
        );

        const team = await this.projectService.getProjectTeam(projectName);
        this.sendSuccess(res, team);
    }

    /**
     * GET /project/illustrations/:project - Get project illustrations (API)
     */
    private async getProjectIllustrations(req: Request, res: Response): Promise<void> {
        const projectName = RouteParser.decodeProjectName(
            this.getParam(req, 'project')
        );

        const illustrations = await this.projectService.getProjectIllustrations(projectName);
        this.sendSuccess(res, illustrations);
    }

    /**
     * GET /project/partners/:project - Get project partners (API)
     */
    private async getProjectPartners(req: Request, res: Response): Promise<void> {
        const projectName = RouteParser.decodeProjectName(
            this.getParam(req, 'project')
        );

        const partners = await this.projectService.getProjectPartners(projectName);
        this.sendSuccess(res, partners);
    }

    /**
     * GET /project/recognitions/:project - Get project recognitions (API)
     */
    private async getProjectRecognitions(req: Request, res: Response): Promise<void> {
        const projectName = RouteParser.decodeProjectName(
            this.getParam(req, 'project')
        );

        const recognitions = await this.projectService.getProjectRecognitions(projectName);
        this.sendSuccess(res, recognitions);
    }

    /**
     * GET /project/projectinfo/:project - Get project info (API)
     */
    private async getProjectInfo(req: Request, res: Response): Promise<void> {
        const projectName = RouteParser.decodeProjectName(
            this.getParam(req, 'project')
        );

        const info = await this.projectService.getBasicProjectInfo(projectName);
        this.sendSuccess(res, info);
    }
}
