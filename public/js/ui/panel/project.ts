import { CLASSNAMES } from "../../../classnames";
import { Project } from "../../../../logic/project";
import { CElement } from "../component/celement";
import { CloseButton } from "../component/closeButton";
import { TextElement, HeaderElement } from "../component/textElement";
import { ContentPanel } from "./contentPanel";
// import {CityLayersPanel} from "./citylayerspanel";

/*
    ------------------------------------------------------

    Project Container and its elements

    ------------------------------------------------------

*/


class ProjectContentPanel extends ContentPanel{
    
    constructor(parent:string){
        super(parent, "");
        this.name = CLASSNAMES.PROJECT_PANEL;
    }

    load(projects:Project[]) {
        this.elements.forEach(el => {
            let element = new el(this.make_id(), "main");
            element.initiate();
            element.load();
        });
        projects.forEach((project, c) => {
            this.add(project);
        });
    }

    add(project:Project) {
        let div = new ProjectElement(this.make_id(), project);
        div.initiate();
        div.load();
    }
    
}


class ProjectElement extends CElement{
    content:Project;
    constructor(parent:string, project:Project){
        super(parent, project.name);
        this.content = project;
        this.name = CLASSNAMES.CATEGORY_CONTAINER;
        this.parent = parent ? parent : CLASSNAMES.CATEGORY_PANEL;
        this.elements = [
            ProjectHeader,
            ProjectDescription
        ]
    }

    getParent() {
        let element = document.getElementById(this.parent);
        return element;
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), 
                                    this.id, this.content);

            element.initiate();
            element.load();
        }
    }

    initiate() {
        let panel = document.createElement("div");
        panel.setAttribute('class', this.name);
        panel.setAttribute("id", this.make_id());
        
        this.getParent().appendChild(panel);
    }
}


class ProjectHeader extends ContentPanel{
    constructor(parent:string, id:string, project:Project){

        super(parent, id, project);
        this.elements = [
            //ProjectInfo, 
            HeaderElement, ProjectConfig,
            ProjectSwitch];
    }

}

class ProjectDescription extends TextElement {
    constructor(parent:string, id:string, project:Project) {
        super(parent, id);
        this.name = CLASSNAMES.CATEGORY_DESCRIPTION;
        this.content = project.info.description;
    }
}

class ProjectSwitch extends CElement{
    content: Project;
    constructor(parent:string, id:string, project:Project){

        super(parent, id, project);
        this.id = id;
        this.name = CLASSNAMES.CATEGORY_SWITCH;
        this.content = project;
        this.parent = parent; //CLASSNAMES.CATEGORY_HEADER;
    }

    static isActive(project) {
        let d = document.getElementById(`${this.name}_${project}`) as HTMLElement;
        let child = d.children[0] as HTMLInputElement;
        return child.checked;
    }

    initiate() {
        let element = document.createElement("label");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
        let e1 = document.createElement("input");
        e1.setAttribute("type", "checkbox");

        e1.onchange = ()=>{
            // CityLayersPanel.activateProject(this.project, ProjectSwitch.isActive(this.id));
            // console.log(ProjectSwitch.isActive(this.id));

        }
        let e2 = document.createElement("span");
        element.appendChild(e1);
        element.appendChild(e2);

    }
}


class ProjectConfig extends CElement{
    project:Project;
    constructor(parent:string, id:string, project:Project){
        super(parent, id);
        this.name = CLASSNAMES.CONFIG;
        this.content = "Configure >"; 
        this.id = id;
        this.project = project;
    }

    initiate() {
        let element = document.createElement("div");
        element.innerHTML = this.content;
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.onclick = ()=>{
            //  CityLayersPanel.switch(this.project.config);
        };
        this.getParent().appendChild(element);
    }
}

/*
    ------------------------------------------------------

    Category Side Panel and its elements

    ------------------------------------------------------

*/

class ProjectSidePanel extends CElement {
    args: any[];
    constructor(parent:string, project:Project) {
        super(parent, project.name);
        this.parent = parent ? parent : "body";
        this.name = CLASSNAMES.CATEGORY_SIDE_PANEL;
        this.content = project;

        this.elements = [CloseButton,
            TextElement,
        ];
        
        this.args = [() => { ProjectSidePanel.toggle(project); }]
    }


    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), this.content, e<this.args.length?this.args[e]:undefined);
            element.initiate();
            element.load();
        }

        this.getElement().style.display = "none";
    }

    static toggle(category:any) {
        let sidePanel = document.getElementById(`${CLASSNAMES.CATEGORY_SIDE_PANEL}_${category.name}`);
        let container = document.getElementById(`${CLASSNAMES.CATEGORY_CONTAINER}_${category.name}`);
        if (sidePanel.style.display === "none") {
            this.hideAll();
        }
        container.classList.toggle("simple-drop-shadow");
        sidePanel.style.display = sidePanel.style.display === "none" ? "flex" : "none";
        document.body.style.setProperty(`--side-panel-color`, `#${category.color}`);
        console.log(document.body.style.getPropertyValue("--side-panel-color"));
    }

    static hideAll() {
        let panels = document.getElementsByClassName(CLASSNAMES.CATEGORY_SIDE_PANEL) as HTMLCollectionOf<HTMLElement>;
        let containers = document.getElementsByClassName(CLASSNAMES.CATEGORY_CONTAINER);
        Array.from(panels).forEach(panel => {
        })
        for (let i = 0; i < panels.length; i++) {
            panels[i].style.display = "none";
            containers[i].classList.remove("simple-drop-shadow");            
        }
    }
}
export {ProjectContentPanel}


