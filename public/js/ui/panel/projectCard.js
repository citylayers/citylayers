// Legacy imports
class ProjectCardPanel extends LegalPanel {
    constructor(parent, content) {
        super(parent, "project", content);
        this.content = content;
        this.name = LEGAL_CLASSNAMES.PANEL;
        this.elements = [ProjectCardHeader, ProjectCardBody];
    }
}
/**
 * Project card header component.
 * Extends BaseComponent with proper OOP principles.
 */
class ProjectCardHeader extends BaseComponent {
    constructor(parentId, id, content) {
        super(parentId, LEGAL_CLASSNAMES.HEADER, id, content);
        this.elements = [Logo, CloseButton];
        this.args = [undefined, () => { location.href = "/"; }];
    }
    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.makeId(), this.args[e]);
            element.initiate();
        }
    }
}
/**
 * Project card body component.
 * Extends BaseComponent with proper OOP principles.
 */
class ProjectCardBody extends BaseComponent {
    constructor(parentId, id, content) {
        super(parentId, LEGAL_CLASSNAMES.BODY, id, content);
        this.elements = [
            ImageElement,
            TextElement,
            Recognition,
            ProjectPeriodInfo,
            ProjectTeam,
            ExploreButton,
            ProjectSlogan,
            TextElement,
            ImageContainerElement,
            ImageContainerElement
        ];
        this.classes = [
            CLASSNAMES.COVER,
            LEGAL_CLASSNAMES.TITLE,
            CLASSNAMES.RECOGNITION,
            CLASSNAMES.PERIOD,
            CLASSNAMES.TEAM,
            "projectButton",
            CLASSNAMES.PROJECT_DESCRIPTION,
            CLASSNAMES.PROJECT_DESCRIPTION,
            CLASSNAMES.PROJECT_IMAGE_CONTAINER,
            CLASSNAMES.PARTNER
        ];
        let cover = new Illustration(`/images/projects/${content.name}/cover.svg`, '');
        this.args = [
            cover,
            content.name,
            content.info.recognition,
            content.info,
            content.info.team,
            content,
            content.info.subtitle,
            content.info.description,
            content.info.images,
            content.info.partners.map((e) => e.image)
        ];
    }
    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.makeId(), this.classes[e], e < this.args.length ? this.args[e] : undefined);
            element.initiate();
            element.load();
        }
    }
}
class ProjectSlogan extends TextElement {
    constructor(parent, id, content) {
        super(parent, id, content);
        this.name = CLASSNAMES.SLOGAN;
    }
}
// class ProjectCardBodyContent extends ContentElement{
//     constructor(parent, name, content){
//         parent = parent ? parent : LEGAL_CLASSNAMES.PANEL;
//         super(parent, undefined);
//         this.name = name;
//         this.content = content;
//         this.elements = [
//             // ProjectTitle,
//             ProjectCardInfo,
//             ExploreButton,
//             ProjectSlogan,
//             ProjectCardText,
//             ImageContainerElement,
//             PartnerElement
//         ];
//     }
//     load() {
//         for (let e = 0; e < this.elements.length; e++) {
//             let args = this.content;
//             if (this.elements[e]==ProjectCardText){
//                 args = this.content.info.description;
//             }
//             else if (this.elements[e]==ProjectSlogan){
//                 args = this.content.info.subtitle;
//             }
//             else if (this.elements[e]==ImageContainerElement){
//                 args = this.content.info.images;
//             }
//             let element = new this.elements[e](this.makeId(), 
//             CLASSNAMES.PROJECT_DESCRIPTION,  args);
//             element.initiate();
//             element.load();
//         }
//     }
// }
/**
 * Explore button for project card.
 * Extends BaseComponent with proper OOP principles.
 */
class ExploreButton extends BaseComponent {
    constructor(parentId, id, project) {
        super(parentId, "projectButton", id, project);
        this.project = project;
        this.clickHandler = () => {
            window.location.href = `/map/${this.project.name}`;
        };
    }
    getElementTag() {
        return 'button';
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = ExploreButton.BUTTON_TEXT;
        return element;
    }
    afterInit() {
        this.addEventListener('click', this.clickHandler);
    }
}
ExploreButton.BUTTON_TEXT = "Explore";
ExploreButton.componentName = "projectButton";
