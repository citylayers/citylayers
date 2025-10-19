/**
 * API Service for HTTP calls to backend.
 * Centralized service following Service Layer pattern.
 */
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
})(HttpMethod || (HttpMethod = {}));
/**
 * Base API service class for HTTP operations
 */
class ApiService {
    constructor(config = {}) {
        this.baseUrl = config.baseUrl || '';
        this.defaultHeaders = config.headers || {
            'Content-Type': 'application/json',
        };
        this.timeout = config.timeout || 30000;
    }
    /**
     * Perform GET request
     */
    async get(endpoint, params) {
        const url = this.buildUrl(endpoint, params);
        return this.request(url, { method: HttpMethod.GET });
    }
    /**
     * Perform POST request
     */
    async post(endpoint, data) {
        const url = this.buildUrl(endpoint);
        return this.request(url, {
            method: HttpMethod.POST,
            body: JSON.stringify(data),
        });
    }
    /**
     * Perform PUT request
     */
    async put(endpoint, data) {
        const url = this.buildUrl(endpoint);
        return this.request(url, {
            method: HttpMethod.PUT,
            body: JSON.stringify(data),
        });
    }
    /**
     * Perform DELETE request
     */
    async delete(endpoint) {
        const url = this.buildUrl(endpoint);
        return this.request(url, { method: HttpMethod.DELETE });
    }
    /**
     * Upload file
     */
    async uploadFile(endpoint, file, fieldName = 'image') {
        const url = this.buildUrl(endpoint);
        const formData = new FormData();
        formData.append(fieldName, file);
        return this.request(url, {
            method: HttpMethod.POST,
            body: formData,
            headers: {}, // Let browser set Content-Type for FormData
        });
    }
    /**
     * Generic request method
     */
    async request(url, options) {
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
        }
        catch (error) {
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
    buildUrl(endpoint, params) {
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
    setAuthToken(token) {
        this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
    /**
     * Remove authorization header
     */
    clearAuthToken() {
        delete this.defaultHeaders['Authorization'];
    }
}
/**
 * Project API service
 */
class ProjectApiService extends ApiService {
    async getProjects() {
        return this.get('/getprojects');
    }
    async getProjectTeam(projectName) {
        return this.get(`/project/team/${encodeURIComponent(projectName)}`);
    }
    async getProjectIllustrations(projectName) {
        return this.get(`/project/illustrations/${encodeURIComponent(projectName)}`);
    }
    async getProjectPartners(projectName) {
        return this.get(`/project/partners/${encodeURIComponent(projectName)}`);
    }
    async getProjectRecognitions(projectName) {
        return this.get(`/project/recognitions/${encodeURIComponent(projectName)}`);
    }
    async getProjectInfo(projectName) {
        return this.get(`/project/projectinfo/${encodeURIComponent(projectName)}`);
    }
}
/**
 * Observation API service
 */
class ObservationApiService extends ApiService {
    async submitObservation(data) {
        return this.post('/submit', data);
    }
    async uploadImage(file) {
        return this.uploadFile('/upload', file, 'image');
    }
}
// Singleton instances
const projectApi = new ProjectApiService();
const observationApi = new ObservationApiService();
