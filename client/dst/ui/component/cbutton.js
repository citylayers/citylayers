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
exports.CButton = void 0;
var classnames_1 = require("../../../classnames");
var celement_1 = require("./celement");
var CButton = (function (_super) {
    __extends(CButton, _super);
    function CButton(parent, onclick) {
        var _this = _super.call(this, parent, "") || this;
        _this.name = classnames_1.CLASSNAMES.CLOSE;
        _this.content = "✕";
        _this.onclick = onclick ? onclick : function () { };
        return _this;
    }
    CButton.prototype.initiate = function () {
        var element = document.createElement("button");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content;
        element.onclick = this.onclick;
        this.getParent().appendChild(element);
    };
    return CButton;
}(celement_1.CElement));
exports.CButton = CButton;
