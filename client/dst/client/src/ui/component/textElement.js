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
exports.HeaderElement = exports.TextElement = void 0;
var ClassNames_1 = require("../../constants/ClassNames");
var BaseComponent_1 = require("./BaseComponent");
var TextElement = (function (_super) {
    __extends(TextElement, _super);
    function TextElement(parentId, id, content) {
        var _this = _super.call(this, parentId, ClassNames_1.ClassName.TEXT, id) || this;
        _this.textContent = content ? content.replace(/\\n/g, "<br>") : "";
        return _this;
    }
    TextElement.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.textContent;
        return element;
    };
    TextElement.prototype.updateContent = function (element) {
        if (typeof this.content === 'string') {
            element.innerHTML = this.content.replace(/\\n/g, "<br>");
        }
    };
    return TextElement;
}(BaseComponent_1.BaseComponent));
exports.TextElement = TextElement;
var HeaderElement = (function (_super) {
    __extends(HeaderElement, _super);
    function HeaderElement(parentId, id, content) {
        var _this = _super.call(this, parentId, ClassNames_1.ClassName.HEADER, id) || this;
        _this.textContent = content ? content.replace(/\\n/g, "<br>") : "";
        return _this;
    }
    HeaderElement.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.textContent;
        return element;
    };
    HeaderElement.prototype.updateContent = function (element) {
        if (typeof this.content === 'string') {
            element.innerHTML = this.content.replace(/\\n/g, "<br>");
        }
    };
    return HeaderElement;
}(BaseComponent_1.BaseComponent));
exports.HeaderElement = HeaderElement;
