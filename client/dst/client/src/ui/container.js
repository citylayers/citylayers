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
var PanelHeader = (function (_super) {
    __extends(PanelHeader, _super);
    function PanelHeader(parent, id) {
        var _this = _super.call(this, parent, ClassName.CATEGORYPANEL_HEADER, id) || this;
        _this.elements = [CategoryPanelLabel, CategoryPanelDescr, ToProjects];
        return _this;
    }
    PanelHeader.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.makeId(), this.id);
            element.initiate();
        }
    };
    return PanelHeader;
}(BaseComponent));
var ToProjects = (function (_super) {
    __extends(ToProjects, _super);
    function ToProjects(parent, id) {
        var _this = _super.call(this, parent, ClassName.CATEGORYPANEL_LABEL, id) || this;
        _this.content = ToProjects.content;
        _this.clickHandler = function () {
            var CityLayersPanel = window.CityLayersPanel;
            if (CityLayersPanel) {
                CityLayersPanel.switch();
            }
        };
        return _this;
    }
    ToProjects.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.classList.add(ClassName.CLICK);
        element.innerHTML = this.content;
        return element;
    };
    ToProjects.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    ToProjects.activate = function (on) {
        var elements = Array.from(document.getElementsByClassName(ClassName.CATEGORYPANEL_LABEL)).filter(function (e) { return e.innerText == ToProjects.content; });
        if (elements.length > 0) {
            elements[0].style.display = on === false ? DisplayStyle.NONE : DisplayStyle.FLEX;
        }
    };
    ToProjects.hide = function () {
        var elements = Array.from(document.getElementsByClassName(ClassName.CATEGORYPANEL_LABEL)).filter(function (e) { return e.innerText == ToProjects.content; });
        if (elements.length > 0) {
            elements[0].style.display = DisplayStyle.NONE;
        }
    };
    ToProjects.content = "< To projects";
    return ToProjects;
}(BaseComponent));
var CategoryPanelLabel = (function (_super) {
    __extends(CategoryPanelLabel, _super);
    function CategoryPanelLabel(parent, id) {
        var _this = _super.call(this, parent, ClassName.CATEGORYPANEL_LABEL, id) || this;
        _this.content = "Explore and compare layers";
        return _this;
    }
    CategoryPanelLabel.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    return CategoryPanelLabel;
}(BaseComponent));
var CategoryPanelDescr = (function (_super) {
    __extends(CategoryPanelDescr, _super);
    function CategoryPanelDescr(parent, id) {
        var _this = _super.call(this, parent, ClassName.CATEGORYPANEL_DESCR, id) || this;
        _this.content = "Activate and adjust the ranges of \
                the various categories below in order to visualise \
                them in the space.";
        return _this;
    }
    CategoryPanelDescr.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    return CategoryPanelDescr;
}(BaseComponent));
var CategoryElement = (function (_super) {
    __extends(CategoryElement, _super);
    function CategoryElement(parent, category) {
        var _this = _super.call(this, parent || ClassName.CATEGORY_PANEL, ClassName.CATEGORY_CONTAINER, category.name) || this;
        _this.category = category;
        _this.content = category;
        _this.elements = [
            CategoryHeader,
            DoubleSlider,
            SubcategoryTagContainer,
            CategorySidePanel
        ];
        return _this;
    }
    CategoryElement.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = void 0;
            switch (this.elements[e]) {
                case (CategorySidePanel):
                    element = new this.elements[e](this.makeId(), this.content);
                    element.parent = "right-container";
                    break;
                case (CategoryHeader):
                    element = new this.elements[e](this.makeId(), this.content.name, this.content);
                    break;
                case (DoubleSlider):
                    element = new this.elements[e](this.makeId(), this.content.name, this.content);
                    break;
                default:
                    element = new this.elements[e](this.makeId(), this.content.name, this.content.subcategories);
            }
            element.initiate();
            element.load();
        }
    };
    return CategoryElement;
}(BaseComponent));
var CategoryHeader = (function (_super) {
    __extends(CategoryHeader, _super);
    function CategoryHeader(parent, id, category) {
        var _this = _super.call(this, parent, ClassName.CATEGORY_HEADER, id) || this;
        _this.category = category;
        _this.elements = [CategoryInfo, CategoryLabel, CategorySwitch];
        return _this;
    }
    CategoryHeader.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.makeId(), this.id, this.category);
            element.initiate();
        }
    };
    return CategoryHeader;
}(BaseComponent));
var CategoryLabel = (function (_super) {
    __extends(CategoryLabel, _super);
    function CategoryLabel(parent, id) {
        return _super.call(this, parent, ClassName.CATEGORY_HEADER_TITLE, id) || this;
    }
    CategoryLabel.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.id;
        return element;
    };
    return CategoryLabel;
}(BaseComponent));
var Switch = (function (_super) {
    __extends(Switch, _super);
    function Switch(parent, id, category) {
        var _this = _super.call(this, parent, ClassName.SWITCH, id) || this;
        _this.category = category;
        return _this;
    }
    return Switch;
}(BaseComponent));
var CategorySwitch = (function (_super) {
    __extends(CategorySwitch, _super);
    function CategorySwitch(parent, id, category) {
        var _this = _super.call(this, parent, id, category) || this;
        _this.className = ClassName.CATEGORY_SWITCH;
        _this.changeHandler = function () {
        };
        return _this;
    }
    CategorySwitch.prototype.getElementTag = function () {
        return 'label';
    };
    CategorySwitch.prototype.afterInit = function () {
        var element = this.getElement();
        if (!element)
            return;
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.onchange = this.changeHandler;
        var span = document.createElement("span");
        element.appendChild(checkbox);
        element.appendChild(span);
    };
    CategorySwitch._name = ClassName.CATEGORY_SWITCH;
    return CategorySwitch;
}(Switch));
var CategoryInfo = (function (_super) {
    __extends(CategoryInfo, _super);
    function CategoryInfo(parent, id, category) {
        var _this = _super.call(this, parent, "material-symbols-outlined", id) || this;
        _this.category = category;
        _this.content = "info";
        _this.clickHandler = function () {
            CategorySidePanel.toggle(_this.category);
        };
        return _this;
    }
    CategoryInfo.prototype.getElementTag = function () {
        return 'span';
    };
    CategoryInfo.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    CategoryInfo.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    return CategoryInfo;
}(BaseComponent));
var SubcategoryTagContainer = (function (_super) {
    __extends(SubcategoryTagContainer, _super);
    function SubcategoryTagContainer(parent, id) {
        return _super.call(this, parent, ClassName.TAG_CONTAINER, id) || this;
    }
    SubcategoryTagContainer.prototype.load = function (labels) {
        var _this = this;
        if (labels === undefined) {
            labels = [];
        }
        labels.forEach(function (label) {
            var element = new SubcategoryTag(_this.makeId(), label);
            element.initiate();
        });
    };
    SubcategoryTagContainer.getByCategory = function (category) {
        return document.getElementById("".concat(this.cname, "_").concat(category));
    };
    SubcategoryTagContainer.addLabel = function (category, label, togglable) {
        if (togglable === void 0) { togglable = false; }
        togglable = false;
        var element = new SubcategoryTag("".concat(this.cname, "_").concat(category), label);
        element.initiate(togglable);
    };
    SubcategoryTagContainer.cname = ClassName.TAG_CONTAINER;
    return SubcategoryTagContainer;
}(BaseComponent));
var SubcategoryTag = (function (_super) {
    __extends(SubcategoryTag, _super);
    function SubcategoryTag(parent, tag) {
        var _this = this;
        var tagName = tag.name !== undefined ? tag.name : tag;
        _this = _super.call(this, parent, ClassName.SUBCATEGORY_TAG, tagName) || this;
        _this.tag = tag;
        _this.subcat_id = tag.id;
        return _this;
    }
    SubcategoryTag.prototype.toggle = function () {
        var _a;
        var parentElement = this.getParent();
        if (!parentElement || !parentElement.parentElement || !parentElement.parentElement.parentElement)
            return;
        var _cname = parentElement.parentElement.parentElement.className;
        var _id = parentElement.parentElement.parentElement.id;
        var category = _id.replace("".concat(_cname, "_"), "");
        var new_id = "".concat(this.className, "_").concat(this.id);
        var ControllerMultiCategorical = window.ControllerMultiCategorical;
        var ConfigPanel = window.ConfigPanel;
        if (!ControllerMultiCategorical || !ConfigPanel)
            return;
        var container = ControllerMultiCategorical.getByCategory(category);
        var existing_ids = Array.from(container.children).map(function (el) { return el.id; });
        if (existing_ids.includes(new_id)) {
            (_a = document.getElementById(new_id)) === null || _a === void 0 ? void 0 : _a.remove();
        }
        else {
            ControllerMultiCategorical.addLabel(category, this.id, true);
        }
        ConfigPanel.markertoggle(this.subcat_id, !existing_ids.includes(new_id));
    };
    SubcategoryTag.prototype.initiate = function (togglable) {
        var _this = this;
        if (togglable === void 0) { togglable = true; }
        _super.prototype.initiate.call(this);
        var element = this.getElement();
        if (!element)
            return;
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        var labelContainer = document.createElement("div");
        labelContainer.setAttribute("class", "tag-element");
        var label = document.createElement("label");
        label.innerHTML = this.id;
        labelContainer.appendChild(label);
        element.appendChild(checkbox);
        element.appendChild(labelContainer);
        if (togglable) {
            checkbox.onclick = function () { _this.toggle(); };
        }
        else {
            checkbox.setAttribute("disabled", "true");
        }
    };
    return SubcategoryTag;
}(BaseComponent));
