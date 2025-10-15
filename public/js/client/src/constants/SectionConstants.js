"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECTIONMAP = exports.SectionHelper = exports.Section = void 0;
var Section;
(function (Section) {
    Section["EXPLORE"] = "explore";
    Section["TEAM"] = "team";
    Section["ABOUT"] = "about";
})(Section || (exports.Section = Section = {}));
var SectionHelper = (function () {
    function SectionHelper() {
    }
    SectionHelper.getConfig = function (section) {
        return this.sections.get(section);
    };
    SectionHelper.getAllSections = function () {
        return Array.from(this.sections.keys());
    };
    SectionHelper.sections = new Map([
        [Section.EXPLORE, { id: 'explore', label: 'explore' }],
        [Section.TEAM, { id: 'team', label: 'team' }],
        [Section.ABOUT, { id: 'about', label: 'about' }],
    ]);
    return SectionHelper;
}());
exports.SectionHelper = SectionHelper;
exports.SECTIONMAP = {
    EXPLORE: [Section.EXPLORE, Section.EXPLORE],
    TEAM: [Section.TEAM, Section.TEAM],
    ABOUT: [Section.ABOUT, Section.ABOUT],
};
