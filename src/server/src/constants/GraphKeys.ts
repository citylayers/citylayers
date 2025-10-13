/**
 * Enum for Neo4j graph property keys.
 * Moved from graph.ts to follow "no hardcoded strings" principle.
 *
 * These keys represent property names used in Cypher queries
 * for nodes, relationships, and query results.
 */
export enum GraphKey {
    // Answer-related keys
    ANSWER = 'answer',
    ANSWER1 = 'answer1',

    // Category and classification
    CATEGORY = 'category',
    CHOICE = 'choice',

    // Configuration
    CONFIG = 'c',
    CONTENT = 'content',

    // Identifiers
    ID = 'id',

    // Media and content
    ILLUSTRATION = 'illustration',

    // Location
    LAT = 'lat',
    LON = 'lon',

    // Generic node reference
    NODE = 'node',

    // Observation
    OBSERVATION = 'obs',

    // Partners and recognition
    PARTNER = 'partner',
    RECOGNITION = 'recognition',

    // Location
    PLACE = 'place',

    // Relationship references
    PREV = 'prev',

    // Project
    PROJECT = 'p',

    // Team
    ROLE = 'r',
    TEAMMEMBER = 't',

    // Questions
    QUESTION = 'question',
    QUESTION1 = 'question1',

    // Query results
    RESULT = 'result',

    // Step/ordering
    STEP = 'step',
}

/**
 * Enum for Neo4j node labels (types)
 */
export enum NodeLabel {
    PROJECT = 'Project',
    CONFIG = 'Config',
    QUESTION = 'Question',
    ANSWER = 'Answer',
    PLACE = 'Place',
    OBSERVATION = 'Observation',
    ILLUSTRATION = 'Illustration',
    PARTNER = 'Partner',
    RECOGNITION = 'Recognition',
    ROLE = 'Role',
    TEAMMEMBER = 'TeamMember',
}

/**
 * Enum for Neo4j relationship types
 */
export enum RelationshipType {
    ISSET = 'ISSET',
    ASKS = 'ASKS',
    ISANSWERED = 'ISANSWERED',
    FOLLOWEDBY = 'FOLLOWEDBY',
    TOCHOOSE = 'TOCHOOSE',
    REGISTERED = 'REGISTERED',
    EVALUATES = 'EVALUATES',
    ILLUSTRATED = 'ILLUSTRATED',
    HAS = 'HAS',
    RECOGNIZED = 'RECOGNIZED',
    SUPPORTS = 'SUPPORTS',
    WORKEDON = 'WORKEDON',
    AS = 'AS',
    EMPLOYED = 'EMPLOYED',
}

/**
 * Enum for common node properties
 */
export enum NodeProperty {
    NAME = 'name',
    VALUE = 'value',
    ATYPE = 'atype',
    HELP = 'help',
    MIN = 'min',
    MAX = 'max',
    MIN_LABEL = 'minlabel',
    MAX_LABEL = 'maxlabel',
    START_DATE = 'start_date',
    END_DATE = 'end_date',
    SUBTITLE = 'subtitle',
    DESCRIPTION = 'description',
    MAPPABLE = 'mappable',
    LOGO = 'logo',
    LINK = 'link',
    CAPTION = 'caption',
    EXTERNAL = 'external',
    LAT = 'lat',
    LON = 'lon',
    DATE = 'date',
}

/**
 * Utility class for working with graph keys
 */
export class GraphKeyHelper {
    /**
     * Get all graph keys as array
     */
    public static getAllKeys(): string[] {
        return Object.values(GraphKey);
    }

    /**
     * Check if a string is a valid graph key
     */
    public static isValidKey(key: string): boolean {
        return this.getAllKeys().includes(key);
    }

    /**
     * Get graph key enum from string
     * @param key - String to convert
     * @returns GraphKey enum value or undefined
     */
    public static fromString(key: string): GraphKey | undefined {
        const entry = Object.entries(GraphKey).find(([_, value]) => value === key);
        return entry ? entry[1] : undefined;
    }
}
