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
exports.ImageContainerElement = void 0;
var contentElement_1 = require("./contentElement");
var imageElement_1 = require("./imageElement");
var ImageContainerElement = (function (_super) {
    __extends(ImageContainerElement, _super);
    function ImageContainerElement(parentId, className, illustrations) {
        var _this = _super.call(this, parentId || "main", undefined, className) || this;
        _this.className = className;
        _this.images = illustrations;
        illustrations.forEach(function (illustration, index) {
            _this.addChild(new imageElement_1.ImageElement(_this.makeId(), "img_".concat(index), illustration));
        });
        return _this;
    }
    return ImageContainerElement;
}(contentElement_1.ContentElement));
exports.ImageContainerElement = ImageContainerElement;
