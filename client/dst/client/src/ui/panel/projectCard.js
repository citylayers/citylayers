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
var ProjectCardPanel = (function (_super) {
    __extends(ProjectCardPanel, _super);
    function ProjectCardPanel(parent, content) {
        var _this = _super.call(this, parent, "project", content) || this;
        _this.content = content;
        _this.name = LEGAL_CLASSNAMES.PANEL;
        _this.elements = [ProjectCardHeader, ProjectCardBody];
        return _this;
    }
    return ProjectCardPanel;
}(LegalPanel));
var ProjectCardHeader = (function (_super) {
    __extends(ProjectCardHeader, _super);
    function ProjectCardHeader(parentId, id, content) {
        var _this = _super.call(this, parentId, LEGAL_CLASSNAMES.HEADER, id, content) || this;
        _this.elements = [Logo, CloseButton];
        _this.args = [undefined, function () { location.href = "/"; }];
        return _this;
    }
    ProjectCardHeader.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.makeId(), this.args[e]);
            element.initiate();
        }
    };
    return ProjectCardHeader;
}(BaseComponent));
var ProjectCardBody = (function (_super) {
    __extends(ProjectCardBody, _super);
    function ProjectCardBody(parentId, id, content) {
        var _this = _super.call(this, parentId, LEGAL_CLASSNAMES.BODY, id, content) || this;
        _this.elements = [
            ImageElement,
            TextElement,
            Recognition,
            ProjectPeriodInfo,
            ProjectTeam,
            ExploreButton,
            ProjectSlogan,
            TextElement,
            ImageContainerElement,
            ImageContainerElement
        ];
        _this.classes = [
            CLASSNAMES.COVER,
            LEGAL_CLASSNAMES.TITLE,
            CLASSNAMES.RECOGNITION,
            CLASSNAMES.PERIOD,
            CLASSNAMES.TEAM,
            "projectButton",
            CLASSNAMES.PROJECT_DESCRIPTION,
            CLASSNAMES.PROJECT_DESCRIPTION,
            CLASSNAMES.PROJECT_IMAGE_CONTAINER,
            CLASSNAMES.PARTNER
        ];
        var cover = new Illustration("/images/projects/".concat(content.name, "/cover.svg"), '');
        _this.args = [
            cover,
            content.name,
            content.info.recognition,
            content.info,
            content.info.team,
            content,
            content.info.subtitle,
            content.info.description,
            content.info.images,
            content.info.partners.map(function (e) { return e.image; })
        ];
        return _this;
    }
    ProjectCardBody.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.makeId(), this.classes[e], e < this.args.length ? this.args[e] : undefined);
            element.initiate();
            element.load();
        }
    };
    return ProjectCardBody;
}(BaseComponent));
var ProjectSlogan = (function (_super) {
    __extends(ProjectSlogan, _super);
    function ProjectSlogan(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = CLASSNAMES.SLOGAN;
        return _this;
    }
    return ProjectSlogan;
}(TextElement));
var ExploreButton = (function (_super) {
    __extends(ExploreButton, _super);
    function ExploreButton(parentId, id, project) {
        var _this = _super.call(this, parentId, "projectButton", id, project) || this;
        _this.project = project;
        _this.clickHandler = function () {
            window.location.href = "/explore/".concat(_this.project.name);
        };
        return _this;
    }
    ExploreButton.prototype.getElementTag = function () {
        return 'button';
    };
    ExploreButton.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = ExploreButton.BUTTON_TEXT;
        return element;
    };
    ExploreButton.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    ExploreButton.BUTTON_TEXT = "Explore";
    ExploreButton.componentName = "projectButton";
    return ExploreButton;
}(BaseComponent));
