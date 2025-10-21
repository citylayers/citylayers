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
var CategorySidePanel = (function (_super) {
    __extends(CategorySidePanel, _super);
    function CategorySidePanel(parent, category) {
        var _this = _super.call(this, parent || "body", ClassName.CATEGORY_SIDE_PANEL, category.name) || this;
        _this.category = category;
        _this.content = category;
        _this.elements = [
            CloseButton,
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
            el.style.display = DisplayStyle.NONE;
        }
    };
    CategorySidePanel.toggle = function (category) {
        var sidePanel = document.getElementById("".concat(ClassName.CATEGORY_SIDE_PANEL, "_").concat(category.name));
        var container = document.getElementById("".concat(ClassName.CATEGORY_CONTAINER, "_").concat(category.name));
        if (!sidePanel || !container)
            return;
        if (sidePanel.style.display === DisplayStyle.NONE) {
            this.hideAll();
        }
        container.classList.toggle("simple-drop-shadow");
        sidePanel.style.display = sidePanel.style.display === DisplayStyle.NONE
            ? DisplayStyle.FLEX
            : DisplayStyle.NONE;
        document.body.style.setProperty("--side-panel-color", "#".concat(category.color));
    };
    CategorySidePanel.hideAll = function () {
        var _a;
        var panels = document.getElementsByClassName(ClassName.CATEGORY_SIDE_PANEL);
        var containers = document.getElementsByClassName(ClassName.CATEGORY_CONTAINER);
        for (var i = 0; i < panels.length; i++) {
            panels[i].style.display = DisplayStyle.NONE;
            (_a = containers[i]) === null || _a === void 0 ? void 0 : _a.classList.remove("simple-drop-shadow");
        }
    };
    return CategorySidePanel;
}(BaseComponent));
var CategorySidePanelTagContainer = (function (_super) {
    __extends(CategorySidePanelTagContainer, _super);
    function CategorySidePanelTagContainer(parent, category) {
        var _this = _super.call(this, parent, ClassName.CATEGORY_SIDE_TAG_CONTAINER, category.id) || this;
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
}(BaseComponent));
var CategoryDescription = (function (_super) {
    __extends(CategoryDescription, _super);
    function CategoryDescription(parent, category) {
        var _this = _super.call(this, parent, category.id) || this;
        _this.className = ClassName.CATEGORY_DESCRIPTION;
        _this.content = category.description;
        return _this;
    }
    return CategoryDescription;
}(TextElement));
var CategorySidePanelTagTitle = (function (_super) {
    __extends(CategorySidePanelTagTitle, _super);
    function CategorySidePanelTagTitle(parent, category) {
        var _this = _super.call(this, parent, ClassName.CATEGORY_SIDE_TAG_CONTAINER_TITLE, category.name) || this;
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
}(BaseComponent));
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
}(BaseComponent));
var CategorySidePanelTagContainerS = (function (_super) {
    __extends(CategorySidePanelTagContainerS, _super);
    function CategorySidePanelTagContainerS(parent, category) {
        var _this = _super.call(this, parent, ClassName.CATEGORY_SIDE_TAG_CONTAINER_S, category.name) || this;
        _this.category = category;
        _this.content = category;
        return _this;
    }
    CategorySidePanelTagContainerS.prototype.load = function () {
        var _this = this;
        if (!this.content.subcategories)
            return;
        this.content.subcategories.forEach(function (subcat) {
            var element = new SubcategoryTag(_this.makeId(), subcat);
            element.initiate();
        });
    };
    return CategorySidePanelTagContainerS;
}(BaseComponent));
