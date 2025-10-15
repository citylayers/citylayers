/**
 * CSS class name constants for UI components.
 * Refactored from classnames.ts to use TypeScript enums.
 * Follows "no hardcoded strings" principle.
 */

export enum ClassName {
    // Logo and controls
    LOGO = 'logo',
    CLOSE = 'closebutton',
    SWITCH = 'switch',

    // Main panels
    MAIN_PANEL = 'panel citylayers',
    HOME_PANEL = 'home',
    LANDING_PANEL = 'landing',
    CATEGORY_PANEL = 'panel category',
    CATEGORY_CONTAINER = 'categorycontainer',

    // Headers and structure
    TITLE = 'title',
    HEADER = 'header',
    MAIN_CONTAINER = 'main',
    CONFIG = 'config',

    // Category components
    CATEGORY_SLIDER_CONTAINER = 'categoryslider',
    CATEGORY_HEADER = 'categoryheader',
    CATEGORY_HEADER_TITLE = 'categoryheadertitle',
    CATEGORY_SWITCH = 'categoryswitch',
    SLIDER = 'slider',
    SLIDER_LABEL_CONTAINER = 'sliderlabelcontainer',
    SLIDER_LABEL = 'sliderlabel',
    TAG_CONTAINER = 'tagcontainer',
    SUBCATEGORY_TAG = 'tag',
    TAG_LABEL = 'tag-element',

    // Category panel
    CATEGORYPANEL_HEADER = 'categorypanelheader',
    CATEGORYPANEL_LABEL = 'categorypanellabel',
    CATEGORYPANEL_DESCR = 'categorypaneldescr',
    CATEGORY_DESCRIPTION = 'categorydescription',
    CATEGORY_SIDE_PANEL = 'categorysidepanel',
    CATEGORY_SIDE_TAG_CONTAINER = 'categorysidetagcontainer',
    CATEGORY_SIDE_TAG_CONTAINER_TITLE = 'categorysidetagcontainertitle',
    CATEGORY_SIDE_TAG_CONTAINER_S = 'categorysidetagcontainersmall',
    CATEGORY_SIDE_TAG = 'categorysidetag',

    // Geo and about
    GEOCODING_PANEL = 'geopanel',
    ABOUT_LABEL = 'aboutlabel',
    ABOUT_PANEL = 'aboutpanel',
    ABOUT_DESCRIPTION = 'aboutdescription',
    ABOUT_TEXT = 'abouttext',

    // Comments
    COMMENTPANEL = 'commentpanel',
    COMMENTCONTAINER = 'commentcontainer',
    COMMENTPANE = 'commentpane',
    COMMENTSYMBOL = 'commentsymbol',
    COMMENTTEXT = 'commenttext',
    COMMENTPANEL_CLOSE = 'commentpanelclose',
    COMMENTSEARCH = 'commentsearch',
    SELECTCOMMENT = 'selected',

    // Special states
    CLICK = 'click',
    GRAD = 'grad',

    // Project panel
    PROJECT_PANEL = 'projectpanel',
    CARD = 'card',
    CARD_INFO = 'card_info',
    PROJECT_DESCRIPTION = 'projectdescription',
    COVER = 'cover',
    SLOGAN = 'slogan',
    PROJECT_IMAGE_CONTAINER = 'imagecontainer',

    // Landing page
    LANDING_ILLUSTRATION = 'landing_illustration',
    LANDING_GENERAL = 'landing_general',

    // Partners and team
    PARTNER = 'partner',
    TEAM = 'team',
    TEAM_MEMBER = 'teammember',
    RECOGNITION = 'recognition',
    PERIOD = 'period',
    TEAM_MEMBER_CONTAINER = 'teammembercontainer',
    TEAM_MEMBER_CARD = 'teammembercard',
    ROLE_CONTAINER = 'rolecontainer',
    ROLE_ELEMENT = 'roleelement',
    SOCIAL = 'social',

    // Question panel
    Q_PANEL = 'qpanel',
    Q_PAGE = 'question-page',
    RANGE_SLIDER = 'range-slider',
    RANGE_CONTAINER = 'ranges-container',
    IMGINPUT_CONTAINER = 'img-container',
    TEXTINPUT_CONTAINER = 'comment-container',
    Q_CONTAINER = 'question-container',
    QA_CONTAINER = 'qa-container',
    QUESTION_CONTAINER = 'question',
    Q_HEADER = 'qheader',
    Q_FOOTER = 'qfooter',

