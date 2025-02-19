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
var classnames_1 = require("../../../classnames");
var celement_1 = require("./celement");
var TextElement = (function (_super) {
    __extends(TextElement, _super);
    function TextElement(parent, id, content) {
        var _this = _super.call(this, parent, id) || this;
        _this.name = classnames_1.CLASSNAMES.TEXT;
        _this.id = id;
        _this.content = content ? content.replaceAll("\\n", "<br>") : "";
        return _this;
    }
    TextElement.prototype.load = function () { };
    TextElement.prototype.initiate = function () {
        var element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content;
        this.getParent().appendChild(element);
    };
    return TextElement;
}(celement_1.CElement));
exports.TextElement = TextElement;
var HeaderElement = (function (_super) {
    __extends(HeaderElement, _super);
    function HeaderElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = classnames_1.CLASSNAMES.HEADER;
        return _this;
    }
    return HeaderElement;
}(TextElement));
exports.HeaderElement = HeaderElement;
