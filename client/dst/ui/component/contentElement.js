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
exports.ContentElement = void 0;
var celement_1 = require("./celement");
var ContentElement = (function (_super) {
    __extends(ContentElement, _super);
    function ContentElement(parent, id, content) {
        var _this = _super.call(this, parent, id) || this;
        _this.content = content;
        _this.name = "contentelement";
        _this.parent = parent ? parent : "main";
        _this.elements = [];
        return _this;
    }
    ContentElement.prototype.getParent = function () {
        var element = document.getElementById(this.parent);
        return element;
    };
    ContentElement.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.make_id(), this.id, this.content);
            element.initiate();
            element.load();
        }
    };
    ContentElement.prototype.initiate = function () {
        var panel = document.createElement("div");
        panel.setAttribute('class', this.name);
        panel.setAttribute("id", this.make_id());
        this.getParent().appendChild(panel);
    };
    return ContentElement;
}(celement_1.CElement));
exports.ContentElement = ContentElement;
