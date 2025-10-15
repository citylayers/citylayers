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
exports.CategorySidePanelTagContainerS = exports.HorizontalDivider = exports.CategorySidePanelTagTitle = exports.CategoryDescription = exports.CategorySidePanelTagContainer = exports.CategorySidePanel = void 0;
var BaseComponent_1 = require("../component/BaseComponent");
var textElement_1 = require("../component/textElement");
var closeButton_1 = require("../component/closeButton");
var container_1 = require("../container");
var ClassNames_1 = require("../../constants/ClassNames");
var CategorySidePanel = (function (_super) {
    __extends(CategorySidePanel, _super);
    function CategorySidePanel(parent, category) {
        var _this = _super.call(this, parent || "body", ClassNames_1.ClassName.CATEGORY_SIDE_PANEL, category.name) || this;
        _this.category = category;
        _this.content = category;
        _this.elements = [
            closeButton_1.CloseButton,
            CategoryDescription,
            CategorySidePanelTagContainer
        ];
        _this.args = [function () { CategorySidePanel.toggle(category); }];
        return _this;
    }
    CategorySidePanel.prototype.getParent = function () {
        var elements = document.getElementsByClassName(this.parentId);
        if (elements.length > 0) {
            return elements[0];
        }
        return _super.prototype.getParent.call(this);
    };
    CategorySidePanel.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.makeId(), this.content, e < this.args.length ? this.args[e] : undefined);
            element.initiate();
            element.load();
        }
        var el = this.getElement();
        if (el) {
            el.style.display = ClassNames_1.DisplayStyle.NONE;
        }
    };
    CategorySidePanel.toggle = function (category) {
        var sidePanel = document.getElementById("".concat(ClassNames_1.ClassName.CATEGORY_SIDE_PANEL, "_").concat(category.name));
        var container = document.getElementById("".concat(ClassNames_1.ClassName.CATEGORY_CONTAINER, "_").concat(category.name));
        if (!sidePanel || !container)
            return;
        if (sidePanel.style.display === ClassNames_1.DisplayStyle.NONE) {
            this.hideAll();
        }
        container.classList.toggle("simple-drop-shadow");
        sidePanel.style.display = sidePanel.style.display === ClassNames_1.DisplayStyle.NONE
            ? ClassNames_1.DisplayStyle.FLEX
            : ClassNames_1.DisplayStyle.NONE;
        document.body.style.setProperty("--side-panel-color", "#".concat(category.color));
    };
    CategorySidePanel.hideAll = function () {
        var _a;
        var panels = document.getElementsByClassName(ClassNames_1.ClassName.CATEGORY_SIDE_PANEL);
        var containers = document.getElementsByClassName(ClassNames_1.ClassName.CATEGORY_CONTAINER);
        for (var i = 0; i < panels.length; i++) {
            panels[i].style.display = ClassNames_1.DisplayStyle.NONE;
            (_a = containers[i]) === null || _a === void 0 ? void 0 : _a.classList.remove("simple-drop-shadow");
        }
    };
    return CategorySidePanel;
}(BaseComponent_1.BaseComponent));
exports.CategorySidePanel = CategorySidePanel;
var CategorySidePanelTagContainer = (function (_super) {
    __extends(CategorySidePanelTagContainer, _super);
    function CategorySidePanelTagContainer(parent, category) {
        var _this = _super.call(this, parent, ClassNames_1.ClassName.CATEGORY_SIDE_TAG_CONTAINER, category.id) || this;
        _this.category = category;
        _this.content = category;
        _this.elements = [
            HorizontalDivider,
            CategorySidePanelTagTitle,
            CategorySidePanelTagContainerS
        ];
        return _this;
    }
    CategorySidePanelTagContainer.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.makeId(), this.content);
            element.initiate();
            element.load();
        }
    };
    return CategorySidePanelTagContainer;
}(BaseComponent_1.BaseComponent));
exports.CategorySidePanelTagContainer = CategorySidePanelTagContainer;
var CategoryDescription = (function (_super) {
    __extends(CategoryDescription, _super);
    function CategoryDescription(parent, category) {
        var _this = _super.call(this, parent, category.id) || this;
        _this.className = ClassNames_1.ClassName.CATEGORY_DESCRIPTION;
        _this.content = category.description;
        return _this;
    }
    return CategoryDescription;
}(textElement_1.TextElement));
exports.CategoryDescription = CategoryDescription;
var CategorySidePanelTagTitle = (function (_super) {
    __extends(CategorySidePanelTagTitle, _super);
    function CategorySidePanelTagTitle(parent, category) {
        var _this = _super.call(this, parent, ClassNames_1.ClassName.CATEGORY_SIDE_TAG_CONTAINER_TITLE, category.name) || this;
        _this.category = category;
        _this.content = "Filter by tags";
        _this.clickHandler = function () {
            CategorySidePanel.toggle(_this.category);
        };
        return _this;
    }
    CategorySidePanelTagTitle.prototype.getElementTag = function () {
        return 'button';
    };
    CategorySidePanelTagTitle.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    CategorySidePanelTagTitle.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    return CategorySidePanelTagTitle;
}(BaseComponent_1.BaseComponent));
exports.CategorySidePanelTagTitle = CategorySidePanelTagTitle;
var HorizontalDivider = (function (_super) {
    __extends(HorizontalDivider, _super);
    function HorizontalDivider(parent, category) {
        return _super.call(this, parent, '', category.id) || this;
    }
    HorizontalDivider.prototype.getElementTag = function () {
        return 'hr';
    };
    HorizontalDivider.prototype.load = function () {
    };
    return HorizontalDivider;
}(BaseComponent_1.BaseComponent));
exports.HorizontalDivider = HorizontalDivider;
var CategorySidePanelTagContainerS = (function (_super) {
    __extends(CategorySidePanelTagContainerS, _super);
    function CategorySidePanelTagContainerS(parent, category) {
        var _this = _super.call(this, parent, ClassNames_1.ClassName.CATEGORY_SIDE_TAG_CONTAINER_S, category.name) || this;
        _this.category = category;
        _this.content = category;
        return _this;
    }
    CategorySidePanelTagContainerS.prototype.load = function () {
        var _this = this;
        if (!this.content.subcategories)
            return;
        this.content.subcategories.forEach(function (subcat) {
            var element = new container_1.SubcategoryTag(_this.makeId(), subcat);
            element.initiate();
        });
    };
    return CategorySidePanelTagContainerS;
}(BaseComponent_1.BaseComponent));
exports.CategorySidePanelTagContainerS = CategorySidePanelTagContainerS;
