import { DBConnection } from '../graph/graph';
import { QueryResult, RecordShape } from 'neo4j-driver';

/**
 * Base repository class for data access.
 * Encapsulates database operations following Repository Pattern.
 *
 * Design Pattern: Repository Pattern
 */
export abstract class BaseRepository {
    protected db: DBConnection;

    constructor(db: DBConnection) {
        this.db = db;
    }

    /**
     * Execute read query
     */
    protected async read(query: string, params: any): Promise<QueryResult<RecordShape> | undefined> {
        try {
            return await this.db.read(query, params);
        } catch (error) {
            console.error(`Repository read error: ${error.message}`, { query, params });
            throw error;
        }
    }

    /**
     * Execute write query
     */
    protected async write(query: string, params: any): Promise<QueryResult<RecordShape> | undefined> {
        try {
            return await this.db.write(query, params);
        } catch (error) {
            console.error(`Repository write error: ${error.message}`, { query, params });
            throw error;
        }
    }

    /**
     * Get single record property
     */
    protected getRecordProperty<T>(result: QueryResult<RecordShape>, index: number, key: string): T {
        if (!result || !result.records || result.records.length === 0) {
            throw new Error('No records found');
        }
        return result.records[index].get(key) as T;
    }

    /**
     * Get all records mapped by key
     */
    protected mapRecords<T>(result: QueryResult<RecordShape>, key: string): T[] {
        if (!result || !result.records) {
            return [];
        }
        return result.records.map(record => record.get(key) as T);
    }

    /**
     * Check if result has records
     */
    protected hasRecords(result: QueryResult<RecordShape> | undefined): boolean {
        return result !== undefined && result.records && result.records.length > 0;
    }

    /**
     * Get record count
     */
    protected getRecordCount(result: QueryResult<RecordShape> | undefined): number {
        return result?.records?.length || 0;
    }

    /**
     * Execute query with logging
     */
    protected async executeWithLogging<T>(
        operation: string,
        executor: () => Promise<T>
    ): Promise<T> {
        const startTime = Date.now();
        try {
            const result = await executor();
            const duration = Date.now() - startTime;
            console.log(`[Repository] ${this.constructor.name}.${operation} completed in ${duration}ms`);
            return result;
        } catch (error) {
            const duration = Date.now() - startTime;
            console.error(`[Repository] ${this.constructor.name}.${operation} failed after ${duration}ms`, error);
            throw error;
        }
    }
}
