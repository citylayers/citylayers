"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.observationApi = exports.projectApi = exports.ObservationApiService = exports.ProjectApiService = exports.ApiService = exports.HttpMethod = void 0;
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
})(HttpMethod || (exports.HttpMethod = HttpMethod = {}));
var ApiService = (function () {
    function ApiService(config) {
        if (config === void 0) { config = {}; }
        this.baseUrl = config.baseUrl || '';
        this.defaultHeaders = config.headers || {
            'Content-Type': 'application/json',
        };
        this.timeout = config.timeout || 30000;
    }
    ApiService.prototype.get = function (endpoint, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = this.buildUrl(endpoint, params);
                return [2, this.request(url, { method: HttpMethod.GET })];
            });
        });
    };
    ApiService.prototype.post = function (endpoint, data) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = this.buildUrl(endpoint);
                return [2, this.request(url, {
                        method: HttpMethod.POST,
                        body: JSON.stringify(data),
                    })];
            });
        });
    };
    ApiService.prototype.put = function (endpoint, data) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = this.buildUrl(endpoint);
                return [2, this.request(url, {
                        method: HttpMethod.PUT,
                        body: JSON.stringify(data),
                    })];
            });
        });
    };
    ApiService.prototype.delete = function (endpoint) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = this.buildUrl(endpoint);
                return [2, this.request(url, { method: HttpMethod.DELETE })];
            });
        });
    };
    ApiService.prototype.uploadFile = function (endpoint_1, file_1) {
        return __awaiter(this, arguments, void 0, function (endpoint, file, fieldName) {
            var url, formData;
            if (fieldName === void 0) { fieldName = 'image'; }
            return __generator(this, function (_a) {
                url = this.buildUrl(endpoint);
                formData = new FormData();
                formData.append(fieldName, file);
                return [2, this.request(url, {
                        method: HttpMethod.POST,
                        body: formData,
                        headers: {},
                    })];
            });
        });
    };
    ApiService.prototype.request = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var controller, timeoutId, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controller = new AbortController();
                        timeoutId = setTimeout(function () { return controller.abort(); }, this.timeout);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4, fetch(url, __assign(__assign({}, options), { headers: __assign(__assign({}, this.defaultHeaders), (options.headers || {})), signal: controller.signal }))];
                    case 2:
                        response = _a.sent();
                        clearTimeout(timeoutId);
                        if (!response.ok) {
                            throw new Error("HTTP ".concat(response.status, ": ").concat(response.statusText));
                        }
                        return [4, response.json()];
                    case 3: return [2, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        clearTimeout(timeoutId);
                        if (error_1.name === 'AbortError') {
                            throw new Error('Request timeout');
                        }
                        throw error_1;
                    case 5: return [2];
                }
            });
        });
    };
    ApiService.prototype.buildUrl = function (endpoint, params) {
        var url = new URL(endpoint, this.baseUrl || window.location.origin);
        if (params) {
            Object.entries(params).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, String(value));
                }
            });
        }
        return url.toString();
    };
    ApiService.prototype.setAuthToken = function (token) {
        this.defaultHeaders['Authorization'] = "Bearer ".concat(token);
    };
    ApiService.prototype.clearAuthToken = function () {
        delete this.defaultHeaders['Authorization'];
    };
    return ApiService;
}());
exports.ApiService = ApiService;
var ProjectApiService = (function (_super) {
    __extends(ProjectApiService, _super);
    function ProjectApiService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProjectApiService.prototype.getProjects = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.get('/getprojects')];
            });
        });
    };
    ProjectApiService.prototype.getProjectTeam = function (projectName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.get("/project/team/".concat(encodeURIComponent(projectName)))];
            });
        });
    };
    ProjectApiService.prototype.getProjectIllustrations = function (projectName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.get("/project/illustrations/".concat(encodeURIComponent(projectName)))];
            });
        });
    };
    ProjectApiService.prototype.getProjectPartners = function (projectName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.get("/project/partners/".concat(encodeURIComponent(projectName)))];
            });
        });
    };
    ProjectApiService.prototype.getProjectRecognitions = function (projectName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.get("/project/recognitions/".concat(encodeURIComponent(projectName)))];
            });
        });
    };
    ProjectApiService.prototype.getProjectInfo = function (projectName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.get("/project/projectinfo/".concat(encodeURIComponent(projectName)))];
            });
        });
    };
    return ProjectApiService;
}(ApiService));
exports.ProjectApiService = ProjectApiService;
var ObservationApiService = (function (_super) {
    __extends(ObservationApiService, _super);
    function ObservationApiService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObservationApiService.prototype.submitObservation = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.post('/submit', data)];
            });
        });
    };
    ObservationApiService.prototype.uploadImage = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.uploadFile('/upload', file, 'image')];
            });
        });
    };
    return ObservationApiService;
}(ApiService));
exports.ObservationApiService = ObservationApiService;
exports.projectApi = new ProjectApiService();
exports.observationApi = new ObservationApiService();
