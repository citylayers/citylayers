/**
 * API Service for HTTP calls to backend.
 * Centralized service following Service Layer pattern.
 */

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface ApiConfig {
    baseUrl?: string;
    headers?: Record<string, string>;
    timeout?: number;
}

/**
 * Base API service class for HTTP operations
 */
export class ApiService {
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;
    private timeout: number;

    constructor(config: ApiConfig = {}) {
        this.baseUrl = config.baseUrl || '';
        this.defaultHeaders = config.headers || {
            'Content-Type': 'application/json',
        };
        this.timeout = config.timeout || 30000;
    }

    /**
     * Perform GET request
     */
    public async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        const url = this.buildUrl(endpoint, params);
        return this.request<T>(url, { method: HttpMethod.GET });
    }

    /**
     * Perform POST request
     */
    public async post<T>(endpoint: string, data?: any): Promise<T> {
        const url = this.buildUrl(endpoint);
        return this.request<T>(url, {
            method: HttpMethod.POST,
            body: JSON.stringify(data),
        });
    }

    /**
     * Perform PUT request
     */
    public async put<T>(endpoint: string, data?: any): Promise<T> {
        const url = this.buildUrl(endpoint);
        return this.request<T>(url, {
            method: HttpMethod.PUT,
            body: JSON.stringify(data),
        });
    }

    /**
     * Perform DELETE request
     */
    public async delete<T>(endpoint: string): Promise<T> {
        const url = this.buildUrl(endpoint);
        return this.request<T>(url, { method: HttpMethod.DELETE });
    }

    /**
     * Upload file
     */
    public async uploadFile<T>(endpoint: string, file: File, fieldName: string = 'image'): Promise<T> {
        const url = this.buildUrl(endpoint);
        const formData = new FormData();
        formData.append(fieldName, file);

        return this.request<T>(url, {
            method: HttpMethod.POST,
            body: formData,
            headers: {}, // Let browser set Content-Type for FormData
        });
    }

    /**
     * Generic request method
     */
    private async request<T>(url: string, options: RequestInit): Promise<T> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...this.defaultHeaders,
                    ...(options.headers || {}),
                },
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }

            throw error;
        }
    }

    /**
     * Build URL with base and query params
     */
    private buildUrl(endpoint: string, params?: Record<string, any>): string {
        const url = new URL(endpoint, this.baseUrl || window.location.origin);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, String(value));
                }
            });
        }

        return url.toString();
    }

    /**
     * Set authorization header
     */
    public setAuthToken(token: string): void {
        this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    /**
     * Remove authorization header
     */
    public clearAuthToken(): void {
        delete this.defaultHeaders['Authorization'];
    }
}

/**
 * Project API service
 */
export class ProjectApiService extends ApiService {
    public async getProjects(): Promise<any[]> {
        return this.get('/getprojects');
    }

    public async getProjectTeam(projectName: string): Promise<any[]> {
        return this.get(`/project/team/${encodeURIComponent(projectName)}`);
    }

    public async getProjectIllustrations(projectName: string): Promise<any[]> {
        return this.get(`/project/illustrations/${encodeURIComponent(projectName)}`);
    }

    public async getProjectPartners(projectName: string): Promise<any[]> {
        return this.get(`/project/partners/${encodeURIComponent(projectName)}`);
    }

    public async getProjectRecognitions(projectName: string): Promise<any[]> {
        return this.get(`/project/recognitions/${encodeURIComponent(projectName)}`);
    }

    public async getProjectInfo(projectName: string): Promise<any> {
        return this.get(`/project/projectinfo/${encodeURIComponent(projectName)}`);
    }
}

/**
 * Observation API service
 */
export class ObservationApiService extends ApiService {
    public async submitObservation(data: {
        coords: { lat: number; lon: number };
        data: any[];
        image?: string;
    }): Promise<any> {
        return this.post('/submit', data);
    }

    public async uploadImage(file: File): Promise<{ content: string }> {
        return this.uploadFile('/upload', file, 'image');
    }
}

// Singleton instances
export const projectApi = new ProjectApiService();
export const observationApi = new ObservationApiService();
