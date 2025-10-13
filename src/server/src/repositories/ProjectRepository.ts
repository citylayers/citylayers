import { BaseRepository } from './BaseRepository';
import { DBConnection, QUERYS } from '../graph/graph';
import { QueryResult, RecordShape } from 'neo4j-driver';
import { ProjectInfo, ProjectPeriod, ProjectRecognition } from '../../../logic/projectInfo';
import { TeamMember, Role } from '../../../logic/teammember';
import { Illustration } from '../../../logic/illustration';
import { Partner } from '../../../logic/partner';

/**
 * Repository for Project-related data access.
 * Handles all Neo4j queries related to projects.
 */
export class ProjectRepository extends BaseRepository {
    constructor(db: DBConnection) {
        super(db);
    }

    /**
     * Get all projects
     */
    async getAllProjects(): Promise<QueryResult<RecordShape> | undefined> {
        return this.executeWithLogging('getAllProjects', () =>
            this.read(QUERYS.PROJECTS, {})
        );
    }

    /**
     * Get project by name
     */
    async getProjectByName(name: string): Promise<QueryResult<RecordShape> | undefined> {
        return this.executeWithLogging('getProjectByName', () =>
            this.read(QUERYS.PROJECT_NAME, { name })
        );
    }

    /**
     * Get project team members
     */
    async getProjectTeam(projectName: string): Promise<TeamMember[]> {
        const result = await this.executeWithLogging('getProjectTeam', () =>
            this.read(QUERYS.PROJECT_TEAM, { name: projectName })
        );

        if (!this.hasRecords(result)) {
            return [];
        }

        return result!.records.map(r => {
            const role = r.get('r').properties.value;
            const name = r.get('t').properties.name;
            const link = r.get('t').properties.link;
            return new TeamMember(name, link, role, false);
        });
    }

    /**
     * Get project illustrations
     */
    async getProjectIllustrations(projectName: string): Promise<Illustration[]> {
        const result = await this.executeWithLogging('getProjectIllustrations', () =>
            this.read(QUERYS.PROJECT_ILLUSTRATIONS, { name: projectName })
        );

        if (!this.hasRecords(result)) {
            return [];
        }

        return result!.records.map(r => {
            const name = r.get('illustration').properties.name;
            const caption = r.get('illustration').properties.caption;
            return new Illustration(name, '', caption);
        });
    }

    /**
     * Get project partners
     */
    async getProjectPartners(projectName: string): Promise<Partner[]> {
        const result = await this.executeWithLogging('getProjectPartners', () =>
            this.read(QUERYS.PROJECT_PARTNERS, { name: projectName })
        );

        if (!this.hasRecords(result)) {
            return [];
        }

        return result!.records.map(r => {
            const image = r.get('partner').properties.logo;
            const name = r.get('partner').properties.name;
            const link = r.get('partner').properties.link;
            return new Partner(name, image, link);
        });
    }

    /**
     * Get project recognitions/awards
     */
    async getProjectRecognitions(projectName: string): Promise<ProjectRecognition[]> {
        const result = await this.executeWithLogging('getProjectRecognitions', () =>
            this.read(QUERYS.PROJECT_RECOGNITION, { name: projectName })
        );

        if (!this.hasRecords(result)) {
            return [];
        }

        return result!.records.map(r => {
            const partner = r.get('partner').properties.value;
            const recognition = r.get('recognition').properties.name;
            return new ProjectRecognition(recognition, partner);
        });
    }

    /**
     * Get complete project info with all related data
     */
    async getCompleteProjectInfo(projectName: string): Promise<{
        info: ProjectInfo;
        team: TeamMember[];
        images: Illustration[];
        partners: Partner[];
        awards: ProjectRecognition[];
    }> {
        // Execute all queries in parallel for better performance
        const [projectResult, team, images, partners, awards] = await Promise.all([
            this.getProjectByName(projectName),
            this.getProjectTeam(projectName),
            this.getProjectIllustrations(projectName),
            this.getProjectPartners(projectName),
            this.getProjectRecognitions(projectName)
        ]);

        if (!this.hasRecords(projectResult)) {
            throw new Error(`Project not found: ${projectName}`);
        }

        const props = projectResult!.records[0].get('p').properties;
        const period = new ProjectPeriod(props.start_date, props.end_date);
        const info = new ProjectInfo(
            projectName,
            props.subtitle,
            props.description,
            period,
            props.mappable,
            awards,
            images,
            partners,
            team
        );

        return { info, team, images, partners, awards };
    }

    /**
     * Get basic project info (without related data)
     */
    async getBasicProjectInfo(projectName: string): Promise<ProjectInfo> {
        const result = await this.getProjectByName(projectName);

        if (!this.hasRecords(result)) {
            throw new Error(`Project not found: ${projectName}`);
        }

        const props = result!.records[0].get('p').properties;
        const period = new ProjectPeriod(props.start_date, props.end_date);

        return new ProjectInfo(
            projectName,
            props.subtitle,
            props.description,
            period,
            props.mappable
        );
    }
}
