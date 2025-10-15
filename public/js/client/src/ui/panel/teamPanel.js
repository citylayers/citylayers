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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamPanel = void 0;
var ClassNames_1 = require("../../constants/ClassNames");
var textElement_1 = require("../component/textElement");
var legal_1 = require("./legal");
var teamComponent_1 = require("../panelcomponent/teamComponent");
var TeamPanel = (function (_super) {
    __extends(TeamPanel, _super);
    function TeamPanel(parent) {
        var _this = _super.call(this, parent, "") || this;
        _this.name = ClassNames_1.CLASSNAMES.HOME_PANEL;
        _this.elements = [textElement_1.TextElement, teamComponent_1.TeamMemberContainer];
        return _this;
    }
    TeamPanel.prototype.getParent = function () {
        var els = document.getElementsByTagName(this.parent);
        return els.length > 0 ? els[0] : document.body;
    };
    TeamPanel.prototype.load = function (team) {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.makeId(), "team");
            element.initiate();
            el == teamComponent_1.TeamMemberContainer ? element.load(team) : element.load();
        });
    };
    return TeamPanel;
}(legal_1.LegalPanel));
exports.TeamPanel = TeamPanel;
