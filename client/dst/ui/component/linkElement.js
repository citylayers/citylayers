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
var textElement_1 = require("./textElement");
var LinkElement = (function (_super) {
    __extends(LinkElement, _super);
    function LinkElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content[0]) || this;
        _this.link = content[1];
        return _this;
    }
    LinkElement.prototype.initiate = function () {
        var el = document.createElement("a");
        el.href = this.link;
        this.getParent().appendChild(el);
        var element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content;
        el.appendChild(element);
    };
    return LinkElement;
}(textElement_1.TextElement));
exports.LinkElement = LinkElement;
