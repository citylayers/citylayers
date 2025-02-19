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
var classnames_1 = require("../../../classnames");
var celement_1 = require("../component/celement");
var closeButton_1 = require("../component/closeButton");
var textElement_1 = require("../component/textElement");
var contentPanel_1 = require("./contentPanel");
var ProjectContentPanel = (function (_super) {
    __extends(ProjectContentPanel, _super);
    function ProjectContentPanel(parent) {
        var _this = _super.call(this, parent, "") || this;
        _this.name = classnames_1.CLASSNAMES.PROJECT_PANEL;
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
    function ProjectElement(parent, project) {
        var _this = _super.call(this, parent, project.name) || this;
        _this.content = project;
        _this.name = classnames_1.CLASSNAMES.CATEGORY_CONTAINER;
        _this.parent = parent ? parent : classnames_1.CLASSNAMES.CATEGORY_PANEL;
        _this.elements = [
            ProjectHeader,
            ProjectDescription
        ];
        return _this;
    }
    ProjectElement.prototype.getParent = function () {
        var element = document.getElementById(this.parent);
        return element;
    };
    ProjectElement.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.make_id(), this.id, this.content);
            element.initiate();
            element.load();
        }
    };
    ProjectElement.prototype.initiate = function () {
        var panel = document.createElement("div");
        panel.setAttribute('class', this.name);
        panel.setAttribute("id", this.make_id());
        this.getParent().appendChild(panel);
    };
    return ProjectElement;
}(celement_1.CElement));
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
        _this.name = classnames_1.CLASSNAMES.CATEGORY_DESCRIPTION;
        _this.content = project.info.description;
        return _this;
    }
    return ProjectDescription;
}(textElement_1.TextElement));
var ProjectSwitch = (function (_super) {
    __extends(ProjectSwitch, _super);
    function ProjectSwitch(parent, id, project) {
        var _this = _super.call(this, parent, id, project) || this;
        _this.id = id;
        _this.name = classnames_1.CLASSNAMES.CATEGORY_SWITCH;
        _this.content = project;
        _this.parent = parent;
        return _this;
    }
    ProjectSwitch.isActive = function (project) {
        var d = document.getElementById("".concat(this.name, "_").concat(project));
        var child = d.children[0];
        return child.checked;
    };
    ProjectSwitch.prototype.initiate = function () {
        var element = document.createElement("label");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
        var e1 = document.createElement("input");
        e1.setAttribute("type", "checkbox");
        e1.onchange = function () {
        };
        var e2 = document.createElement("span");
        element.appendChild(e1);
        element.appendChild(e2);
    };
    return ProjectSwitch;
}(celement_1.CElement));
var ProjectConfig = (function (_super) {
    __extends(ProjectConfig, _super);
    function ProjectConfig(parent, id, project) {
        var _this = _super.call(this, parent, id) || this;
        _this.name = classnames_1.CLASSNAMES.CONFIG;
        _this.content = "Configure >";
        _this.id = id;
        _this.project = project;
        return _this;
    }
    ProjectConfig.prototype.initiate = function () {
        var element = document.createElement("div");
        element.innerHTML = this.content;
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.onclick = function () {
        };
        this.getParent().appendChild(element);
    };
    return ProjectConfig;
}(celement_1.CElement));
var ProjectSidePanel = (function (_super) {
    __extends(ProjectSidePanel, _super);
    function ProjectSidePanel(parent, project) {
        var _this = _super.call(this, parent, project.name) || this;
        _this.parent = parent ? parent : "body";
        _this.name = classnames_1.CLASSNAMES.CATEGORY_SIDE_PANEL;
        _this.content = project;
        _this.elements = [closeButton_1.CloseButton,
            textElement_1.TextElement,
        ];
        _this.args = [function () { ProjectSidePanel.toggle(project); }];
        return _this;
    }
    ProjectSidePanel.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.make_id(), this.content, e < this.args.length ? this.args[e] : undefined);
            element.initiate();
            element.load();
        }
        this.getElement().style.display = "none";
    };
    ProjectSidePanel.toggle = function (category) {
        var sidePanel = document.getElementById("".concat(classnames_1.CLASSNAMES.CATEGORY_SIDE_PANEL, "_").concat(category.name));
        var container = document.getElementById("".concat(classnames_1.CLASSNAMES.CATEGORY_CONTAINER, "_").concat(category.name));
        if (sidePanel.style.display === "none") {
            this.hideAll();
        }
        container.classList.toggle("simple-drop-shadow");
        sidePanel.style.display = sidePanel.style.display === "none" ? "flex" : "none";
        document.body.style.setProperty("--side-panel-color", "#".concat(category.color));
        console.log(document.body.style.getPropertyValue("--side-panel-color"));
    };
    ProjectSidePanel.hideAll = function () {
        var panels = document.getElementsByClassName(classnames_1.CLASSNAMES.CATEGORY_SIDE_PANEL);
        var containers = document.getElementsByClassName(classnames_1.CLASSNAMES.CATEGORY_CONTAINER);
        Array.from(panels).forEach(function (panel) {
        });
        for (var i = 0; i < panels.length; i++) {
            panels[i].style.display = "none";
            containers[i].classList.remove("simple-drop-shadow");
        }
    };
    return ProjectSidePanel;
}(celement_1.CElement));
