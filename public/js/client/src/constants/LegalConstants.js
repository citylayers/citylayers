"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEGAL_LINKS = exports.LEGAL = exports.LEGAL_CLASSNAMES = exports.LegalHelper = exports.LegalRoute = exports.LegalPage = exports.LegalClassName = void 0;
var LegalClassName;
(function (LegalClassName) {
    LegalClassName["PANEL"] = "legalpanel";
    LegalClassName["HEADER"] = "legalheader";
    LegalClassName["BODY"] = "legalbody";
    LegalClassName["BODY_CONTENT"] = "legalbodycontent";
    LegalClassName["CLOSE"] = "closebutton";
    LegalClassName["TITLE"] = "legaltitle";
    LegalClassName["TEXT"] = "legaltext";
    LegalClassName["TEXT_FRAMED"] = "legaltextframed";
    LegalClassName["FOOTER"] = "legal_footer";
})(LegalClassName || (exports.LegalClassName = LegalClassName = {}));
var LegalPage;
(function (LegalPage) {
    LegalPage["IMPRESSUM"] = "impressum";
    LegalPage["PRIVACY"] = "privacy policy";
    LegalPage["ACCESSIBILITY"] = "accessibility";
})(LegalPage || (exports.LegalPage = LegalPage = {}));
var LegalRoute;
(function (LegalRoute) {
    LegalRoute["IMPRESSUM"] = "/impressum";
    LegalRoute["PRIVACY"] = "/privacy";
    LegalRoute["ACCESSIBILITY"] = "/accessibility";
})(LegalRoute || (exports.LegalRoute = LegalRoute = {}));
var LegalHelper = (function () {
    function LegalHelper() {
    }
    LegalHelper.getRoute = function (page) {
        return this.linkMap.get(page);
    };
    LegalHelper.getAllPages = function () {
        return Array.from(this.linkMap.keys());
    };
    LegalHelper.linkMap = new Map([
        [LegalPage.IMPRESSUM, LegalRoute.IMPRESSUM],
        [LegalPage.PRIVACY, LegalRoute.PRIVACY],
        [LegalPage.ACCESSIBILITY, LegalRoute.ACCESSIBILITY],
    ]);
    return LegalHelper;
}());
exports.LegalHelper = LegalHelper;
exports.LEGAL_CLASSNAMES = {
    PANEL: LegalClassName.PANEL,
    HEADER: LegalClassName.HEADER,
    BODY: LegalClassName.BODY,
    LEGALBODYCONTENT: LegalClassName.BODY_CONTENT,
    CLOSE: LegalClassName.CLOSE,
    TITLE: LegalClassName.TITLE,
    TEXT: LegalClassName.TEXT,
    TEXT_F: LegalClassName.TEXT_FRAMED,
    FOOTER: LegalClassName.FOOTER,
};
exports.LEGAL = {
    IMPRESSUM: LegalPage.IMPRESSUM,
    PRIVACY: LegalPage.PRIVACY,
    ACCESSIBILITY: LegalPage.ACCESSIBILITY,
};
exports.LEGAL_LINKS = new Map([
    [exports.LEGAL.IMPRESSUM, LegalRoute.IMPRESSUM],
    [exports.LEGAL.PRIVACY, LegalRoute.PRIVACY],
    [exports.LEGAL.ACCESSIBILITY, LegalRoute.ACCESSIBILITY],
]);
