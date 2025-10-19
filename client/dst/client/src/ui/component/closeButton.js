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
var CloseButton = (function (_super) {
    __extends(CloseButton, _super);
    function CloseButton(parentId, id, onClick) {
        var _this = _super.call(this, parentId, ClassName.CLOSE, id) || this;
        _this.buttonContent = "✕";
        _this.clickHandler = onClick || (function () { });
        return _this;
    }
    CloseButton.prototype.getElementTag = function () {
        return 'button';
    };
    CloseButton.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.buttonContent;
        return element;
    };
    CloseButton.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    return CloseButton;
}(BaseComponent));
