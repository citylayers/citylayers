import { BaseService } from './BaseService';
import { ObservationRepository } from '../repositories/ObservationRepository';
import { Point } from '../../../logic/observation';
import { QASet } from '../../../logic/question/question';

/**
 * Service layer for Observation business logic.
 * Orchestrates data access and transformations for observations and questions.
 */
export class ObservationService extends BaseService {
    private observationRepo: ObservationRepository;

    constructor(observationRepo: ObservationRepository) {
        super();
        this.observationRepo = observationRepo;
    }

    /**
     * Get question tree for a project (for pin page)
     */
    async getQuestionTree(projectName: string): Promise<QASet[]> {
        return this.execute(async () => {
            this.log('getQuestionTree', { projectName });

            this.validate(
                projectName !== undefined && projectName !== '',
                'Project name is required'
            );

            return await this.observationRepo.getCompleteQuestionTree(projectName);
        }, `Failed to get question tree: ${projectName}`);
    }

    /**
     * Get map data (questions + observations) for a project
     */
    async getMapData(projectName: string): Promise<{ qas: QASet[]; obs: Point[] }> {
        return this.execute(async () => {
            this.log('getMapData', { projectName });

            this.validate(
                projectName !== undefined && projectName !== '',
                'Project name is required'
            );

            // Execute in parallel for better performance
            const [qas, obs] = await Promise.all([
                this.observationRepo.getCompleteQuestionTree(projectName),
                this.observationRepo.getProjectObservations(projectName)
            ]);

            return { qas, obs };
        }, `Failed to get map data: ${projectName}`);
    }

    /**
     * Submit new observation
     */
    async submitObservation(
        lat: number,
        lon: number,
        data: any[],
        image?: string
    ): Promise<void> {
        return this.execute(async () => {
            this.log('submitObservation', { lat, lon, hasImage: !!image });

            this.validate(lat !== undefined && lon !== undefined, 'Coordinates are required');
            this.validate(data !== undefined && data.length > 0, 'Data is required');

            await this.observationRepo.submitObservation(lat, lon, data, image);
        }, 'Failed to submit observation');
    }
}
