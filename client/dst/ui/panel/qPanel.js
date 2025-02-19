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
exports.QPanel = void 0;
var contentPanel_1 = require("./contentPanel");
var classnames_1 = require("../../../classnames");
var question_1 = require("../panelcomponent/question");
var QPanel = (function (_super) {
    __extends(QPanel, _super);
    function QPanel(parent) {
        var _this = _super.call(this, parent, "id") || this;
        _this.name = classnames_1.CLASSNAMES.Q_PANEL;
        _this.elements = [question_1.QHeader, question_1.QContainer, question_1.QFooter];
        return _this;
    }
    QPanel.prototype.load = function (qasets, answerTree) {
        var _this = this;
        QPanel.totalSteps = qasets.length;
        QPanel.tree = answerTree;
        this.elements.forEach(function (el, i) {
            var element = el == question_1.QContainer ? new el(_this.make_id(), "", [qasets, answerTree]) :
                new el(_this.make_id(), "main");
            element.initiate();
            if (element instanceof question_1.QContainer) {
                element.load(QPanel.currentStep, i == QPanel.currentStep);
                QPanel.controller = element;
            }
            else {
                element.load([QPanel.back, QPanel.next, QPanel.submit]);
            }
        });
    };
    QPanel.back = function () {
        QPanel.controller.load(QPanel.currentStep - 1);
        QPanel.currentStep -= 1;
        question_1.QFooter.reload(QPanel.currentStep, QPanel.totalSteps);
    };
    QPanel.next = function () {
        QPanel.controller.load(QPanel.currentStep + 1);
        QPanel.currentStep += 1;
        question_1.QFooter.reload(QPanel.currentStep, QPanel.totalSteps);
    };
    QPanel.submit = function () {
        QPanel.currentStep = 1;
    };
    QPanel.controller = undefined;
    QPanel.currentStep = 1;
    QPanel.totalSteps = 0;
    QPanel.tree = undefined;
    return QPanel;
}(contentPanel_1.ContentPanel));
exports.QPanel = QPanel;
