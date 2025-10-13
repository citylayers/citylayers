import { GraphKey, NodeLabel, RelationshipType, NodeProperty } from '../constants/GraphKeys';

/**
 * Fluent interface for building type-safe Cypher queries.
 * Implements Builder Pattern for complex query construction.
 *
 * Usage:
 *   const query = new QueryBuilder()
 *     .match(NodeLabel.PROJECT)
 *     .where({ name: 'MyProject' })
 *     .return(GraphKey.PROJECT)
 *     .build();
 */
export class QueryBuilder {
    private matchClauses: string[] = [];
    private whereClauses: string[] = [];
    private returnClauses: string[] = [];
    private orderByClauses: string[] = [];
    private limitValue?: number;
    private skipValue?: number;
    private withClauses: string[] = [];

    /**
     * Add MATCH clause
     */
    public match(pattern: string): this {
        this.matchClauses.push(`MATCH ${pattern}`);
        return this;
    }

    /**
     * Match a node by label and variable
     */
    public matchNode(variable: string, label: NodeLabel, properties?: Record<string, any>): this {
        let pattern = `(${variable}:${label}`;

        if (properties) {
            const props = Object.entries(properties)
                .map(([key, value]) => `${key}: ${this.formatValue(value)}`)
                .join(', ');
            pattern += ` {${props}}`;
        }

        pattern += ')';
        this.matchClauses.push(`MATCH ${pattern}`);
        return this;
    }

    /**
     * Match a relationship
     */
    public matchRelationship(
        from: string,
        to: string,
        relationship: RelationshipType,
        variable?: string,
        direction: 'out' | 'in' | 'both' = 'out'
    ): this {
        const relVar = variable ? `[${variable}:${relationship}]` : `[:${relationship}]`;

        let pattern = '';
        if (direction === 'out') {
            pattern = `(${from})-${relVar}->(${to})`;
        } else if (direction === 'in') {
            pattern = `(${from})<-${relVar}-(${to})`;
        } else {
            pattern = `(${from})-${relVar}-(${to})`;
        }

        this.matchClauses.push(`MATCH ${pattern}`);
        return this;
    }

    /**
     * Add WHERE clause
     */
    public where(conditions: Record<string, any>): this {
        const clauses = Object.entries(conditions).map(([key, value]) => {
            return `${key} = ${this.formatValue(value)}`;
        });

        this.whereClauses.push(...clauses);
        return this;
    }

    /**
     * Add custom WHERE clause
     */
    public whereRaw(condition: string): this {
        this.whereClauses.push(condition);
        return this;
    }

    /**
     * Add WITH clause
     */
    public with(variables: string[]): this {
        this.withClauses.push(`WITH ${variables.join(', ')}`);
        return this;
    }

    /**
     * Add RETURN clause
     */
    public return(...variables: string[]): this {
        this.returnClauses.push(...variables);
        return this;
    }

    /**
     * Add ORDER BY clause
     */
    public orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
        this.orderByClauses.push(`${field} ${direction}`);
        return this;
    }

    /**
     * Add LIMIT clause
     */
    public limit(count: number): this {
        this.limitValue = count;
        return this;
    }

    /**
     * Add SKIP clause
     */
    public skip(count: number): this {
        this.skipValue = count;
        return this;
    }

    /**
     * Build the final query string
     */
    public build(): string {
        const parts: string[] = [];

        // MATCH clauses
        if (this.matchClauses.length > 0) {
            parts.push(this.matchClauses.join('\n'));
        }

        // WITH clauses
        if (this.withClauses.length > 0) {
            parts.push(this.withClauses.join('\n'));
        }

        // WHERE clauses
        if (this.whereClauses.length > 0) {
            parts.push(`WHERE ${this.whereClauses.join(' AND ')}`);
        }

        // RETURN clauses
        if (this.returnClauses.length > 0) {
            parts.push(`RETURN ${this.returnClauses.join(', ')}`);
        }

        // ORDER BY
        if (this.orderByClauses.length > 0) {
            parts.push(`ORDER BY ${this.orderByClauses.join(', ')}`);
        }

        // SKIP
        if (this.skipValue !== undefined) {
            parts.push(`SKIP ${this.skipValue}`);
        }

        // LIMIT
        if (this.limitValue !== undefined) {
            parts.push(`LIMIT ${this.limitValue}`);
        }

        return parts.join('\n');
    }

    /**
     * Format value for Cypher query
     */
    private formatValue(value: any): string {
        if (typeof value === 'string') {
            return `"${value.replace(/"/g, '\\"')}"`;
        }
        if (typeof value === 'number' || typeof value === 'boolean') {
            return String(value);
        }
        if (value === null || value === undefined) {
            return 'null';
        }
        if (Array.isArray(value)) {
            return `[${value.map(v => this.formatValue(v)).join(', ')}]`;
        }
        // Object
        const props = Object.entries(value)
            .map(([k, v]) => `${k}: ${this.formatValue(v)}`)
            .join(', ');
        return `{${props}}`;
    }

    /**
     * Reset builder for reuse
     */
    public reset(): this {
        this.matchClauses = [];
        this.whereClauses = [];
        this.returnClauses = [];
        this.orderByClauses = [];
        this.withClauses = [];
        this.limitValue = undefined;
        this.skipValue = undefined;
        return this;
    }
}

/**
 * Helper class for common query patterns
 */
export class QueryHelper {
    /**
     * Build a simple node query
     */
    public static findNode(label: NodeLabel, properties: Record<string, any>): string {
        return new QueryBuilder()
            .matchNode('n', label, properties)
            .return('n')
            .build();
    }

    /**
     * Build a relationship query
     */
    public static findRelationship(
        fromLabel: NodeLabel,
        toLabel: NodeLabel,
        relationship: RelationshipType,
        fromProps?: Record<string, any>
    ): string {
        const builder = new QueryBuilder()
            .matchNode('from', fromLabel, fromProps)
            .matchRelationship('from', 'to', relationship)
            .matchNode('to', toLabel);

        return builder.return('from', 'to').build();
    }

    /**
     * Build a path query
     */
    public static findPath(
        startLabel: NodeLabel,
        endLabel: NodeLabel,
        relationships: RelationshipType[],
        startProps?: Record<string, any>
    ): string {
        const builder = new QueryBuilder();

        builder.matchNode('start', startLabel, startProps);

        let current = 'start';
        relationships.forEach((rel, i) => {
            const next = i === relationships.length - 1 ? 'end' : `n${i}`;
            builder.matchRelationship(current, next, rel);
            current = next;
        });

        builder.matchNode('end', endLabel);

        return builder.return('start', 'end').build();
    }
}
