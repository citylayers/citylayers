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
exports.ProjectContentPanel = void 0;
var ClassNames_1 = require("../../constants/ClassNames");
var BaseComponent_1 = require("../component/BaseComponent");
var closeButton_1 = require("../component/closeButton");
var textElement_1 = require("../component/textElement");
var contentPanel_1 = require("./contentPanel");
var ClassNames_2 = require("../../constants/ClassNames");
var ProjectContentPanel = (function (_super) {
    __extends(ProjectContentPanel, _super);
    function ProjectContentPanel(parent) {
        var _this = _super.call(this, parent, "") || this;
        _this.name = ClassNames_2.CLASSNAMES.PROJECT_PANEL;
        return _this;
    }
    ProjectContentPanel.prototype.load = function (projects) {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.make_id(), "main");
            element.initiate();
            element.load();
        });
        projects.forEach(function (project, c) {
            _this.add(project);
        });
    };
    ProjectContentPanel.prototype.add = function (project) {
        var div = new ProjectElement(this.make_id(), project);
        div.initiate();
        div.load();
    };
    return ProjectContentPanel;
}(contentPanel_1.ContentPanel));
exports.ProjectContentPanel = ProjectContentPanel;
var ProjectElement = (function (_super) {
    __extends(ProjectElement, _super);
    function ProjectElement(parentId, project) {
        var _this = _super.call(this, parentId || ClassNames_1.ClassName.CATEGORY_PANEL, ClassNames_1.ClassName.CATEGORY_CONTAINER, project.name) || this;
        _this.project = project;
        _this.elements = [ProjectHeader, ProjectDescription];
        return _this;
    }
    ProjectElement.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.makeId(), this.id, this.project);
            element.initiate();
            element.load();
        }
    };
    return ProjectElement;
}(BaseComponent_1.BaseComponent));
var ProjectHeader = (function (_super) {
    __extends(ProjectHeader, _super);
    function ProjectHeader(parent, id, project) {
        var _this = _super.call(this, parent, id, project) || this;
        _this.elements = [
            textElement_1.HeaderElement, ProjectConfig,
            ProjectSwitch
        ];
        return _this;
    }
    return ProjectHeader;
}(contentPanel_1.ContentPanel));
var ProjectDescription = (function (_super) {
    __extends(ProjectDescription, _super);
    function ProjectDescription(parent, id, project) {
        var _this = _super.call(this, parent, id) || this;
        _this.name = ClassNames_2.CLASSNAMES.CATEGORY_DESCRIPTION;
        _this.content = project.info.description;
        return _this;
    }
    return ProjectDescription;
}(textElement_1.TextElement));
var ProjectSwitch = (function (_super) {
    __extends(ProjectSwitch, _super);
    function ProjectSwitch(parentId, id, project) {
        var _this = _super.call(this, parentId, ClassNames_1.ClassName.CATEGORY_SWITCH, id, project) || this;
        _this.project = project;
        return _this;
    }
    ProjectSwitch.isActive = function (project) {
        var element = document.getElementById("".concat(ClassNames_1.ClassName.CATEGORY_SWITCH, "_").concat(project));
        if (element) {
            var child = element.children[0];
            return child.checked;
        }
        return false;
    };
    ProjectSwitch.prototype.getElementTag = function () {
        return 'label';
    };
    ProjectSwitch.prototype.afterInit = function () {
        var element = this.getElement();
        if (element) {
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.onchange = function () {
            };
            var span = document.createElement("span");
            element.appendChild(checkbox);
            element.appendChild(span);
        }
    };
    ProjectSwitch.name = ClassNames_1.ClassName.CATEGORY_SWITCH;
    return ProjectSwitch;
}(BaseComponent_1.BaseComponent));
var ProjectConfig = (function (_super) {
    __extends(ProjectConfig, _super);
    function ProjectConfig(parentId, id, project) {
        var _this = _super.call(this, parentId, ClassNames_1.ClassName.CONFIG, id) || this;
        _this.project = project;
        _this.clickHandler = function () {
        };
        return _this;
    }
    ProjectConfig.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = "Configure >";
        return element;
    };
    ProjectConfig.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    return ProjectConfig;
}(BaseComponent_1.BaseComponent));
var ProjectSidePanel = (function (_super) {
    __extends(ProjectSidePanel, _super);
    function ProjectSidePanel(parentId, project) {
        var _this = _super.call(this, parentId || "body", ClassNames_1.ClassName.CATEGORY_SIDE_PANEL, project.name) || this;
        _this.project = project;
        _this.elements = [closeButton_1.CloseButton, textElement_1.TextElement];
        _this.args = [function () { ProjectSidePanel.toggle(project); }];
        return _this;
    }
    ProjectSidePanel.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.makeId(), this.project, e < this.args.length ? this.args[e] : undefined);
            element.initiate();
            element.load();
        }
        var el = this.getElement();
        if (el) {
            el.style.display = "none";
        }
    };
    ProjectSidePanel.toggle = function (category) {
        var sidePanel = document.getElementById("".concat(ClassNames_1.ClassName.CATEGORY_SIDE_PANEL, "_").concat(category.name));
        var container = document.getElementById("".concat(ClassNames_1.ClassName.CATEGORY_CONTAINER, "_").concat(category.name));
        if (sidePanel && container) {
            if (sidePanel.style.display === "none") {
                this.hideAll();
            }
            container.classList.toggle("simple-drop-shadow");
            sidePanel.style.display = sidePanel.style.display === "none" ? "flex" : "none";
            document.body.style.setProperty("--side-panel-color", "#".concat(category.color));
        }
    };
    ProjectSidePanel.hideAll = function () {
        var panels = document.getElementsByClassName(ClassNames_1.ClassName.CATEGORY_SIDE_PANEL);
        var containers = document.getElementsByClassName(ClassNames_1.ClassName.CATEGORY_CONTAINER);
        for (var i = 0; i < panels.length; i++) {
            panels[i].style.display = "none";
            containers[i].classList.remove("simple-drop-shadow");
        }
    };
    return ProjectSidePanel;
}(BaseComponent_1.BaseComponent));
