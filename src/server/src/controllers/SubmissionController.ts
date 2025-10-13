import { Request, Response, Router } from 'express';
import { BaseController } from './BaseController';
import { ObservationService } from '../services/ObservationService';
import { RoutePath } from '../config/RouteConstants';
import { ViewTemplate } from '../config/PathConstants';
import { HttpStatus, HttpMethod, HttpHeader, CorsValue } from '../constants/HttpStatus';

/**
 * Controller for data submission routes.
 */
export class SubmissionController extends BaseController {
    private observationService: ObservationService;
    public router: Router;

    constructor(observationService: ObservationService) {
        super();
        this.observationService = observationService;
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            RoutePath.SUBMIT,
            this.asyncHandler(this.submitObservation.bind(this))
        );
    }

    /**
     * POST /submit - Submit observation data
     */
    private async submitObservation(req: Request, res: Response): Promise<void> {
        res.set(HttpHeader.ACCESS_CONTROL_ALLOW_ORIGIN, CorsValue.ALLOW_ALL_ORIGINS);

        // Handle OPTIONS preflight
        if (req.method === HttpMethod.OPTIONS) {
            res.set(HttpHeader.ACCESS_CONTROL_ALLOW_METHODS, HttpMethod.POST);
            res.set(HttpHeader.ACCESS_CONTROL_ALLOW_HEADERS, HttpHeader.CONTENT_TYPE);
            res.set(HttpHeader.ACCESS_CONTROL_MAX_AGE, CorsValue.MAX_AGE_ONE_HOUR);
            res.status(HttpStatus.NO_CONTENT).send('');
            return;
        }

        const indata = this.getBody<any>(req);

        console.log('Data:', indata);

        await this.observationService.submitObservation(
            indata.coords.lat,
            indata.coords.lon,
            indata.data,
            indata.image
        );

        this.renderView(res, ViewTemplate.POST_SUCCESS);
    }
}
