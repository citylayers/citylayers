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
exports.SpanElement = void 0;
var celement_1 = require("./celement");
var SpanElement = (function (_super) {
    __extends(SpanElement, _super);
    function SpanElement(parent, id, content) {
        var _this = _super.call(this, parent, id) || this;
        _this.name = "";
        _this.content = content;
        return _this;
    }
    SpanElement.prototype.load = function () { };
    SpanElement.prototype.initiate = function () {
        var element = document.createElement("span");
        element.innerHTML = this.content;
        this.getParent().appendChild(element);
    };
    return SpanElement;
}(celement_1.CElement));
exports.SpanElement = SpanElement;
