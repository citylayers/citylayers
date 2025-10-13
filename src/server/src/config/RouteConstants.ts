/**
 * Enum for all API route paths.
 * Prevents hardcoded route strings throughout the application.
 */
export enum RoutePath {
    // Static pages
    ROOT = '/',
    ACCESSIBILITY = '/accessibility',
    PRIVACY = '/privacy',
    IMPRESSUM = '/impressum',
    SUCCESS = '/success',
    ROBOTS = '/robots.txt',

    // Team routes
    TEAM = '/team',

    // Project routes
    GET_PROJECTS = '/getprojects',
    PROJECT_BASE = '/project',
    PROJECT_DETAIL = '/project/:project',
    PROJECT_TEAM = '/project/team/:project',
    PROJECT_ILLUSTRATIONS = '/project/illustrations/:project',
    PROJECT_PARTNERS = '/project/partners/:project',
    PROJECT_RECOGNITIONS = '/project/recognitions/:project',
    PROJECT_INFO = '/project/projectinfo/:project',

    // Map routes
    PIN = '/pin/:project',
    MAP = '/map/:project',

    // Data submission
    SUBMIT = '/submit',
    UPLOAD = '/upload',

    // Visualization
    SUNBURST = '/sunburst',
}

/**
 * Enum for route parameter names
 */
export enum RouteParam {
    PROJECT = 'project',
}

/**
 * Utility class for building dynamic routes
 */
export class RouteBuilder {
    /**
     * Replace route parameters with actual values
     * @param route - Route path with parameters (e.g., '/project/:project')
     * @param params - Object with parameter values
     * @returns Formatted route string
     *
     * Example:
     *   RouteBuilder.build(RoutePath.PROJECT_DETAIL, { project: 'MyProject' })
     *   // Returns: '/project/MyProject'
     */
    public static build(route: RoutePath, params: Record<string, string>): string {
        let result = route as string;

        Object.entries(params).forEach(([key, value]) => {
            result = result.replace(`:${key}`, value);
        });

        return result;
    }

    /**
     * Build project detail route
     * @param projectName - Project name
     */
    public static projectDetail(projectName: string): string {
        return this.build(RoutePath.PROJECT_DETAIL, {
            [RouteParam.PROJECT]: projectName
        });
    }

    /**
     * Build project team route
     * @param projectName - Project name
     */
    public static projectTeam(projectName: string): string {
        return this.build(RoutePath.PROJECT_TEAM, {
            [RouteParam.PROJECT]: projectName
        });
    }

    /**
     * Build project illustrations route
     * @param projectName - Project name
     */
    public static projectIllustrations(projectName: string): string {
        return this.build(RoutePath.PROJECT_ILLUSTRATIONS, {
            [RouteParam.PROJECT]: projectName
        });
    }

    /**
     * Build project partners route
     * @param projectName - Project name
     */
    public static projectPartners(projectName: string): string {
        return this.build(RoutePath.PROJECT_PARTNERS, {
            [RouteParam.PROJECT]: projectName
        });
    }

    /**
     * Build project recognitions route
     * @param projectName - Project name
     */
    public static projectRecognitions(projectName: string): string {
        return this.build(RoutePath.PROJECT_RECOGNITIONS, {
            [RouteParam.PROJECT]: projectName
        });
    }

    /**
     * Build project info route
     * @param projectName - Project name
     */
    public static projectInfo(projectName: string): string {
        return this.build(RoutePath.PROJECT_INFO, {
            [RouteParam.PROJECT]: projectName
        });
    }

    /**
     * Build pin route
     * @param projectName - Project name
     */
    public static pin(projectName: string): string {
        return this.build(RoutePath.PIN, {
            [RouteParam.PROJECT]: projectName
        });
    }

    /**
     * Build map route
     * @param projectName - Project name
     */
    public static map(projectName: string): string {
        return this.build(RoutePath.MAP, {
            [RouteParam.PROJECT]: projectName
        });
    }
}

/**
 * Utility class for parsing route parameters
 */
export class RouteParser {
    /**
     * Extract and decode project name from request params
     * @param encodedName - Encoded project name from URL
     * @returns Decoded project name with spaces
     */
    public static decodeProjectName(encodedName: string): string {
        return encodedName.replaceAll('%20', ' ');
    }

    /**
     * Encode project name for URL
     * @param projectName - Project name with spaces
     * @returns Encoded project name
     */
    public static encodeProjectName(projectName: string): string {
        return projectName.replaceAll(' ', '%20');
    }
}
