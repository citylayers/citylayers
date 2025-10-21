import { Request, Response, Router } from 'express';
import { BaseController } from './BaseController';
import { TeamService } from '../services/TeamService';
import { RoutePath } from '../config/RouteConstants';
import { ViewTemplate } from '../config/PathConstants';

/**
 * Controller for Team-related routes.
 */
export class TeamController extends BaseController {
    private teamService: TeamService;
    public router: Router;

    constructor(teamService: TeamService) {
        super();
        this.teamService = teamService;
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(
            RoutePath.TEAM,
            this.asyncHandler(this.getTeamPage.bind(this))
        );
    }

    /**
     * GET /team - Team page with all members
     */
    private async getTeamPage(req: Request, res: Response): Promise<void> {
        const team = await this.teamService.getAllTeamMembers();
        this.renderView(res, ViewTemplate.TEAM, { data: team });
    }
}
