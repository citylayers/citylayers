"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTeamPanel = buildTeamPanel;
var teamPanel_1 = require("./ui/panel/teamPanel");
function buildTeamPanel(team) {
    var page = new teamPanel_1.TeamPanel("main");
    page.initiate();
    page.load(team);
}
