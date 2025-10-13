/**
 * Base service class that all services should extend.
 * Provides common business logic utilities and patterns.
 *
 * Design Pattern: Service Layer Pattern
 */
export abstract class BaseService {
    /**
     * Validate business rules
     * @throws Error if validation fails
     */
    protected validate(condition: boolean, message: string): void {
        if (!condition) {
            throw new Error(message);
        }
    }

    /**
     * Execute operation with error handling
     */
    protected async execute<T>(operation: () => Promise<T>, errorMessage: string): Promise<T> {
        try {
            return await operation();
        } catch (error) {
            throw new Error(`${errorMessage}: ${error.message}`);
        }
    }

    /**
     * Log service operation
     */
    protected log(operation: string, details?: any): void {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${this.constructor.name}.${operation}`, details || '');
    }

    /**
     * Transform data using mapper function
     */
    protected transform<TInput, TOutput>(
        data: TInput[],
        mapper: (item: TInput) => TOutput
    ): TOutput[] {
        return data.map(mapper);
    }

    /**
     * Filter data using predicate
     */
    protected filter<T>(data: T[], predicate: (item: T) => boolean): T[] {
        return data.filter(predicate);
    }
}
