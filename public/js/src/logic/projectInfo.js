"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectInfo = exports.ProjectRecognition = exports.ProjectPeriod = void 0;
var neo4j_driver_1 = require("neo4j-driver");
var ProjectPeriod = (function () {
    function ProjectPeriod(start, end) {
        this.start = this.convert(start, true);
        this.end = this.convert(end);
    }
    ProjectPeriod.prototype.convert = function (d, start) {
        if (d == null || d == undefined) {
            return start == true ? "Not started" : "Ongoing";
        }
        if (d instanceof String) {
            return d.substr(0, 10).replace(/:/g, "/");
        }
        if (d instanceof neo4j_driver_1.DateTime) {
            return "".concat(d.year, "/").concat(d.month, "/").concat(d.day);
        }
    };
    return ProjectPeriod;
}());
exports.ProjectPeriod = ProjectPeriod;
var ProjectRecognition = (function () {
    function ProjectRecognition(value, partner) {
        this.value = value ? value : "";
        this.partner = partner;
    }
    return ProjectRecognition;
}());
exports.ProjectRecognition = ProjectRecognition;
var ProjectInfo = (function () {
    function ProjectInfo(name, subtitle, description, period, mappable, recognition, images, partners, team) {
        if (mappable === void 0) { mappable = false; }
        if (images === void 0) { images = []; }
        if (partners === void 0) { partners = []; }
        if (team === void 0) { team = []; }
        this.id = name;
        this.name = name;
        this.period = period;
        this.mappable = mappable;
        this.subtitle = subtitle ? subtitle : "";
        this.description = description ? description : "";
        this.recognition = recognition ? recognition : undefined;
        this.images = images ? images : [];
        this.partners = partners ? partners : [];
        this.team = team ? team : [];
    }
    return ProjectInfo;
}());
exports.ProjectInfo = ProjectInfo;
