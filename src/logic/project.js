"use strict";
exports.__esModule = true;
exports.Project = void 0;
var config_1 = require("./config");
var ProjectManager = /** @class */ (function () {
    function ProjectManager() {
        this.projects = [];
    }
    return ProjectManager;
}());
var Project = /** @class */ (function () {
    function Project(projectInfo, config) {
        // this.id = id;
        this.name = projectInfo.name;
        this.info = projectInfo;
        this.config = config ? config : config_1.Config.empty();
    }
    Project.prototype.getPlace = function () {
        return "Vienna, Austria";
    };
    Project.prototype.getPeriod = function () {
        return "2024/06";
    };
    Project.prototype.getStatus = function () {
        return "Closed";
    };
    return Project;
}());
exports.Project = Project;
