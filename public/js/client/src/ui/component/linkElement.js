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
exports.LinkElement = void 0;
var ClassNames_1 = require("../../constants/ClassNames");
var BaseComponent_1 = require("./BaseComponent");
var LinkElement = (function (_super) {
    __extends(LinkElement, _super);
    function LinkElement(parentId, id, content) {
        var _this = _super.call(this, parentId, ClassNames_1.ClassName.TEXT, id) || this;
        _this.textContent = content[0];
        _this.link = content[1];
        return _this;
    }
    LinkElement.prototype.createElement = function () {
        var anchor = document.createElement("a");
        anchor.href = this.link;
        var div = document.createElement("div");
        div.setAttribute('class', this.className);
        div.setAttribute('id', this.makeId());
        div.innerHTML = this.textContent;
        anchor.appendChild(div);
        var parent = this.getParent();
        if (parent) {
            parent.appendChild(anchor);
        }
        return div;
    };
    return LinkElement;
}(BaseComponent_1.BaseComponent));
exports.LinkElement = LinkElement;
