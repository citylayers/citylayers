import { BaseRepository } from './BaseRepository';
import { DBConnection, QUERYS, GRAPH_KEYS } from '../graph/graph';
import { QueryResult, RecordShape } from 'neo4j-driver';
import { Place, Observation, Point } from '../../../logic/observation';
import { QAPair, QASet } from '../../../logic/question/question';
import onlyUnique from '../graph/utils';

/**
 * Repository for Observation-related data access.
 * Handles all Neo4j queries related to observations, questions, and answers.
 */
export class ObservationRepository extends BaseRepository {
    constructor(db: DBConnection) {
        super(db);
    }

    /**
     * Get questions for a project (Q1 query)
     */
    async getProjectQuestions(projectName: string): Promise<QASet[]> {
        const result = await this.executeWithLogging('getProjectQuestions', () =>
            this.read(QUERYS.Q1, { name: projectName })
        );

        if (!this.hasRecords(result)) {
            return [];
        }

        return result!.records.map(r => {
            const q = new QASet(
                r.get(GRAPH_KEYS.RESULT).step,
                r.get(GRAPH_KEYS.RESULT).category,
                [r.get(GRAPH_KEYS.RESULT).content]
            );
            q.convertContent();
            return q;
        });
    }

    /**
     * Get follow-up questions (Q2 query)
     */
    async getFollowupQuestions(answerIds: string[]): Promise<QueryResult<RecordShape> | undefined> {
        if (answerIds.length === 0) {
            return undefined;
        }

        const idsString = answerIds.map(id => `"${id}"`).join(',');
        const query = QUERYS.Q2.replace('$ids', idsString);

        return this.executeWithLogging('getFollowupQuestions', () =>
            this.read(query, {})
        );
    }

    /**
     * Get complete question tree with follow-ups
     */
    async getCompleteQuestionTree(projectName: string): Promise<QASet[]> {
        // Get initial questions
        let qaSets = await this.getProjectQuestions(projectName);

        // Get first level follow-ups
        const firstLevelIds = qaSets
            .map(r => r.content.map(qa => qa.answer.id)[0])
            .filter(id => id !== undefined);

        if (firstLevelIds.length > 0) {
            const followup1 = await this.getFollowupQuestions(firstLevelIds);

            if (this.hasRecords(followup1)) {
                qaSets = this.addFollowupQuestions(qaSets, followup1!);
            }
        }

        // Get second level follow-ups
        const secondLevelIds = qaSets
            .filter(r => r.content.filter(qa => qa.prev_id !== undefined).length > 0)
            .flatMap(r => r.content
                .filter(qa => qa.prev_id !== undefined)
                .flatMap(qa => qa.answer.getIds())
            );

        if (secondLevelIds.length > 0) {
            const followup2 = await this.getFollowupQuestions(secondLevelIds);

            if (this.hasRecords(followup2)) {
                qaSets = this.addSecondLevelFollowups(qaSets, followup2!);
            }
        }

        return qaSets;
    }

    /**
     * Add follow-up questions to QA sets
     */
    private addFollowupQuestions(
        qaSets: QASet[],
        followupResult: QueryResult<RecordShape>
    ): QASet[] {
        return qaSets.map(qaset => {
            const followup = followupResult.records.filter(r =>
                qaset.content
                    .map(qapair => qapair.answer.id)
                    .includes(r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.PREV])
            );

            if (followup.length === 0) {
                return qaset;
            }

            followup.map(r => {
                const q = new QAPair(
                    r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.CONTENT][GRAPH_KEYS.QUESTION],
                    r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.CONTENT][GRAPH_KEYS.ANSWER],
                    r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.PREV]
                );
                q.convertContent();
                return q;
            }).forEach(q => {
                qaset.add(q);
            });

            return qaset;
        });
    }

    /**
     * Add second level follow-up questions
     */
    private addSecondLevelFollowups(
        qaSets: QASet[],
        followupResult: QueryResult<RecordShape>
    ): QASet[] {
        return qaSets.map(qaset => {
            if (qaset.content.filter(qa => qa.prev_id !== undefined).length === 0) {
                return qaset;
            }

            const followup = followupResult.records.filter(r =>
                qaset.content
                    .filter((q, i) => i > 0)
                    .map(qapair => qapair.answer.getIds())[0]
                    ?.includes(r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.PREV])
            );

            if (followup.length === 0) {
                return qaset;
            }

            followup.map(r => {
                const q = new QAPair(
                    r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.CONTENT][GRAPH_KEYS.QUESTION],
                    r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.CONTENT][GRAPH_KEYS.ANSWER],
                    r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.PREV]
                );
                q.convertContent();
                return q;
            }).forEach(q => {
                qaset.add(q);
            });

            return qaset;
        });
    }

    /**
     * Get observations for a project
     */
    async getProjectObservations(projectName: string): Promise<Point[]> {
        const result = await this.executeWithLogging('getProjectObservations', () =>
            this.read(QUERYS.OBS, { name: projectName })
        );

        if (!this.hasRecords(result)) {
            return [];
        }

        const uniquePlaceIds = result!.records
            .map(r => r.get(GRAPH_KEYS.RESULT).id)
            .filter(onlyUnique);

        return uniquePlaceIds.map(placeId => {
            const records = result!.records.filter(
                r => r.get(GRAPH_KEYS.RESULT).id === placeId
            );
            const record = records[0].get(GRAPH_KEYS.RESULT);
            const place = new Place(placeId, record.lat, record.lon);
            const observations = records.map(r =>
                new Observation(
                    r.get(GRAPH_KEYS.RESULT).obs,
                    r.get(GRAPH_KEYS.RESULT).answer
                )
            );
            return new Point(place, observations);
        });
    }

    /**
     * Submit new observation
     */
    async submitObservation(
        lat: number,
        lon: number,
        data: any[],
        image?: string
    ): Promise<QueryResult<RecordShape> | undefined> {
        const query = image ? QUERYS.SUBMIT_BETA : QUERYS.SUBMIT_NO_IMAGE;

        return this.executeWithLogging('submitObservation', () =>
            this.write(query, { lat, lon, data, image })
        );
    }
}
