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
exports.PinButton = void 0;
var BaseComponent_1 = require("./BaseComponent");
var PinButton = (function (_super) {
    __extends(PinButton, _super);
    function PinButton(parentId, getCoordinates) {
        var _this = _super.call(this, parentId, "pinButton primary-button") || this;
        _this.content = "Add a pin";
        _this.onClickHandler = function () {
            var coords = getCoordinates();
            window.location.href = "/pin?lat=".concat(coords.lat, "&lng=").concat(coords.lon);
        };
        return _this;
    }
    PinButton.prototype.getElementTag = function () {
        return 'button';
    };
    PinButton.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    PinButton.prototype.afterInit = function () {
        this.addEventListener('click', this.onClickHandler);
    };
    return PinButton;
}(BaseComponent_1.BaseComponent));
exports.PinButton = PinButton;
