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
exports.HomePanel = void 0;
var ClassNames_1 = require("../../constants/ClassNames");
var contentPanel_1 = require("./contentPanel");
var landing_1 = require("../panelcomponent/landing");
var projectComponent_1 = require("../component/projectComponent");
var HomePanel = (function (_super) {
    __extends(HomePanel, _super);
    function HomePanel(parent) {
        var _this = _super.call(this, parent, "id") || this;
        _this.name = ClassNames_1.CLASSNAMES.HOME_PANEL;
        _this.elements = [landing_1.LandingIllustration, landing_1.GeneralContent, projectComponent_1.ProjectPanel];
        return _this;
    }
    HomePanel.prototype.load = function (projects) {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.make_id(), "main");
            element.initiate();
            element.load(projects);
        });
    };
    return HomePanel;
}(contentPanel_1.ContentPanel));
exports.HomePanel = HomePanel;
