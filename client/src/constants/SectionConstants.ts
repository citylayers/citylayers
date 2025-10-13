/**
 * Section navigation constants.
 */

export enum Section {
    EXPLORE = 'explore',
    TEAM = 'team',
    ABOUT = 'about',
}

/**
 * Section configuration
 */
export interface SectionConfig {
    id: string;
    label: string;
}

export class SectionHelper {
    private static sections: Map<Section, SectionConfig> = new Map([
        [Section.EXPLORE, { id: 'explore', label: 'explore' }],
        [Section.TEAM, { id: 'team', label: 'team' }],
        [Section.ABOUT, { id: 'about', label: 'about' }],
    ]);

    public static getConfig(section: Section): SectionConfig {
        return this.sections.get(section);
    }

    public static getAllSections(): Section[] {
        return Array.from(this.sections.keys());
    }
}

// Legacy export
export const SECTIONMAP = {
    EXPLORE: [Section.EXPLORE, Section.EXPLORE],
    TEAM: [Section.TEAM, Section.TEAM],
    ABOUT: [Section.ABOUT, Section.ABOUT],
};
