"use strict";
exports.__esModule = true;
exports.Role = exports.TeamMember = void 0;
var TeamMember = /** @class */ (function () {
    function TeamMember(name, link, role, external) {
        if (role === void 0) { role = []; }
        if (external === void 0) { external = false; }
        this.id = name;
        this.name = name;
        this.link = link ? link : "";
        this.role = role;
        this.external = external ? external : false;
    }
    return TeamMember;
}());
exports.TeamMember = TeamMember;
var Role = /** @class */ (function () {
    function Role(role, project_name) {
        this.role = role;
        this.project_name = project_name;
    }
    return Role;
}());
exports.Role = Role;
