"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTeamPanel = buildTeamPanel;
function buildTeamPanel(team) {
    var page = new TeamPanel("main");
    page.initiate();
    page.load(team);
}
