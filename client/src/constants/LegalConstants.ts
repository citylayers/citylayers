/**
 * Legal page constants.
 * Refactored to use TypeScript enums.
 */

enum LegalClassName {
    PANEL = 'legalpanel',
    HEADER = 'legalheader',
    BODY = 'legalbody',
    BODY_CONTENT = 'legalbodycontent',
    CLOSE = 'closebutton',
    TITLE = 'legaltitle',
    TEXT = 'legaltext',
    TEXT_FRAMED = 'legaltextframed',
    FOOTER = 'legal_footer',
}

enum LegalPage {
    IMPRESSUM = 'impressum',
    PRIVACY = 'privacy policy',
    ACCESSIBILITY = 'accessibility',
}

enum LegalRoute {
    IMPRESSUM = '/impressum',
    PRIVACY = '/privacy',
    ACCESSIBILITY = '/accessibility',
}

/**
 * Utility class for legal page operations
 */
class LegalHelper {
    private static linkMap = new Map<LegalPage, LegalRoute>([
        [LegalPage.IMPRESSUM, LegalRoute.IMPRESSUM],
        [LegalPage.PRIVACY, LegalRoute.PRIVACY],
        [LegalPage.ACCESSIBILITY, LegalRoute.ACCESSIBILITY],
    ]);

    /**
     * Get route for legal page
     */
    public static getRoute(page: LegalPage): LegalRoute {
        return this.linkMap.get(page);
    }

    /**
     * Get all legal pages
     */
    public static getAllPages(): LegalPage[] {
        return Array.from(this.linkMap.keys());
    }
}

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
