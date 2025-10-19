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
var ImageElement = (function (_super) {
    __extends(ImageElement, _super);
    function ImageElement(parentId, id, image, className) {
        var _this = _super.call(this, parentId, className || ClassName.LOGO, id) || this;
        _this.illustration = image || new Illustration("", "", "");
        if (_this.illustration.link && _this.illustration.link !== "") {
            _this.clickHandler = function () {
                window.location.href = _this.illustration.link;
            };
        }
        return _this;
    }
    ImageElement.prototype.getElementTag = function () {
        return 'img';
    };
    ImageElement.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.src = this.illustration.path;
        return element;
    };
    ImageElement.prototype.afterInit = function () {
        if (this.clickHandler) {
            this.addEventListener('click', this.clickHandler);
        }
    };
    ImageElement.prototype.setImage = function (illustration) {
        this.illustration = illustration;
        var element = this.getElement();
        if (element) {
            element.src = illustration.path;
        }
    };
    return ImageElement;
}(BaseComponent));
var ImagePreviewElement = (function (_super) {
    __extends(ImagePreviewElement, _super);
    function ImagePreviewElement(parentId, id, className) {
        var _this = _super.call(this, parentId, className || ClassName.LOGO, ElementId.IMG_PREVIEW) || this;
        _this.illustration = new Illustration("", "", "Upload");
        return _this;
    }
    ImagePreviewElement.prototype.getElementTag = function () {
        return 'img';
    };
    ImagePreviewElement.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.src = this.illustration.path;
        return element;
    };
    ImagePreviewElement.prototype.setImage = function (illustration) {
        this.illustration = illustration;
        var element = this.getElement();
        if (element) {
            element.src = illustration.path;
        }
    };
    return ImagePreviewElement;
}(BaseComponent));
