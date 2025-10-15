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
var ClassNames_1 = require("../../constants/ClassNames");
var illustration_1 = require("../../../../logic/illustration");
var imageElement_1 = require("./imageElement");
var Logo = (function (_super) {
    __extends(Logo, _super);
    function Logo(parentId, illustration) {
        var content = illustration || new illustration_1.Illustration("/images/logo_2.svg", "/");
        return _super.call(this, parentId, ClassNames_1.ClassName.LOGO, content, ClassNames_1.ClassName.LOGO) || this;
    }
    return Logo;
}(imageElement_1.ImageElement));
exports.Logo = Logo;
var ColorLogo = (function (_super) {
    __extends(ColorLogo, _super);
    function ColorLogo(parentId) {
        var content = new illustration_1.Illustration("/images/logo_full.svg", "/");
        return _super.call(this, parentId, ClassNames_1.ClassName.LOGO, content, ClassNames_1.ClassName.LOGO) || this;
    }
    return ColorLogo;
}(imageElement_1.ImageElement));
exports.ColorLogo = ColorLogo;
var LineLogo = (function (_super) {
    __extends(LineLogo, _super);
    function LineLogo(parentId) {
        var content = new illustration_1.Illustration("/images/logo_2.svg", "/");
        return _super.call(this, parentId, ClassNames_1.ClassName.LOGO, content, ClassNames_1.ClassName.LOGO) || this;
    }
    return LineLogo;
}(imageElement_1.ImageElement));
exports.LineLogo = LineLogo;
