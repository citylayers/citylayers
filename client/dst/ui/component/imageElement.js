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
exports.ImagePreviewElement = exports.ImageElement = void 0;
var classnames_1 = require("../../../classnames");
var celement_1 = require("./celement");
var illustration_1 = require("../../../../logic/illustration");
var ImageElement = (function (_super) {
    __extends(ImageElement, _super);
    function ImageElement(parent, id, image, name) {
        var _this = _super.call(this, parent, id) || this;
        _this.name = name ? name : classnames_1.CLASSNAMES.LOGO;
        _this.content = image ? image : new illustration_1.Illustration("", "", "");
        return _this;
    }
    ImageElement.prototype.initiate = function () {
        var _this = this;
        var element = document.createElement("img");
        element.src = this.content.path;
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        if (this.content.link != "" && this.content.link != undefined && this.content.link != null) {
            element.addEventListener("click", function () {
                window.location.href = _this.content.link;
            });
        }
        this.getParent().appendChild(element);
    };
    return ImageElement;
}(celement_1.CElement));
exports.ImageElement = ImageElement;
var ImagePreviewElement = (function (_super) {
    __extends(ImagePreviewElement, _super);
    function ImagePreviewElement(parent, id, name) {
        var _this = _super.call(this, parent, id) || this;
        _this.name = name ? name : classnames_1.CLASSNAMES.LOGO;
        _this.id = classnames_1.IDS.IMG_PREVIEW;
        _this.content = new illustration_1.Illustration("", "", "Upload");
        return _this;
    }
    ImagePreviewElement.prototype.initiate = function () {
        var element = document.createElement("img");
        element.src = this.content.path;
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.id);
        this.getParent().appendChild(element);
    };
    return ImagePreviewElement;
}(ImageElement));
exports.ImagePreviewElement = ImagePreviewElement;
