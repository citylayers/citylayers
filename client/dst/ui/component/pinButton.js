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
var cbutton_1 = require("./cbutton");
var citylayerspanel_1 = require("../panel/citylayerspanel");
var PinButton = (function (_super) {
    __extends(PinButton, _super);
    function PinButton(parent) {
        var _this = _super.call(this, parent, "") || this;
        _this.name = "pinButton";
        _this.content = "Add a pin";
        return _this;
    }
    PinButton.prototype.initiate = function () {
        var element = document.createElement("button");
        element.innerHTML = this.content;
        element.setAttribute('class', "" + this.name + " primary-button");
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
        element.addEventListener("click", function () {
            var coords = citylayerspanel_1.CityLayersPanel.getCoords();
            window.location.href = "/pin?lat=".concat(coords.lat, "&lng=").concat(coords.lon);
        });
    };
    return PinButton;
}(cbutton_1.CButton));
exports.PinButton = PinButton;
