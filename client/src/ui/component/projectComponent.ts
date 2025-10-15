import { ClassName, SECTIONMAP } from "../../constants/ClassNames";
import { BaseComponent } from "./BaseComponent";
import { ContentPanel } from "../panel/contentPanel";
import { Project } from '../../../../src/logic/project';
import { TeamMember } from '../../../../src/logic/teammember';
import { LinkElement } from "./linkElement";
import { TextElement } from "./textElement";

// Legacy imports
import { CLASSNAMES } from "../../constants/ClassNames";

/*
    ------------------------------------------------------

    Project Container and its elements

    ------------------------------------------------------

*/


class ProjectPanel extends ContentPanel{
    
    constructor(parent){
        super(parent, "id");
        this.name = CLASSNAMES.PROJECT_PANEL;
        //this.sections = ["Team", "About"];
    }

    load(projects) {
        this.elements.forEach(el => {
            let element = new el(this.makeId(), "main");
            element.initiate();
            element.load();
        });
        projects.forEach((project) => {
            this.add(ProjectCard, project);
        });
        for (const [key, value] of Object.entries(SECTIONMAP)) {
            this.add(SectionCard, value);
          }
        // this.sections.forEach(s => this.add(SectionCard, s));
    }

    add(element:any, args:any) {
        let div = new element(this.makeId(), args);
        div.initiate();
        div.load();
    }
}

/**
 * Card base component for project and section cards.
 * Extends BaseComponent with proper OOP principles.
 */
class Card extends BaseComponent {
    protected cardContent: any;
    protected link: string;
    protected elements: any[];
    protected clickHandler: () => void;
    public name: string;
    public parent: string;

    constructor(parentId: string, id: string, content?: any) {
        super(parentId || ClassName.CARD, ClassName.CARD, id, content);
        this.cardContent = content;
        this.link = `/project/${this.cardContent?.name}`;
        this.elements = [ProjectTitle, ProjectCardInfo, ProjectCardButton];
        this.clickHandler = () => {
            window.location.href = this.link;
        };
    }

    protected afterInit(): void {
        this.addEventListener('click', this.clickHandler);
    }

    public load(): void {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.makeId(), this.id, this.cardContent);
            element.initiate();
            element.load();
        }
    }
}

class ProjectCard extends Card{
    content: Project;
    link: string;
    constructor(parent:string, project:Project){
        super(parent, project?.name, project);
        this.link = `/project/${this.content.name}`;
        this.name = CLASSNAMES.CARD;
        this.parent = parent ? parent : CLASSNAMES.CARD;
        this.elements = [
            ProjectTitle,
            ProjectCardInfo,
            ProjectCardButton
        ]
    }
    

}

class ProjectCardInfo extends ContentPanel{
    content:Project;
    constructor(parent:string, id:string, project:Project){

        super(parent, id, project);
        this.name = "projectstatus";
        this.content = project;
        this.elements = [
            ProjectCardText];
    }

    _makeText(project){
        
        return `📍 ${project.getPlace()}\n🕙 ${project.getPeriod()}\n🥂 ${project.getStatus()}\n`
    }

    load(){
        for (let e=0; e<this.elements.length; e++){
            let element = new this.elements[e](this.makeId(), 
                                this.id, this._makeText(this.content));

            element.initiate();
        }
    }
}

class ProjectTeam extends ContentPanel{

    constructor(parent:string, id:string, team:TeamMember[]){

        super(parent, id, team);
        this.name = CLASSNAMES.TEAM;
        this.content = team;
        this.elements = team.map(t=>TeamPersonInfo);
    }

    load(){
        for (let e=0; e<this.elements.length; e++){
            
            let element = new this.elements[e](this.makeId(), 
                                               this.content[e].id, 
                                               this.content[e]);

            element.initiate();
            element.load();
        }
    }
}

class TeamPersonInfo extends ContentPanel{

    constructor(parent:string, id:string, teamMember:TeamMember){
        super(parent, id, teamMember);
        this.name = CLASSNAMES.TEAM_MEMBER;
        this.content = teamMember;
        this.elements = [LinkElement, TextElement];
        
    }

    load(){
        
        let element = new LinkElement(this.makeId(), this.id, 
                            [this.content.name, this.content.link]);
        element.initiate();
        let element1 = new TextElement(this.makeId(), this.id, this.content.role);
        element1.initiate();
    }
}

class ProjectPeriodInfo extends ContentPanel{
    args: string[];
    constructor(parent:string, id:string, content?:any){
        super(parent, id, content);
        this.name = id;
        this.content = content;
        this.elements = [TextElement, TextElement, TextElement, TextElement];
        this.args = [
            "Start: ",
            this.content.period.start,
            "End: ",
            this.content.period.end
        ]
    }

    load(){
        for (let e=0; e<this.elements.length; e++){
            
            let element = new this.elements[e](this.makeId(), 
                                               `${e}`, 
                                               this.args[e]);

            element.initiate();
            element.load();
        }
    }
}

class Recognition extends ContentPanel{
    constructor(parent:string, id:string, content?:any){
        super(parent, id, content);
        this.name = id;
        this.content = content;
        this.elements = content.map(e=>TextElement);
    }

    load(){
        for (let e=0; e<this.elements.length; e++){
            
            let element = new this.elements[e](this.makeId(), 
                                               `${e}`, 
                                               this.content[e].value);

            element.initiate();
            element.load();
        }
    }
}

/**
 * Project card button component.
 * Extends BaseComponent with proper OOP principles.
 */
class ProjectCardButton extends BaseComponent {
    private static readonly BUTTON_TEXT = "To project";
    private project: Project;
    private clickHandler: () => void;

    constructor(parentId: string, id: string, project: Project) {
        super(parentId, "projectButton", id, project);
        this.project = project;
        this.clickHandler = () => {
            window.location.href = `/project/${this.project.name}`;
        };
    }

    protected getElementTag(): string {
        return 'button';
    }

    protected createElement(): HTMLElement {
        const element = super.createElement();
        element.innerHTML = ProjectCardButton.BUTTON_TEXT;
        return element;
    }

    protected afterInit(): void {
        this.addEventListener('click', this.clickHandler);
    }
}

class ProjectCardText extends TextElement {
    constructor(parent:string, id:string, content?:any) {
        super(parent, id, content);
        this.name = CLASSNAMES.PROJECT_DESCRIPTION;
        this.content = content;
    }
}

class ProjectTitle extends TextElement {
    constructor(parent:string, id:string, project:Project) {
        super(parent, id, project.name);
        this.name = CLASSNAMES.TITLE;
    }
}

class SectionCard extends Card{
    // static _text = "Explore projects"
    content: string;
    link: string
    constructor(parent:string, section:string[]){
        super(parent, section[0], section);
        this.id = section[0];
        this.content = section[0]; //ExploreCard._text;
        this.name = `${CLASSNAMES.CARD} section`;
        this.parent = parent ? parent : CLASSNAMES.PROJECT_PANEL;
        this.link = section[1];
        this.elements = [ProjectCardText];
    }

    _makeText(content){
        return `${content}`
    }

    load(){
        for (let e=0; e<this.elements.length; e++){
            let element = new this.elements[e](this.makeId(), 
                                    this.id, 
                                    this._makeText(this.content));
            element.initiate();
        }
    }

    
}


export {ProjectPanel, ProjectPeriodInfo, ProjectTeam, Recognition}

