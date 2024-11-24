"use strict";
exports.__esModule = true;
exports.buildTeamPanel = void 0;
var teamPanel_1 = require("./src/ui/panel/teamPanel");
function buildTeamPanel(team) {
    var page = new teamPanel_1.TeamPanel("main");
    page.initiate();
    page.load(team);
}
exports.buildTeamPanel = buildTeamPanel;
