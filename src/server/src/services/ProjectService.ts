import { BaseService } from './BaseService';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { Project } from '../../../logic/project';
import { ProjectInfo } from '../../../logic/projectInfo';
import { Config } from '../../../logic/config';

/**
 * Service layer for Project business logic.
 * Orchestrates data access and transformations for projects.
 */
export class ProjectService extends BaseService {
    private projectRepo: ProjectRepository;

    constructor(projectRepo: ProjectRepository) {
        super();
        this.projectRepo = projectRepo;
    }

    /**
     * Get all projects for landing page
     */
    async getAllProjects(): Promise<Project[]> {
        return this.execute(async () => {
            this.log('getAllProjects');

            const result = await this.projectRepo.getAllProjects();

            if (!result || !result.records) {
                return [];
            }

            return result.records.map(rec => {
                const props = rec.get('p').properties;
                const info = new ProjectInfo(
                    props.name,
                    props.subtitle,
                    props.description,
                    { start: props.start_date, end: props.end_date } as any,
                    props.mappable,
                    [], [], [], []
                );
                return new Project(info, undefined);
            });
        }, 'Failed to get all projects');
    }

    /**
     * Get complete project with all related data
     */
    async getCompleteProject(projectName: string): Promise<Project> {
        return this.execute(async () => {
            this.log('getCompleteProject', { projectName });

            this.validate(
                projectName !== undefined && projectName !== '',
                'Project name is required'
            );

            const data = await this.projectRepo.getCompleteProjectInfo(projectName);
            const config = new Config('', '', '', []);

            return new Project(data.info, config);
        }, `Failed to get project: ${projectName}`);
    }

    /**
     * Get basic project information
     */
    async getBasicProjectInfo(projectName: string): Promise<ProjectInfo> {
        return this.execute(async () => {
            this.log('getBasicProjectInfo', { projectName });

            this.validate(
                projectName !== undefined && projectName !== '',
                'Project name is required'
            );

            return await this.projectRepo.getBasicProjectInfo(projectName);
        }, `Failed to get project info: ${projectName}`);
    }

    /**
     * Get project team members
     */
    async getProjectTeam(projectName: string) {
        return this.execute(async () => {
            this.log('getProjectTeam', { projectName });
            return await this.projectRepo.getProjectTeam(projectName);
        }, `Failed to get project team: ${projectName}`);
    }

    /**
     * Get project illustrations
     */
    async getProjectIllustrations(projectName: string) {
        return this.execute(async () => {
            this.log('getProjectIllustrations', { projectName });
            return await this.projectRepo.getProjectIllustrations(projectName);
        }, `Failed to get project illustrations: ${projectName}`);
    }

    /**
     * Get project partners
     */
    async getProjectPartners(projectName: string) {
        return this.execute(async () => {
            this.log('getProjectPartners', { projectName });
            return await this.projectRepo.getProjectPartners(projectName);
        }, `Failed to get project partners: ${projectName}`);
    }

    /**
     * Get project recognitions
     */
    async getProjectRecognitions(projectName: string) {
        return this.execute(async () => {
            this.log('getProjectRecognitions', { projectName });
            return await this.projectRepo.getProjectRecognitions(projectName);
        }, `Failed to get project recognitions: ${projectName}`);
    }
}
