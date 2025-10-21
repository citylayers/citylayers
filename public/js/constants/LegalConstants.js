/**
 * Legal page constants.
 * Refactored to use TypeScript enums.
 */
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
})(LegalClassName || (LegalClassName = {}));
var LegalPage;
(function (LegalPage) {
    LegalPage["IMPRESSUM"] = "impressum";
    LegalPage["PRIVACY"] = "privacy policy";
    LegalPage["ACCESSIBILITY"] = "accessibility";
})(LegalPage || (LegalPage = {}));
var LegalRoute;
(function (LegalRoute) {
    LegalRoute["IMPRESSUM"] = "/impressum";
    LegalRoute["PRIVACY"] = "/privacy";
    LegalRoute["ACCESSIBILITY"] = "/accessibility";
})(LegalRoute || (LegalRoute = {}));
/**
 * Utility class for legal page operations
 */
class LegalHelper {
    /**
     * Get route for legal page
     */
    static getRoute(page) {
        return this.linkMap.get(page);
    }
    /**
     * Get all legal pages
     */
    static getAllPages() {
        return Array.from(this.linkMap.keys());
    }
}
LegalHelper.linkMap = new Map([
    [LegalPage.IMPRESSUM, LegalRoute.IMPRESSUM],
    [LegalPage.PRIVACY, LegalRoute.PRIVACY],
    [LegalPage.ACCESSIBILITY, LegalRoute.ACCESSIBILITY],
]);
// Legacy exports for backward compatibility
const LEGAL_CLASSNAMES = {
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
const LEGAL = {
    IMPRESSUM: LegalPage.IMPRESSUM,
    PRIVACY: LegalPage.PRIVACY,
    ACCESSIBILITY: LegalPage.ACCESSIBILITY,
};
const LEGAL_LINKS = new Map([
    [LEGAL.IMPRESSUM, LegalRoute.IMPRESSUM],
    [LEGAL.PRIVACY, LegalRoute.PRIVACY],
    [LEGAL.ACCESSIBILITY, LegalRoute.ACCESSIBILITY],
]);
