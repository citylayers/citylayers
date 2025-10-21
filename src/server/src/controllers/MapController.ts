import { Request, Response, Router } from 'express';
import { BaseController } from './BaseController';
import { ObservationService } from '../services/ObservationService';
import { RoutePath, RouteParser } from '../config/RouteConstants';
import { ViewTemplate } from '../config/PathConstants';
import { AuthMiddleware } from '../middleware/AuthMiddleware';

/**
 * Controller for Map and Pin routes.
 */
export class MapController extends BaseController {
    private observationService: ObservationService;
    public router: Router;

    constructor(observationService: ObservationService) {
        super();
        this.observationService = observationService;
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // GET /pin/:project - Protected (allows browser access, blocks API scraping)
        this.router.get(
            RoutePath.PIN,
            AuthMiddleware.verifyInternalOrBrowser,
            this.asyncHandler(this.getPinPage.bind(this))
        );

        // GET /map/:project - Protected (allows browser access, blocks API scraping)
        this.router.get(
            RoutePath.MAP,
            AuthMiddleware.verifyInternalOrBrowser,
            this.asyncHandler(this.getMapPage.bind(this))
        );
    }

    /**
     * GET /pin/:project - Pin creation page
     */
    private async getPinPage(req: Request, res: Response): Promise<void> {
        const projectName = RouteParser.decodeProjectName(
            this.getParam(req, 'project')
        );

        const qas = await this.observationService.getQuestionTree(projectName);

        this.renderView(res, ViewTemplate.ADD_PIN, {
            data: qas,
            title: projectName
        });
    }

    /**
     * GET /map/:project - Map view page
     */
    private async getMapPage(req: Request, res: Response): Promise<void> {
        const projectName = RouteParser.decodeProjectName(
            this.getParam(req, 'project')
        );

        const mapData = await this.observationService.getMapData(projectName);

        this.renderView(res, ViewTemplate.KARTA, {
            data: mapData,
            title: projectName
        });
    }
}
