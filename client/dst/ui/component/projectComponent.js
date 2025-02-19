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
exports.Recognition = exports.ProjectTeam = exports.ProjectPeriodInfo = exports.ProjectPanel = void 0;
var classnames_1 = require("../../../classnames");
var celement_1 = require("./celement");
var contentPanel_1 = require("../panel/contentPanel");
var linkElement_1 = require("./linkElement");
var textElement_1 = require("./textElement");
var ProjectPanel = (function (_super) {
    __extends(ProjectPanel, _super);
    function ProjectPanel(parent) {
        var _this = _super.call(this, parent, "id") || this;
        _this.name = classnames_1.CLASSNAMES.PROJECT_PANEL;
        return _this;
    }
    ProjectPanel.prototype.load = function (projects) {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.make_id(), "main");
            element.initiate();
            element.load();
        });
        projects.forEach(function (project) {
            _this.add(ProjectCard, project);
        });
        for (var _i = 0, _a = Object.entries(classnames_1.SECTIONMAP); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            this.add(SectionCard, value);
        }
    };
    ProjectPanel.prototype.add = function (element, args) {
        var div = new element(this.make_id(), args);
        div.initiate();
        div.load();
    };
    return ProjectPanel;
}(contentPanel_1.ContentPanel));
exports.ProjectPanel = ProjectPanel;
var Card = (function (_super) {
    __extends(Card, _super);
    function Card(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.link = "/project/".concat(_this.content.name);
        _this.name = classnames_1.CLASSNAMES.CARD;
        _this.parent = parent ? parent : classnames_1.CLASSNAMES.CARD;
        _this.elements = [
            ProjectTitle,
            ProjectCardInfo,
            ProjectCardButton
        ];
        return _this;
    }
    Card.prototype.initiate = function () {
        var _this = this;
        var element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
        element.addEventListener("click", function () {
            window.location.href = "".concat(_this.link);
        });
    };
    Card.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.make_id(), this.id, this.content);
            element.initiate();
            element.load();
        }
    };
    return Card;
}(celement_1.CElement));
var ProjectCard = (function (_super) {
    __extends(ProjectCard, _super);
    function ProjectCard(parent, project) {
        var _this = _super.call(this, parent, project === null || project === void 0 ? void 0 : project.name, project) || this;
        _this.link = "/project/".concat(_this.content.name);
        _this.name = classnames_1.CLASSNAMES.CARD;
        _this.parent = parent ? parent : classnames_1.CLASSNAMES.CARD;
        _this.elements = [
            ProjectTitle,
            ProjectCardInfo,
            ProjectCardButton
        ];
        return _this;
    }
    return ProjectCard;
}(Card));
var ProjectCardInfo = (function (_super) {
    __extends(ProjectCardInfo, _super);
    function ProjectCardInfo(parent, id, project) {
        var _this = _super.call(this, parent, id, project) || this;
        _this.name = "projectstatus";
        _this.content = project;
        _this.elements = [
            ProjectCardText
        ];
        return _this;
    }
    ProjectCardInfo.prototype._makeText = function (project) {
        return "\uD83D\uDCCD ".concat(project.getPlace(), "\n\uD83D\uDD59 ").concat(project.getPeriod(), "\n\uD83E\uDD42 ").concat(project.getStatus(), "\n");
    };
    ProjectCardInfo.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.make_id(), this.id, this._makeText(this.content));
            element.initiate();
        }
    };
    return ProjectCardInfo;
}(contentPanel_1.ContentPanel));
var ProjectTeam = (function (_super) {
    __extends(ProjectTeam, _super);
    function ProjectTeam(parent, id, team) {
        var _this = _super.call(this, parent, id, team) || this;
        _this.name = classnames_1.CLASSNAMES.TEAM;
        _this.content = team;
        _this.elements = team.map(function (t) { return TeamPersonInfo; });
        return _this;
    }
    ProjectTeam.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.make_id(), this.content[e].id, this.content[e]);
            element.initiate();
            element.load();
        }
    };
    return ProjectTeam;
}(contentPanel_1.ContentPanel));
exports.ProjectTeam = ProjectTeam;
var TeamPersonInfo = (function (_super) {
    __extends(TeamPersonInfo, _super);
    function TeamPersonInfo(parent, id, teamMember) {
        var _this = _super.call(this, parent, id, teamMember) || this;
        _this.name = classnames_1.CLASSNAMES.TEAM_MEMBER;
        _this.content = teamMember;
        _this.elements = [linkElement_1.LinkElement, textElement_1.TextElement];
        return _this;
    }
    TeamPersonInfo.prototype.load = function () {
        var element = new linkElement_1.LinkElement(this.make_id(), this.id, [this.content.name, this.content.link]);
        element.initiate();
        var element1 = new textElement_1.TextElement(this.make_id(), this.id, this.content.role);
        element1.initiate();
    };
    return TeamPersonInfo;
}(contentPanel_1.ContentPanel));
var ProjectPeriodInfo = (function (_super) {
    __extends(ProjectPeriodInfo, _super);
    function ProjectPeriodInfo(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = id;
        _this.content = content;
        _this.elements = [textElement_1.TextElement, textElement_1.TextElement, textElement_1.TextElement, textElement_1.TextElement];
        _this.args = [
            "Start: ",
            _this.content.period.start,
            "End: ",
            _this.content.period.end
        ];
        return _this;
    }
    ProjectPeriodInfo.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.make_id(), "".concat(e), this.args[e]);
            element.initiate();
            element.load();
        }
    };
    return ProjectPeriodInfo;
}(contentPanel_1.ContentPanel));
exports.ProjectPeriodInfo = ProjectPeriodInfo;
var Recognition = (function (_super) {
    __extends(Recognition, _super);
    function Recognition(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = id;
        _this.content = content;
        _this.elements = content.map(function (e) { return textElement_1.TextElement; });
        return _this;
    }
    Recognition.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.make_id(), "".concat(e), this.content[e].value);
            element.initiate();
            element.load();
        }
    };
    return Recognition;
}(contentPanel_1.ContentPanel));
exports.Recognition = Recognition;
var ProjectCardButton = (function (_super) {
    __extends(ProjectCardButton, _super);
    function ProjectCardButton(parent, id, project) {
        var _this = _super.call(this, parent, id, project) || this;
        _this.name = "projectButton";
        _this.content = project;
        return _this;
    }
    ProjectCardButton.prototype.initiate = function () {
        var _this = this;
        var element = document.createElement("button");
        element.innerHTML = ProjectCardButton._text;
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
        element.addEventListener("click", function () {
            window.location.href = "/project/".concat(_this.content);
        });
    };
    ProjectCardButton._text = "To project";
    return ProjectCardButton;
}(celement_1.CElement));
var ProjectCardText = (function (_super) {
    __extends(ProjectCardText, _super);
    function ProjectCardText(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = classnames_1.CLASSNAMES.PROJECT_DESCRIPTION;
        _this.content = content;
        return _this;
    }
    return ProjectCardText;
}(textElement_1.TextElement));
var ProjectTitle = (function (_super) {
    __extends(ProjectTitle, _super);
    function ProjectTitle(parent, id, project) {
        var _this = _super.call(this, parent, id, project.name) || this;
        _this.name = classnames_1.CLASSNAMES.TITLE;
        return _this;
    }
    return ProjectTitle;
}(textElement_1.TextElement));
var SectionCard = (function (_super) {
    __extends(SectionCard, _super);
    function SectionCard(parent, section) {
        var _this = _super.call(this, parent, section[0], section) || this;
        _this.id = section[0];
        _this.content = section[0];
        _this.name = "".concat(classnames_1.CLASSNAMES.CARD, " section");
        _this.parent = parent ? parent : classnames_1.CLASSNAMES.PROJECT_PANEL;
        _this.link = section[1];
        _this.elements = [ProjectCardText];
        return _this;
    }
    SectionCard.prototype._makeText = function (content) {
        return "".concat(content);
    };
    SectionCard.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.make_id(), this.id, this._makeText(this.content));
            element.initiate();
        }
    };
    return SectionCard;
}(Card));