    // Navigation
    NAV = 'nav-buttons',
    BACK = 'back-button',
    NEXT = 'next-button',
    SUBMIT = 'submit-button',

    // Input elements
    TEXT = 'text',
    TEXT_INPUT = 'textinput',
    IMG_INPUT = 'imageinput',
}

export enum DisplayStyle {
    NONE = 'none',
    FLEX = 'flex',
    BLOCK = 'block',
    BLOCK_INLINE = 'block-inline',
}

export enum ElementId {
    TEXT_INPUT = 'comment-input',
    IMG_INPUT = 'img-uploader',
    RANGE_INPUT = 'slider',
    MULTICHOICE_INPUT = 'tag',
    IMG_PREVIEW = 'img-preview',
    LOW_SLIDER = 'startSlider',
    HIGH_SLIDER = 'endSlider',
}

export enum PanelId {
    PROJECT = 'project',
    CATEGORY = 'category',
}

export enum RangeLabel {
    MIN = 'min',
    MAX = 'max',
}

// Legacy export for backward compatibility
export const CLASSNAMES = {
    LOGO: ClassName.LOGO,
    CLOSE: ClassName.CLOSE,
    SWITCH: ClassName.SWITCH,
    MAIN_PANEL: ClassName.MAIN_PANEL,
    HOME_PANEL: ClassName.HOME_PANEL,
    LANDING_PANEL: ClassName.LANDING_PANEL,
    CATEGORY_PANEL: ClassName.CATEGORY_PANEL,
    CATEGORY_CONTAINER: ClassName.CATEGORY_CONTAINER,
    TITLE: ClassName.TITLE,
    HEADER: ClassName.HEADER,
    MAIN_CONTAINER: ClassName.MAIN_CONTAINER,
    CONFIG: ClassName.CONFIG,
    CATEGORY_SLIDER_CONTAINER: ClassName.CATEGORY_SLIDER_CONTAINER,
    CATEGORY_HEADER: ClassName.CATEGORY_HEADER,
    CATEGORY_HEADER_TITLE: ClassName.CATEGORY_HEADER_TITLE,
    CATEGORY_SWITCH: ClassName.CATEGORY_SWITCH,
    SLIDER: ClassName.SLIDER,
    SLIDER_LABEL_CONTAINER: ClassName.SLIDER_LABEL_CONTAINER,
    SLIDER_LABEL: ClassName.SLIDER_LABEL,
    TAG_CONTAINER: ClassName.TAG_CONTAINER,
    SUBCATEGORY_TAG: ClassName.SUBCATEGORY_TAG,
    TAG_LABEL: ClassName.TAG_LABEL,
    CATEGORYPANEL_HEADER: ClassName.CATEGORYPANEL_HEADER,
    CATEGORYPANEL_LABEL: ClassName.CATEGORYPANEL_LABEL,
    CATEGORYPANEL_DESCR: ClassName.CATEGORYPANEL_DESCR,
    CATEGORY_DESCRIPTION: ClassName.CATEGORY_DESCRIPTION,
    CATEGORY_SIDE_PANEL: ClassName.CATEGORY_SIDE_PANEL,
    CATEGORY_SIDE_TAG_CONTAINER: ClassName.CATEGORY_SIDE_TAG_CONTAINER,
    CATEGORY_SIDE_TAG_CONTAINER_TITLE: ClassName.CATEGORY_SIDE_TAG_CONTAINER_TITLE,
    CATEGORY_SIDE_TAG_CONTAINER_S: ClassName.CATEGORY_SIDE_TAG_CONTAINER_S,
    CATEGORY_SIDE_TAG: ClassName.CATEGORY_SIDE_TAG,
    GEOCODONG_PANEL: ClassName.GEOCODING_PANEL,
    ABOUT_LABEL: ClassName.ABOUT_LABEL,
    ABOUT_PANEL: ClassName.ABOUT_PANEL,
    ABOUT_DESCRIPTION: ClassName.ABOUT_DESCRIPTION,
    ABOUT_TEXT: ClassName.ABOUT_TEXT,
    COMMENTPANEL: ClassName.COMMENTPANEL,
    COMMENTCONTAINER: ClassName.COMMENTCONTAINER,
    COMMENTPANE: ClassName.COMMENTPANE,
    COMMENTSYMBOL: ClassName.COMMENTSYMBOL,
    COMMENTTEXT: ClassName.COMMENTTEXT,
    COMMENTPANEL_CLOSE: ClassName.COMMENTPANEL_CLOSE,
    COMMENTSEARCH: ClassName.COMMENTSEARCH,
    SELECTCOMMENT: ClassName.SELECTCOMMENT,
    CLICK: ClassName.CLICK,
    GRAD: ClassName.GRAD,
    PROJECT_PANEL: ClassName.PROJECT_PANEL,
    CARD: ClassName.CARD,
    CARD_INFO: ClassName.CARD_INFO,
    PROJECT_DESCRIPTION: ClassName.PROJECT_DESCRIPTION,
    COVER: ClassName.COVER,
    SLOGAN: ClassName.SLOGAN,
    PROJECT_IMAGE_CONTAINER: ClassName.PROJECT_IMAGE_CONTAINER,
    LANDING_ILLUSTRATION: ClassName.LANDING_ILLUSTRATION,
    LANDING_GENERAL: ClassName.LANDING_GENERAL,
    PARTNER: ClassName.PARTNER,
    TEAM: ClassName.TEAM,
    TEAM_MEMBER: ClassName.TEAM_MEMBER,
    RECOGNITION: ClassName.RECOGNITION,
    PERIOD: ClassName.PERIOD,
    TEAM_MEMBER_CONTAINER: ClassName.TEAM_MEMBER_CONTAINER,
    TEAM_MEMBER_CARD: ClassName.TEAM_MEMBER_CARD,
    ROLE_CONTAINER: ClassName.ROLE_CONTAINER,
    ROLE_ELEMENT: ClassName.ROLE_ELEMENT,
    SOCIAL: ClassName.SOCIAL,
    Q_PANEL: ClassName.Q_PANEL,
    Q_PAGE: ClassName.Q_PAGE,
    RANGE_SLIDER: ClassName.RANGE_SLIDER,
    RANGE_CONTAINER: ClassName.RANGE_CONTAINER,
    IMGINPUT_CONTAINER: ClassName.IMGINPUT_CONTAINER,
    TEXTINPUT_CONTAINER: ClassName.TEXTINPUT_CONTAINER,
    Q_CONTAINER: ClassName.Q_CONTAINER,
    QA_CONTAINER: ClassName.QA_CONTAINER,
    QUESTION_CONTAINER: ClassName.QUESTION_CONTAINER,
    Q_HEADER: ClassName.Q_HEADER,
    Q_FOOTER: ClassName.Q_FOOTER,
    NAV: ClassName.NAV,
    BACK: ClassName.BACK,
    NEXT: ClassName.NEXT,
    SUBMIT: ClassName.SUBMIT,
    TEXT: ClassName.TEXT,
    TEXT_INPUT: ClassName.TEXT_INPUT,
    IMG_INPUT: ClassName.IMG_INPUT,
};

