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
var ContentPanel = (function (_super) {
    __extends(ContentPanel, _super);
    function ContentPanel(parentId, id, content) {
        var _this = _super.call(this, parentId || "body", "", id, content) || this;
        _this.elements = [];
        _this.name = "";
        _this.parent = parentId;
        return _this;
    }
    ContentPanel.prototype.createElement = function () {
        var element = document.createElement(this.getElementTag());
        element.setAttribute('class', this.name || ClassName.CATEGORY_PANEL);
        element.setAttribute('id', this.makeId());
        return element;
    };
    ContentPanel.prototype.makeId = function () {
        return "".concat(this.name || this.className, "_").concat(this.id);
    };
    ContentPanel.prototype.getParent = function () {
        if (this.parentId === "body") {
            return document.body;
        }
        return document.getElementById(this.parentId);
    };
    ContentPanel.prototype.load = function (categories, args) {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.makeId(), _this.id);
            element.initiate();
            element.load();
        });
        _super.prototype.load.call(this);
    };
    ContentPanel.prototype.add = function (element, args) {
    };
    ContentPanel.activate = function (on) {
        var mode = on ? DisplayStyle.FLEX : DisplayStyle.NONE;
        var elements = document.getElementsByClassName(ClassName.CATEGORY_PANEL);
        if (elements.length > 0) {
            var el = elements[0];
            el.style.display = mode;
        }
    };
    return ContentPanel;
}(BaseComponent));
