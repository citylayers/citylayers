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
var ProjectPanel = (function (_super) {
    __extends(ProjectPanel, _super);
    function ProjectPanel(parent) {
        var _this = _super.call(this, parent, "id") || this;
        _this.name = CLASSNAMES.PROJECT_PANEL;
        return _this;
    }
    ProjectPanel.prototype.load = function (projects) {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.makeId(), "main");
            element.initiate();
            element.load();
        });
        projects.forEach(function (project) {
            _this.add(ProjectCard, project);
        });
        for (var _i = 0, _a = Object.entries(SECTIONMAP); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            this.add(SectionCard, value);
        }
    };
    ProjectPanel.prototype.add = function (element, args) {
        var div = new element(this.makeId(), args);
        div.initiate();
        div.load();
    };
    return ProjectPanel;
}(ContentPanel));
var Card = (function (_super) {
    __extends(Card, _super);
    function Card(parentId, id, content) {
        var _a;
        var _this = _super.call(this, parentId || ClassName.CARD, ClassName.CARD, id, content) || this;
        _this.cardContent = content;
        _this.link = "/project/".concat((_a = _this.cardContent) === null || _a === void 0 ? void 0 : _a.name);
        _this.elements = [ProjectTitle, ProjectCardInfo, ProjectCardButton];
        _this.clickHandler = function () {
            window.location.href = _this.link;
        };
        return _this;
    }
    Card.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    Card.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.makeId(), this.id, this.cardContent);
            element.initiate();
            element.load();
        }
    };
    return Card;
}(BaseComponent));
var ProjectCard = (function (_super) {
    __extends(ProjectCard, _super);
    function ProjectCard(parent, project) {
        var _this = _super.call(this, parent, project === null || project === void 0 ? void 0 : project.name, project) || this;
        _this.link = "/project/".concat(_this.content.name);
        _this.name = CLASSNAMES.CARD;
        _this.parent = parent ? parent : CLASSNAMES.CARD;
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
        return "\uD83D\uDD59 ".concat(project.getPeriod(), "\n\uD83E\uDD42 ").concat(project.getStatus(), "\n");
    };
    ProjectCardInfo.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.makeId(), this.id, this._makeText(this.content));
            element.initiate();
        }
    };
    return ProjectCardInfo;
}(ContentPanel));
var ProjectTeam = (function (_super) {
    __extends(ProjectTeam, _super);
    function ProjectTeam(parent, id, team) {
        var _this = _super.call(this, parent, id, team) || this;
        _this.name = CLASSNAMES.TEAM;
        _this.content = team;
        _this.elements = team.map(function (t) { return TeamPersonInfo; });
        return _this;
    }
    ProjectTeam.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.makeId(), this.content[e].id, this.content[e]);
            element.initiate();
            element.load();
        }
    };
    return ProjectTeam;
}(ContentPanel));
var TeamPersonInfo = (function (_super) {
    __extends(TeamPersonInfo, _super);
    function TeamPersonInfo(parent, id, teamMember) {
        var _this = _super.call(this, parent, id, teamMember) || this;
        _this.name = CLASSNAMES.TEAM_MEMBER;
        _this.content = teamMember;
        _this.elements = [LinkElement, TextElement];
        return _this;
    }
    TeamPersonInfo.prototype.load = function () {
        var element = new LinkElement(this.makeId(), this.id, [this.content.name, this.content.link]);
        element.initiate();
        var element1 = new TextElement(this.makeId(), this.id, this.content.role);
        element1.initiate();
    };
    return TeamPersonInfo;
}(ContentPanel));
var ProjectPeriodInfo = (function (_super) {
    __extends(ProjectPeriodInfo, _super);
    function ProjectPeriodInfo(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = id;
        _this.content = content;
        _this.elements = [TextElement, TextElement, TextElement, TextElement];
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
            var element = new this.elements[e](this.makeId(), "".concat(e), this.args[e]);
            element.initiate();
            element.load();
        }
    };
    return ProjectPeriodInfo;
}(ContentPanel));
var Recognition = (function (_super) {
    __extends(Recognition, _super);
    function Recognition(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = id;
        _this.content = content;
        _this.elements = content.map(function (e) { return TextElement; });
        return _this;
    }
    Recognition.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.makeId(), "".concat(e), this.content[e].value);
            element.initiate();
            element.load();
        }
    };
    return Recognition;
}(ContentPanel));
var ProjectCardButton = (function (_super) {
    __extends(ProjectCardButton, _super);
    function ProjectCardButton(parentId, id, project) {
        var _this = _super.call(this, parentId, "projectButton", id, project) || this;
        _this.project = project;
        _this.clickHandler = function () {
            window.location.href = "/project/".concat(_this.project.name);
        };
        return _this;
    }
    ProjectCardButton.prototype.getElementTag = function () {
        return 'button';
    };
    ProjectCardButton.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = ProjectCardButton.BUTTON_TEXT;
        return element;
    };
    ProjectCardButton.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    ProjectCardButton.BUTTON_TEXT = "To project";
    return ProjectCardButton;
}(BaseComponent));
var ProjectCardText = (function (_super) {
    __extends(ProjectCardText, _super);
    function ProjectCardText(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = CLASSNAMES.PROJECT_DESCRIPTION;
        _this.content = content;
        return _this;
    }
    return ProjectCardText;
}(TextElement));
var ProjectTitle = (function (_super) {
    __extends(ProjectTitle, _super);
    function ProjectTitle(parent, id, project) {
        var _this = _super.call(this, parent, id, project.name) || this;
        _this.name = CLASSNAMES.TITLE;
        return _this;
    }
    return ProjectTitle;
}(TextElement));
var SectionCard = (function (_super) {
    __extends(SectionCard, _super);
    function SectionCard(parent, section) {
        var _this = _super.call(this, parent, section[0], section) || this;
        _this.id = section[0];
        _this.content = section[0];
        _this.name = "".concat(CLASSNAMES.CARD, " section");
        _this.parent = parent ? parent : CLASSNAMES.PROJECT_PANEL;
        _this.link = section[1];
        _this.elements = [ProjectCardText];
        return _this;
    }
    SectionCard.prototype._makeText = function (content) {
        return "".concat(content);
    };
    SectionCard.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.makeId(), this.id, this._makeText(this.content));
            element.initiate();
        }
    };
    return SectionCard;
}(Card));
