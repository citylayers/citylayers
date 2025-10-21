/**
 * Section navigation constants.
 */
var Section;
(function (Section) {
    Section["EXPLORE"] = "explore";
    Section["TEAM"] = "team";
    Section["ABOUT"] = "about";
})(Section || (Section = {}));
class SectionHelper {
    static getConfig(section) {
        return this.sections.get(section);
    }
    static getAllSections() {
        return Array.from(this.sections.keys());
    }
}
SectionHelper.sections = new Map([
    [Section.EXPLORE, { id: 'explore', label: 'explore' }],
    [Section.TEAM, { id: 'team', label: 'team' }],
    [Section.ABOUT, { id: 'about', label: 'about' }],
]);
// Legacy export
const SECTIONMAP = {
    EXPLORE: [Section.EXPLORE, Section.EXPLORE],
    TEAM: [Section.TEAM, Section.TEAM],
    ABOUT: [Section.ABOUT, Section.ABOUT],
};
