import { BaseService } from './BaseService';
import { TeamRepository } from '../repositories/TeamRepository';
import { TeamMember } from '../../../logic/teammember';

/**
 * Service layer for Team business logic.
 * Orchestrates data access and transformations for team members.
 */
export class TeamService extends BaseService {
    private teamRepo: TeamRepository;

    constructor(teamRepo: TeamRepository) {
        super();
        this.teamRepo = teamRepo;
    }

    /**
     * Get all team members with their projects and roles
     */
    async getAllTeamMembers(): Promise<TeamMember[]> {
        return this.execute(async () => {
            this.log('getAllTeamMembers');
            return await this.teamRepo.getAllTeamWithProjects();
        }, 'Failed to get team members');
    }

    /**
     * Get team members for a specific project
     */
    async getTeamByProject(projectName: string): Promise<TeamMember[]> {
        return this.execute(async () => {
            this.log('getTeamByProject', { projectName });

            this.validate(
                projectName !== undefined && projectName !== '',
                'Project name is required'
            );

            return await this.teamRepo.getTeamByProject(projectName);
        }, `Failed to get team for project: ${projectName}`);
    }
}
