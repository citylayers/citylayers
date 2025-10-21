"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTeamPanel = buildTeamPanel;
function buildTeamPanel(team) {
    let page = new TeamPanel("main");
    page.initiate();
    page.load(team);
}
