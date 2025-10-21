import { Request, Response, Router } from 'express';
import { BaseController } from './BaseController';
import { RoutePath } from '../config/RouteConstants';
import { ViewTemplate } from '../config/PathConstants';
import { HttpStatus } from '../constants/HttpStatus';

/**
 * Controller for static pages (legal, info, etc.)
 */
export class StaticController extends BaseController {
    public router: Router;

    constructor() {
        super();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(
            RoutePath.ACCESSIBILITY,
            this.asyncHandler(this.getAccessibility.bind(this))
        );

        this.router.get(
            RoutePath.PRIVACY,
            this.asyncHandler(this.getPrivacy.bind(this))
        );

        this.router.get(
            RoutePath.IMPRESSUM,
            this.asyncHandler(this.getImpressum.bind(this))
        );

        this.router.get(
            RoutePath.SUCCESS,
            this.asyncHandler(this.getSuccess.bind(this))
        );

        this.router.get(
            RoutePath.SUNBURST,
            this.asyncHandler(this.getSunburst.bind(this))
        );

        this.router.get(
            RoutePath.ROBOTS,
            this.asyncHandler(this.getRobots.bind(this))
        );
    }

    /**
     * GET /accessibility
     */
    private async getAccessibility(req: Request, res: Response): Promise<void> {
        this.renderView(res, ViewTemplate.ACCESSIBILITY);
    }

    /**
     * GET /privacy
     */
    private async getPrivacy(req: Request, res: Response): Promise<void> {
        this.renderView(res, ViewTemplate.PRIVACY);
    }

    /**
     * GET /impressum
     */
    private async getImpressum(req: Request, res: Response): Promise<void> {
        this.renderView(res, ViewTemplate.IMPRESSUM);
    }

    /**
     * GET /success
     */
    private async getSuccess(req: Request, res: Response): Promise<void> {
        this.renderView(res, ViewTemplate.POST_SUCCESS);
    }

    /**
     * GET /sunburst
     */
    private async getSunburst(req: Request, res: Response): Promise<void> {
        this.renderView(res, ViewTemplate.SUNBURST_RESULT);
    }

    /**
     * GET /robots.txt
     */
    private async getRobots(req: Request, res: Response): Promise<void> {
        res.type('text/plain');
        res.send('User-agent: *\nDisallow: /');
    }
}
