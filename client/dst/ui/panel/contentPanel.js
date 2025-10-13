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
exports.ContentPanel = void 0;
var ClassNames_1 = require("../../constants/ClassNames");
var celement_1 = require("../component/celement");
var ContentPanel = (function (_super) {
    __extends(ContentPanel, _super);
    function ContentPanel(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = ClassNames_1.CLASSNAMES.CATEGORY_PANEL;
        _this.parent = parent ? parent : "body";
        _this.elements = [];
        return _this;
    }
    ContentPanel.prototype.load = function (categories, args) {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.make_id(), _this.id);
            element.initiate();
            element.load();
        });
    };
    ContentPanel.prototype.add = function (element, args) {
    };
    ContentPanel.prototype.getParent = function () {
        if (this.parent == "body") {
            return document.body;
        }
        return document.getElementById(this.parent);
    };
    ContentPanel.activate = function (on) {
        var mode = on == true ? "flex" : "none";
        var elements = document.getElementsByClassName(this.name);
        if (elements.length > 0) {
            var el = elements[0];
            el.style.display = mode;
        }
    };
    return ContentPanel;
}(celement_1.CElement));
exports.ContentPanel = ContentPanel;
