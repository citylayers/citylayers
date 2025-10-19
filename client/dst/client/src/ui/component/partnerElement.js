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
var PartnerElement = (function (_super) {
    __extends(PartnerElement, _super);
    function PartnerElement(parentId, id, content) {
        var _this = _super.call(this, parentId, id, content) || this;
        _this.className = ClassName.PARTNER;
        for (var i = 0; i < 3; i++) {
            _this.addChild(new Logo(_this.makeId()));
        }
        return _this;
    }
    return PartnerElement;
}(ContentElement));
