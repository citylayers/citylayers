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
var Logo = (function (_super) {
    __extends(Logo, _super);
    function Logo(parentId, illustration) {
        var content = illustration || new Illustration("/images/logo_2.svg", "/");
        return _super.call(this, parentId, ClassName.LOGO, content, ClassName.LOGO) || this;
    }
    return Logo;
}(ImageElement));
var ColorLogo = (function (_super) {
    __extends(ColorLogo, _super);
    function ColorLogo(parentId) {
        var content = new Illustration("/images/logo_full.svg", "/");
        return _super.call(this, parentId, ClassName.LOGO, content, ClassName.LOGO) || this;
    }
    return ColorLogo;
}(ImageElement));
var LineLogo = (function (_super) {
    __extends(LineLogo, _super);
    function LineLogo(parentId) {
        var content = new Illustration("/images/logo_2.svg", "/");
        return _super.call(this, parentId, ClassName.LOGO, content, ClassName.LOGO) || this;
    }
    return LineLogo;
}(ImageElement));
