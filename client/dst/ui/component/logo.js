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
exports.LineLogo = exports.ColorLogo = exports.Logo = void 0;
var classnames_1 = require("../../../classnames");
var illustration_1 = require("../../../../logic/illustration");
var imageElement_1 = require("./imageElement");
var Logo = (function (_super) {
    __extends(Logo, _super);
    function Logo(parent, illustration) {
        var _this = this;
        var content = illustration ? illustration : new illustration_1.Illustration("/images/logo_2.svg", "/");
        _this = _super.call(this, parent, classnames_1.CLASSNAMES.LOGO, content) || this;
        _this.name = classnames_1.CLASSNAMES.LOGO;
        return _this;
    }
    return Logo;
}(imageElement_1.ImageElement));
exports.Logo = Logo;
var ColorLogo = (function (_super) {
    __extends(ColorLogo, _super);
    function ColorLogo(parent) {
        var _this = this;
        var content = new illustration_1.Illustration("/images/logo_full.svg", "/");
        _this = _super.call(this, parent, content) || this;
        _this.name = classnames_1.CLASSNAMES.LOGO;
        return _this;
    }
    return ColorLogo;
}(Logo));
exports.ColorLogo = ColorLogo;
var LineLogo = (function (_super) {
    __extends(LineLogo, _super);
    function LineLogo(parent) {
        var _this = this;
        var content = new illustration_1.Illustration("/images/logo_2.svg", "/");
        _this = _super.call(this, parent, content) || this;
        _this.name = classnames_1.CLASSNAMES.LOGO;
        return _this;
    }
    return LineLogo;
}(Logo));
exports.LineLogo = LineLogo;
