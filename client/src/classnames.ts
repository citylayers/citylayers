const CLASSNAMES = {
    LOGO : "logo",
    CLOSE: "closebutton",
    SWITCH: "switch",

    MAIN_PANEL: "panel citylayers",
    HOME_PANEL: "home",
    LANDING_PANEL : "landing",
    CATEGORY_PANEL: "panel category",
    // PROJECT_PANEL: "panel project",
    CATEGORY_CONTAINER: "categorycontainer",
    TITLE: "title",
    HEADER: "header",
    MAIN_CONTAINER: "main",

    CONFIG: "config",
    
    CATEGORY_SLIDER_CONTAINER: "categoryslider",
    CATEGORY_HEADER: "categoryheader",
    CATEGORY_HEADER_TITLE: "categoryheadertitle",
    CATEGORY_SWITCH: "categoryswitch",
    SLIDER: "slider",
    SLIDER_LABEL_CONTAINER: "sliderlabelcontainer",
    SLIDER_LABEL: "sliderlabel",
    TAG_CONTAINER: "tagcontainer",
    SUBCATEGORY_TAG: "tag",
    TAG_LABEL: "tag-element",

    CATEGORYPANEL_HEADER: "categorypanelheader",
    CATEGORYPANEL_LABEL: "categorypanellabel",
    CATEGORYPANEL_DESCR: "categorypaneldescr",

    CATEGORY_DESCRIPTION: "categorydescription",
    CATEGORY_SIDE_PANEL: "categorysidepanel",
    CATEGORY_SIDE_TAG_CONTAINER: "categorysidetagcontainer",
    CATEGORY_SIDE_TAG_CONTAINER_TITLE: "categorysidetagcontainertitle",
    CATEGORY_SIDE_TAG_CONTAINER_S: "categorysidetagcontainersmall",
    CATEGORY_SIDE_TAG: "categorysidetag",
    GEOCODONG_PANEL: "geopanel",
    ABOUT_LABEL: "aboutlabel",
    ABOUT_PANEL: "aboutpanel",
    
    ABOUT_DESCRIPTION: "aboutdescription",
    ABOUT_TEXT: "abouttext",

    COMMENTPANEL: "commentpanel",
    COMMENTCONTAINER: "commentcontainer",
    COMMENTPANE: "commentpane",
    COMMENTSYMBOL: "commentsymbol",
    COMMENTTEXT: "commenttext",
    COMMENTPANEL_CLOSE: "commentpanelclose",
    COMMENTSEARCH: "commentsearch",
    SELECTCOMMENT: "selected",

    CLICK: "click",
    GRAD: "grad",

    PROJECT_PANEL: "projectpanel",
    CARD : "card",
    CARD_INFO : "card_info",
    PROJECT_DESCRIPTION: "projectdescription",
    COVER: "cover",
    SLOGAN: "slogan",
    PROJECT_IMAGE_CONTAINER: "imagecontainer",

    LANDING_ILLUSTRATION: "landing_illustration",
    LANDING_GENERAL: "landing_general",
    PARTNER: "partner", 
    TEAM: "team",
    TEAM_MEMBER: "teammember",
    RECOGNITION: "recognition",
    PERIOD: "period",
    
    TEAM_MEMBER_CONTAINER : "teammembercontainer",
    TEAM_MEMBER_CARD : "teammembercard",
    ROLE_CONTAINER: "rolecontainer",
    ROLE_ELEMENT: "roleelement",

    SOCIAL: "social",

    Q_PANEL: "qpanel",
    Q_PAGE: "question-page",

    RANGE_SLIDER: "range-slider",
    RANGE_CONTAINER: "ranges-container",
    IMGINPUT_CONTAINER: "img-container",
    TEXTINPUT_CONTAINER: "comment-container",
    Q_CONTAINER: "question-container",
    QA_CONTAINER: "qa-container",
    QUESTION_CONTAINER: "question",

    Q_HEADER: "qheader",
    Q_FOOTER: "qfooter",

    NAV: "nav-buttons",
    BACK: "back-button",
    NEXT: "next-button",
    SUBMIT: "submit-button",
    TEXT: "text",
    TEXT_INPUT: "textinput",
    IMG_INPUT: "imageinput",
}
const DISPLAY= {
    NONE: "none",
    FLEX: "flex",
    BLOCK: "block",
    BLOCKINLINE: "block-inline",
}
const SLIDER_IDS = {
    LOW: "startSlider",
    HIGH: "endSlider"

};

const RANGE_LABELS = {
    MIN: "min",
    MAX: "max"
};

const PANEL_IDS = {
    PROJECT: "project",
    CATEGORY: "category"

}

const IDS = {
    TEXT_INPUT: "comment-input",
    IMG_INPUT : "img-uploader",
    RANGE_INPUT: "slider",
    MULTICHOICE_INPUT: "tag",
    IMG_PREVIEW: "img-preview",
}

const LEGAL_CLASSNAMES = {
    PANEL : "legalpanel",
    HEADER : "legalheader",
    BODY : "legalbody",
    LEGALBODYCONTENT: "legalbodycontent",
    CLOSE : "closebutton",
    TITLE : "legaltitle",
    TEXT : "legaltext",
    TEXT_F : "legaltextframed",
    FOOTER: "legal_footer"
}

const LEGAL = {
    IMPRESSUM: "impressum",
    PRIVACY: "privacy policy",
    ACCESSIBILITY: "accessibility"
}

const LEGAL_LINKS = new Map([
    [LEGAL.IMPRESSUM, "/impressum"],
   [LEGAL.PRIVACY, "/privacy"],
   [LEGAL.ACCESSIBILITY, "/accessibility"],
]);
const SECTIONMAP = {
    EXPLORE: ["explore", "explore"],
    TEAM: ["team", "team"],
    ABOUT: ["about", "about"],
}

export {CLASSNAMES, LEGAL_CLASSNAMES, 
    LEGAL, LEGAL_LINKS, SECTIONMAP,
    IDS, PANEL_IDS, SLIDER_IDS, 
    DISPLAY, RANGE_LABELS};