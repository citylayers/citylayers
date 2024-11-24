import { CLASSNAMES , SECTIONMAP} from "../../../classnames";
import {CElement} from "./celement";
import { ContentPanel } from "../panel/contentPanel";
import { Project } from "../../../../logic/project";
import { TeamMember } from "../../../../logic/teammember";
import { LinkElement } from "./linkElement";
import { TextElement } from "./textElement";

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
            let element = new el(this.make_id(), "main");
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
        let div = new element(this.make_id(), args);
        div.initiate();
        div.load();
    }
}

class Card extends CElement{
    content: any;
    link: string;
    constructor(parent:string, id: string, content?:any){
        super(parent, id, content);
        this.link = `/project/${this.content.name}`;
        this.name = CLASSNAMES.CARD;
        this.parent = parent ? parent : CLASSNAMES.CARD;
        this.elements = [
            ProjectTitle,
            ProjectCardInfo,
            ProjectCardButton
        ]
    }

    initiate() {
        var element = document.createElement("div");
        // element.innerHTML = ExploreCard._text;
        element.setAttribute('class', this.name );
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
        element.addEventListener("click", () => {
            window.location.href = `${this.link}`; // `/explore`;
        });
    }
    load() {
        for (let e = 0; e < this.elements.length; e++) {
            
            let element = new this.elements[e](this.make_id(), 
                                    this.id, this.content);
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
            let element = new this.elements[e](this.make_id(), 
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
            
            let element = new this.elements[e](this.make_id(), 
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
        
        let element = new LinkElement(this.make_id(), this.id, 
                            [this.content.name, this.content.link]);
        element.initiate();
        let element1 = new TextElement(this.make_id(), this.id, this.content.role);
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
            
            let element = new this.elements[e](this.make_id(), 
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
            
            let element = new this.elements[e](this.make_id(), 
                                               `${e}`, 
                                               this.content[e].value);

            element.initiate();
            element.load();
        }
    }
}

class ProjectCardButton extends CElement {

    static _text = "To project";
    content: Project;
    constructor(parent:string, id:string, project:Project) {
        super(parent, id, project);
        this.name = "projectButton";
        this.content = project;
    }

    initiate() {
        var element = document.createElement("button");
        element.innerHTML = ProjectCardButton._text;
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
        element.addEventListener("click", () => {
            window.location.href = `/project/${this.content}`;
        });
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
            let element = new this.elements[e](this.make_id(), 
                                    this.id, 
                                    this._makeText(this.content));
            element.initiate();
        }
    }

    
}


export {ProjectPanel, ProjectPeriodInfo, ProjectTeam, Recognition}

