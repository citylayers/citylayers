import { BaseRepository } from './BaseRepository';
import { DBConnection, QUERYS } from '../graph/graph';
import { QueryResult, RecordShape } from 'neo4j-driver';
import { TeamMember, Role } from '../../../logic/teammember';

/**
 * Repository for Team-related data access.
 * Handles all Neo4j queries related to team members.
 */
export class TeamRepository extends BaseRepository {
    constructor(db: DBConnection) {
        super(db);
    }

    /**
     * Get all team members with their projects
     */
    async getAllTeamWithProjects(): Promise<TeamMember[]> {
        const result = await this.executeWithLogging('getAllTeamWithProjects', () =>
            this.read(QUERYS.TEAM_PROJECT, {})
        );

        if (!this.hasRecords(result)) {
            return [];
        }

        const team: TeamMember[] = [];

        result!.records.forEach(r => {
            // Skip external team members
            if (r.get('t').properties.external === true) {
                return;
            }

            const name = r.get('t').properties.name;
            const link = r.get('t').properties.link;

            // Check if team member already exists
            let teamMember = team.find(t => t.name === name);

            if (!teamMember) {
                teamMember = new TeamMember(name, link);
                team.push(teamMember);
            }

            // Add role to team member
            const roleValue = r.get('r').properties.value;
            const projectName = r.get('p').properties.name;
            teamMember.role.push(new Role(roleValue, projectName));
        });

        return team;
    }

    /**
     * Get team members for a specific project
     */
    async getTeamByProject(projectName: string): Promise<TeamMember[]> {
        const result = await this.executeWithLogging('getTeamByProject', () =>
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
}
