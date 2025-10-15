"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RANGE_LABELS = exports.PANEL_IDS = exports.SLIDER_IDS = exports.IDS = exports.DISPLAY = exports.CLASSNAMES = exports.RangeLabel = exports.PanelId = exports.ElementId = exports.DisplayStyle = exports.ClassName = void 0;
var ClassName;
(function (ClassName) {
    ClassName["LOGO"] = "logo";
    ClassName["CLOSE"] = "closebutton";
    ClassName["SWITCH"] = "switch";
    ClassName["MAIN_PANEL"] = "panel citylayers";
    ClassName["HOME_PANEL"] = "home";
    ClassName["LANDING_PANEL"] = "landing";
    ClassName["CATEGORY_PANEL"] = "panel category";
    ClassName["CATEGORY_CONTAINER"] = "categorycontainer";
    ClassName["TITLE"] = "title";
    ClassName["HEADER"] = "header";
    ClassName["MAIN_CONTAINER"] = "main";
    ClassName["CONFIG"] = "config";
    ClassName["CATEGORY_SLIDER_CONTAINER"] = "categoryslider";
    ClassName["CATEGORY_HEADER"] = "categoryheader";
    ClassName["CATEGORY_HEADER_TITLE"] = "categoryheadertitle";
    ClassName["CATEGORY_SWITCH"] = "categoryswitch";
    ClassName["SLIDER"] = "slider";
    ClassName["SLIDER_LABEL_CONTAINER"] = "sliderlabelcontainer";
    ClassName["SLIDER_LABEL"] = "sliderlabel";
    ClassName["TAG_CONTAINER"] = "tagcontainer";
    ClassName["SUBCATEGORY_TAG"] = "tag";
    ClassName["TAG_LABEL"] = "tag-element";
    ClassName["CATEGORYPANEL_HEADER"] = "categorypanelheader";
    ClassName["CATEGORYPANEL_LABEL"] = "categorypanellabel";
    ClassName["CATEGORYPANEL_DESCR"] = "categorypaneldescr";
    ClassName["CATEGORY_DESCRIPTION"] = "categorydescription";
    ClassName["CATEGORY_SIDE_PANEL"] = "categorysidepanel";
    ClassName["CATEGORY_SIDE_TAG_CONTAINER"] = "categorysidetagcontainer";
    ClassName["CATEGORY_SIDE_TAG_CONTAINER_TITLE"] = "categorysidetagcontainertitle";
    ClassName["CATEGORY_SIDE_TAG_CONTAINER_S"] = "categorysidetagcontainersmall";
    ClassName["CATEGORY_SIDE_TAG"] = "categorysidetag";
    ClassName["GEOCODING_PANEL"] = "geopanel";
    ClassName["ABOUT_LABEL"] = "aboutlabel";
    ClassName["ABOUT_PANEL"] = "aboutpanel";
    ClassName["ABOUT_DESCRIPTION"] = "aboutdescription";
    ClassName["ABOUT_TEXT"] = "abouttext";
    ClassName["COMMENTPANEL"] = "commentpanel";
    ClassName["COMMENTCONTAINER"] = "commentcontainer";
    ClassName["COMMENTPANE"] = "commentpane";
    ClassName["COMMENTSYMBOL"] = "commentsymbol";
    ClassName["COMMENTTEXT"] = "commenttext";
    ClassName["COMMENTPANEL_CLOSE"] = "commentpanelclose";
    ClassName["COMMENTSEARCH"] = "commentsearch";
    ClassName["SELECTCOMMENT"] = "selected";
    ClassName["CLICK"] = "click";
    ClassName["GRAD"] = "grad";
    ClassName["PROJECT_PANEL"] = "projectpanel";
    ClassName["CARD"] = "card";
    ClassName["CARD_INFO"] = "card_info";
    ClassName["PROJECT_DESCRIPTION"] = "projectdescription";
    ClassName["COVER"] = "cover";
    ClassName["SLOGAN"] = "slogan";
    ClassName["PROJECT_IMAGE_CONTAINER"] = "imagecontainer";
    ClassName["LANDING_ILLUSTRATION"] = "landing_illustration";
    ClassName["LANDING_GENERAL"] = "landing_general";
    ClassName["PARTNER"] = "partner";
    ClassName["TEAM"] = "team";
    ClassName["TEAM_MEMBER"] = "teammember";
    ClassName["RECOGNITION"] = "recognition";
    ClassName["PERIOD"] = "period";
    ClassName["TEAM_MEMBER_CONTAINER"] = "teammembercontainer";
    ClassName["TEAM_MEMBER_CARD"] = "teammembercard";
    ClassName["ROLE_CONTAINER"] = "rolecontainer";
    ClassName["ROLE_ELEMENT"] = "roleelement";
    ClassName["SOCIAL"] = "social";
    ClassName["Q_PANEL"] = "qpanel";
    ClassName["Q_PAGE"] = "question-page";
    ClassName["RANGE_SLIDER"] = "range-slider";
    ClassName["RANGE_CONTAINER"] = "ranges-container";
    ClassName["IMGINPUT_CONTAINER"] = "img-container";
    ClassName["TEXTINPUT_CONTAINER"] = "comment-container";
    ClassName["Q_CONTAINER"] = "question-container";
    ClassName["QA_CONTAINER"] = "qa-container";
    ClassName["QUESTION_CONTAINER"] = "question";
    ClassName["Q_HEADER"] = "qheader";
    ClassName["Q_FOOTER"] = "qfooter";
    ClassName["NAV"] = "nav-buttons";
    ClassName["BACK"] = "back-button";
    ClassName["NEXT"] = "next-button";
    ClassName["SUBMIT"] = "submit-button";
    ClassName["TEXT"] = "text";
    ClassName["TEXT_INPUT"] = "textinput";
    ClassName["IMG_INPUT"] = "imageinput";
})(ClassName || (exports.ClassName = ClassName = {}));
var DisplayStyle;
(function (DisplayStyle) {
    DisplayStyle["NONE"] = "none";
    DisplayStyle["FLEX"] = "flex";
    DisplayStyle["BLOCK"] = "block";
    DisplayStyle["BLOCK_INLINE"] = "block-inline";
})(DisplayStyle || (exports.DisplayStyle = DisplayStyle = {}));
var ElementId;
(function (ElementId) {
    ElementId["TEXT_INPUT"] = "comment-input";
    ElementId["IMG_INPUT"] = "img-uploader";
    ElementId["RANGE_INPUT"] = "slider";
    ElementId["MULTICHOICE_INPUT"] = "tag";
    ElementId["IMG_PREVIEW"] = "img-preview";
    ElementId["LOW_SLIDER"] = "startSlider";
    ElementId["HIGH_SLIDER"] = "endSlider";
})(ElementId || (exports.ElementId = ElementId = {}));
var PanelId;
(function (PanelId) {
    PanelId["PROJECT"] = "project";
    PanelId["CATEGORY"] = "category";
})(PanelId || (exports.PanelId = PanelId = {}));
var RangeLabel;
(function (RangeLabel) {
    RangeLabel["MIN"] = "min";
    RangeLabel["MAX"] = "max";
})(RangeLabel || (exports.RangeLabel = RangeLabel = {}));
exports.CLASSNAMES = {
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
exports.DISPLAY = {
    NONE: DisplayStyle.NONE,
    FLEX: DisplayStyle.FLEX,
    BLOCK: DisplayStyle.BLOCK,
    BLOCKINLINE: DisplayStyle.BLOCK_INLINE,
};
exports.IDS = {
    TEXT_INPUT: ElementId.TEXT_INPUT,
    IMG_INPUT: ElementId.IMG_INPUT,
    RANGE_INPUT: ElementId.RANGE_INPUT,
    MULTICHOICE_INPUT: ElementId.MULTICHOICE_INPUT,
    IMG_PREVIEW: ElementId.IMG_PREVIEW,
};
exports.SLIDER_IDS = {
    LOW: ElementId.LOW_SLIDER,
    HIGH: ElementId.HIGH_SLIDER,
};
exports.PANEL_IDS = {
    PROJECT: PanelId.PROJECT,
    CATEGORY: PanelId.CATEGORY,
};
exports.RANGE_LABELS = {
    MIN: RangeLabel.MIN,
    MAX: RangeLabel.MAX,
};
