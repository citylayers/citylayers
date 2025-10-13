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
exports.LegalPanel = void 0;
var celement_1 = require("../component/celement");
var contentPanel_1 = require("./contentPanel");
var ClassNames_1 = require("../../constants/ClassNames");
var logo_1 = require("../component/logo");
var closeButton_1 = require("../component/closeButton");
var textElement_1 = require("../component/textElement");
var LegalPanel = (function (_super) {
    __extends(LegalPanel, _super);
    function LegalPanel(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = ClassNames_1.LEGAL_CLASSNAMES.PANEL;
        _this.elements = [LegalHeader, LegalBody];
        _this.content = content;
        return _this;
    }
    LegalPanel.prototype.load = function (args) {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.make_id(), this.id, this.content);
            element.initiate();
            element.load();
        }
    };
    return LegalPanel;
}(contentPanel_1.ContentPanel));
exports.LegalPanel = LegalPanel;
var LegalHeader = (function (_super) {
    __extends(LegalHeader, _super);
    function LegalHeader(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = ClassNames_1.LEGAL_CLASSNAMES.HEADER;
        _this.content = content;
        _this.elements = [logo_1.Logo, closeButton_1.CloseButton];
        _this.args = [ClassNames_1.CLASSNAMES.LOGO, function () { location.href = "/"; }, content[0].name];
        return _this;
    }
    LegalHeader.prototype.initiate = function () {
        var element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
    };
    LegalHeader.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.make_id(), this.id, this.args[e]);
            element.initiate();
        }
    };
    return LegalHeader;
}(contentPanel_1.ContentPanel));
var LegalBody = (function (_super) {
    __extends(LegalBody, _super);
    function LegalBody(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = ClassNames_1.LEGAL_CLASSNAMES.BODY;
        _this.content = content;
        _this.elements = [textElement_1.TextElement, LegalBodyContent];
        _this.classes = [ClassNames_1.LEGAL_CLASSNAMES.TITLE, ClassNames_1.LEGAL_CLASSNAMES.LEGALBODYCONTENT];
        _this.args = [content[0].title, content];
        return _this;
    }
    LegalBody.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.make_id(), this.classes[e], e < this.args.length ? this.args[e] : undefined);
            element.initiate();
            element.load();
        }
    };
    return LegalBody;
}(contentPanel_1.ContentPanel));
var LegalBodyContent = (function (_super) {
    __extends(LegalBodyContent, _super);
    function LegalBodyContent(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = ClassNames_1.LEGAL_CLASSNAMES.BODY;
        _this.content = content;
        _this.elements = __spreadArray([], content.map(function (e) { return (e.link != undefined && e.link != null && e.link != "") ? LegalLinkText : textElement_1.TextElement; }), true);
        _this.classes = __spreadArray([], content.map(function (e) { return e.formatting == 1 ? ClassNames_1.LEGAL_CLASSNAMES.TEXT_F : ClassNames_1.LEGAL_CLASSNAMES.TEXT; }), true);
        _this.args = __spreadArray([], content.map(function (e) { return e.content; }), true);
        return _this;
    }
    LegalBodyContent.prototype.initiate = function () {
        var suffix = location.href.endsWith("dataprivacyandprotection") || location.href.endsWith("accessibility") ? " onecol" : "";
        var element = document.createElement("div");
        element.setAttribute('class', this.name + suffix);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
    };
    LegalBodyContent.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = undefined;
            if (this.elements[e] == textElement_1.TextElement) {
                element = new this.elements[e](this.make_id(), this.id, e < this.args.length ? this.args[e] : undefined);
            }
            else {
                element = new this.elements[e](this.make_id(), this.id, [e < this.args.length ? this.args[e] : undefined,
                    this.content[e] != undefined ? this.content[e].link : undefined]);
            }
            element.initiate();
        }
    };
    return LegalBodyContent;
}(contentPanel_1.ContentPanel));
var LegalLinkText = (function (_super) {
    __extends(LegalLinkText, _super);
    function LegalLinkText(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = ClassNames_1.LEGAL_CLASSNAMES.TEXT;
        _this.content = content ? content[0].replaceAll("\\n", "<br>") : "";
        _this.link = content ? content[1] : "/";
        return _this;
    }
    LegalLinkText.prototype.load = function () { };
    LegalLinkText.prototype.initiate = function () {
        var el = document.createElement("a");
        el.href = this.link;
        this.getParent().appendChild(el);
        var element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content;
        el.appendChild(element);
    };
    return LegalLinkText;
}(celement_1.CElement));
