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
var classnames_1 = require("../../../classnames");
var celement_1 = require("../component/celement");
var legal_1 = require("./legal");
var logo_1 = require("../component/logo");
var closeButton_1 = require("../component/closeButton");
var imageElement_1 = require("../component/imageElement");
var illustration_1 = require("../../../../logic/illustration");
var imageContainerElement_1 = require("../component/imageContainerElement");
var textElement_1 = require("../component/textElement");
var projectComponent_1 = require("../component/projectComponent");
var ProjectCardPanel = (function (_super) {
    __extends(ProjectCardPanel, _super);
    function ProjectCardPanel(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.content = content;
        _this.name = classnames_1.LEGAL_CLASSNAMES.PANEL;
        _this.elements = [ProjectCardHeader, ProjectCardBody];
        return _this;
    }
    return ProjectCardPanel;
}(legal_1.LegalPanel));
var ProjectCardHeader = (function (_super) {
    __extends(ProjectCardHeader, _super);
    function ProjectCardHeader(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = classnames_1.LEGAL_CLASSNAMES.HEADER;
        _this.content = content;
        _this.elements = [logo_1.Logo, closeButton_1.CloseButton];
        _this.args = [undefined, function () { location.href = "/"; }];
        return _this;
    }
    ProjectCardHeader.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.make_id(), this.args[e]);
            element.initiate();
        }
    };
    return ProjectCardHeader;
}(celement_1.CElement));
var ProjectCardBody = (function (_super) {
    __extends(ProjectCardBody, _super);
    function ProjectCardBody(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = classnames_1.LEGAL_CLASSNAMES.BODY;
        _this.content = content;
        _this.elements = [imageElement_1.ImageElement,
            textElement_1.TextElement,
            projectComponent_1.Recognition,
            projectComponent_1.ProjectPeriodInfo,
            projectComponent_1.ProjectTeam,
            ExploreButton,
            ProjectSlogan,
            textElement_1.TextElement,
            imageContainerElement_1.ImageContainerElement,
            imageContainerElement_1.ImageContainerElement
        ];
        _this.classes = [classnames_1.CLASSNAMES.COVER,
            classnames_1.LEGAL_CLASSNAMES.TITLE,
            classnames_1.CLASSNAMES.RECOGNITION,
            classnames_1.CLASSNAMES.PERIOD,
            classnames_1.CLASSNAMES.TEAM,
            ExploreButton.name,
            classnames_1.CLASSNAMES.PROJECT_DESCRIPTION,
            classnames_1.CLASSNAMES.PROJECT_DESCRIPTION,
            classnames_1.CLASSNAMES.PROJECT_IMAGE_CONTAINER,
            classnames_1.CLASSNAMES.PARTNER
        ];
        var cover = new illustration_1.Illustration("/images/projects/".concat(content.name, "/cover.svg"), '');
        _this.args = [cover,
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
    ProjectCardBody.prototype.initiate = function () {
        var element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
    };
    ProjectCardBody.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.make_id(), this.classes[e], e < this.args.length ? this.args[e] : undefined);
            element.initiate();
            element.load();
        }
    };
    return ProjectCardBody;
}(celement_1.CElement));
var ProjectSlogan = (function (_super) {
    __extends(ProjectSlogan, _super);
    function ProjectSlogan(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = classnames_1.CLASSNAMES.SLOGAN;
        return _this;
    }
    return ProjectSlogan;
}(textElement_1.TextElement));
var ExploreButton = (function (_super) {
    __extends(ExploreButton, _super);
    function ExploreButton(parent, id, project) {
        var _this = _super.call(this, parent, id, project) || this;
        _this.name = "projectButton";
        _this.content = project;
        return _this;
    }
    ExploreButton.prototype.initiate = function () {
        var _this = this;
        var element = document.createElement("button");
        element.innerHTML = ExploreButton._text;
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
        element.addEventListener("click", function () {
            window.location.href = "/explore/".concat(_this.content.name);
        });
    };
    ExploreButton._text = "Explore";
    return ExploreButton;
}(celement_1.CElement));
