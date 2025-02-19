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
exports.PartnerElement = void 0;
var classnames_1 = require("../../../classnames");
var contentElement_1 = require("./contentElement");
var logo_1 = require("./logo");
var PartnerElement = (function (_super) {
    __extends(PartnerElement, _super);
    function PartnerElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = classnames_1.CLASSNAMES.PARTNER;
        _this.elements = [logo_1.Logo, logo_1.Logo, logo_1.Logo];
        return _this;
    }
    return PartnerElement;
}(contentElement_1.ContentElement));
exports.PartnerElement = PartnerElement;
