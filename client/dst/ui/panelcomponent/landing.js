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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralContent = exports.LandingIllustration = void 0;
var ClassNames_1 = require("../../constants/ClassNames");
var contentPanel_1 = require("../panel/contentPanel");
var BaseComponent_1 = require("../component/BaseComponent");
var logo_1 = require("../component/logo");
var illustration_1 = require("../../../../logic/illustration");
var imageElement_1 = require("../component/imageElement");
var textElement_1 = require("../component/textElement");
var ClassNames_2 = require("../../constants/ClassNames");
var LandingIllustration = (function (_super) {
    __extends(LandingIllustration, _super);
    function LandingIllustration(parent) {
        var _this = _super.call(this, parent, "id") || this;
        _this.name = ClassNames_2.CLASSNAMES.LANDING_ILLUSTRATION;
        _this.elements = [logo_1.ColorLogo, GradElement];
        _this.images = __spreadArray([], Array(15).keys(), true).filter(function (e) { return e > 1; }).map(function (e) { return "images/landing/v0.2.11/".concat(e, ".png"); });
        return _this;
    }
    LandingIllustration.prototype.load = function () {
        var _this = this;
        this.images.forEach(function (el) {
            var illustration = new illustration_1.Illustration(el, "", "");
            var element = new imageElement_1.ImageElement(_this.make_id(), "image", illustration);
            element.initiate();
            element.load();
        });
        this.elements.forEach(function (el) {
            var element = new el(_this.make_id(), _this.parent);
            element.initiate();
            element.load();
        });
    };
    return LandingIllustration;
}(contentPanel_1.ContentPanel));
exports.LandingIllustration = LandingIllustration;
var GeneralContent = (function (_super) {
    __extends(GeneralContent, _super);
    function GeneralContent(parent) {
        var _this = _super.call(this, parent, "id") || this;
        _this.name = ClassNames_2.CLASSNAMES.LANDING_GENERAL;
        _this.elements = [LandingSlogan, LandingBrief];
        return _this;
    }
    GeneralContent.prototype.load = function () {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.make_id(), _this.parent);
            element.initiate();
            element.load();
        });
    };
    return GeneralContent;
}(contentPanel_1.ContentPanel));
exports.GeneralContent = GeneralContent;
var LandingSlogan = (function (_super) {
    __extends(LandingSlogan, _super);
    function LandingSlogan(parent) {
        var content = "Collaborative mapping as a practice of resilient city-making";
        return _super.call(this, parent, "", content) || this;
    }
    return LandingSlogan;
}(textElement_1.TextElement));
var LandingBrief = (function (_super) {
    __extends(LandingBrief, _super);
    function LandingBrief(parent, id) {
        var content = "CITY LAYERS are a socially conscious framework that integrates \
                    subjective community knowledge with existing open datasets. Its \
                    purpose – to reveal, map and inform the key urban challenges, \
                    while simoultaneously offering a clear roadmap for overcoming \
                    them.\
                    Global challenges related to climate, mobility, and health are broken \
                    down into a series of micro-scale “layers” — easily understandable urban \
                    phenomena that citizens can identify, record, and reflect upon through \
                    collaborative city-mapping. This participatory \
                    methodology elevates individual observations into collective \
                    knowledge, providing both citizens and city planners with actionable \
                    insights to improve decision-making.";
        return _super.call(this, parent, id, content) || this;
    }
    return LandingBrief;
}(textElement_1.TextElement));
var GradElement = (function (_super) {
    __extends(GradElement, _super);
    function GradElement(parentId, id) {
        return _super.call(this, parentId, ClassNames_1.ClassName.GRAD, id) || this;
    }
    return GradElement;
}(BaseComponent_1.BaseComponent));
