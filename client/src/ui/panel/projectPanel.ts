import { ClassName } from "../../constants/ClassNames";
import { Project } from '../../../../src/logic/project';
import { BaseComponent } from "../component/BaseComponent";
import { CloseButton } from "../component/closeButton";
import { TextElement, HeaderElement } from "../component/textElement";
import { ContentPanel } from "./contentPanel";

// Legacy imports
import { CLASSNAMES } from "../../constants/ClassNames";

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
            let element = new el(this.makeId(), "main");
            element.initiate();
            element.load();
        });
        projects.forEach((project, c) => {
            this.add(project);
        });
    }

    add(project:Project) {
        let div = new ProjectElement(this.makeId(), project);
        div.initiate();
        div.load();
    }
    
}


/**
 * Project element component.
 * Extends BaseComponent with proper OOP principles.
 */
class ProjectElement extends BaseComponent {
    private project: Project;
    private elements: any[];

    constructor(parentId: string, project: Project) {
        super(parentId || ClassName.CATEGORY_PANEL, ClassName.CATEGORY_CONTAINER, project.name);
        this.project = project;
        this.elements = [ProjectHeader, ProjectDescription];
    }

    public load(): void {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.makeId(), this.id, this.project);
            element.initiate();
            element.load();
        }
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

/**
 * Project switch component (checkbox).
 * Extends BaseComponent with proper OOP principles.
 */
class ProjectSwitch extends BaseComponent {
    private project: Project;
    static readonly componentName: string = ClassName.CATEGORY_SWITCH;

    constructor(parentId: string, id: string, project: Project) {
        super(parentId, ClassName.CATEGORY_SWITCH, id, project);
        this.project = project;
    }

    static isActive(project: string): boolean {
        const element = document.getElementById(`${ClassName.CATEGORY_SWITCH}_${project}`) as HTMLElement;
        if (element) {
            const child = element.children[0] as HTMLInputElement;
            return child.checked;
        }
        return false;
    }

    protected getElementTag(): string {
        return 'label';
    }

    protected afterInit(): void {
        const element = this.getElement();
        if (element) {
            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.onchange = () => {
                // CityLayersPanel.activateProject(this.project, ProjectSwitch.isActive(this.id));
            };

            const span = document.createElement("span");
            element.appendChild(checkbox);
            element.appendChild(span);
        }
    }
}


/**
 * Project config button component.
 * Extends BaseComponent with proper OOP principles.
 */
class ProjectConfig extends BaseComponent {
    private project: Project;
    private clickHandler: () => void;

    constructor(parentId: string, id: string, project: Project) {
        super(parentId, ClassName.CONFIG, id);
        this.project = project;
        this.clickHandler = () => {
            // CityLayersPanel.switch(this.project.config);
        };
    }

    protected createElement(): HTMLElement {
        const element = super.createElement();
        element.innerHTML = "Configure >";
        return element;
    }

    protected afterInit(): void {
        this.addEventListener('click', this.clickHandler);
    }
}

/*
    ------------------------------------------------------

    Category Side Panel and its elements

    ------------------------------------------------------

*/

/**
 * Project side panel component.
 * Extends BaseComponent with proper OOP principles.
 */
class ProjectSidePanel extends BaseComponent {
    private project: Project;
    private elements: any[];
    private args: any[];

    constructor(parentId: string, project: Project) {
        super(parentId || "body", ClassName.CATEGORY_SIDE_PANEL, project.name);
        this.project = project;
        this.elements = [CloseButton, TextElement];
        this.args = [() => { ProjectSidePanel.toggle(project); }];
    }

    public load(): void {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](
                this.makeId(),
                this.project,
                e < this.args.length ? this.args[e] : undefined
            );
            element.initiate();
            element.load();
        }

        const el = this.getElement();
        if (el) {
            el.style.display = "none";
        }
    }

    static toggle(category: any): void {
        const sidePanel = document.getElementById(`${ClassName.CATEGORY_SIDE_PANEL}_${category.name}`);
        const container = document.getElementById(`${ClassName.CATEGORY_CONTAINER}_${category.name}`);

        if (sidePanel && container) {
            if (sidePanel.style.display === "none") {
                this.hideAll();
            }
            container.classList.toggle("simple-drop-shadow");
            sidePanel.style.display = sidePanel.style.display === "none" ? "flex" : "none";
            document.body.style.setProperty(`--side-panel-color`, `#${category.color}`);
        }
    }

    static hideAll(): void {
        const panels = document.getElementsByClassName(ClassName.CATEGORY_SIDE_PANEL) as HTMLCollectionOf<HTMLElement>;
        const containers = document.getElementsByClassName(ClassName.CATEGORY_CONTAINER);

        for (let i = 0; i < panels.length; i++) {
            panels[i].style.display = "none";
            containers[i].classList.remove("simple-drop-shadow");
        }
    }
}
export {ProjectContentPanel}