export const DISPLAY = {
    NONE: DisplayStyle.NONE,
    FLEX: DisplayStyle.FLEX,
    BLOCK: DisplayStyle.BLOCK,
    BLOCKINLINE: DisplayStyle.BLOCK_INLINE,
};

export const IDS = {
    TEXT_INPUT: ElementId.TEXT_INPUT,
    IMG_INPUT: ElementId.IMG_INPUT,
    RANGE_INPUT: ElementId.RANGE_INPUT,
    MULTICHOICE_INPUT: ElementId.MULTICHOICE_INPUT,
    IMG_PREVIEW: ElementId.IMG_PREVIEW,
};

export const SLIDER_IDS = {
    LOW: ElementId.LOW_SLIDER,
    HIGH: ElementId.HIGH_SLIDER,
};

export const PANEL_IDS = {
    PROJECT: PanelId.PROJECT,
    CATEGORY: PanelId.CATEGORY,
};

export const RANGE_LABELS = {
    MIN: RangeLabel.MIN,
    MAX: RangeLabel.MAX,
};

export const SECTIONMAP = {
    TEAM: ["Team", "/team"],
    ABOUT: ["About", "/about"]
};

export const LEGAL_CLASSNAMES = {
    PANEL: "legalpanel",
    HEADER: "legalheader",
    BODY: "legalbody",
    TITLE: "legaltitle",
    TEXT: "legaltext",
    TEXT_F: "legaltextfull",
    LEGALBODYCONTENT: "legalbodycontent",
    LEGAL_PANEL: "legalpanel",
    LEGAL_HEADER: "legalheader",
    LEGAL_BODY: "legalbody",
    LEGAL_BODY_CONTENT: "legalbodycontent"
};
