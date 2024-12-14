

/*
    ------------------------------------------------------

    Project Container and its elements

    ------------------------------------------------------

*/


class ProjectContentPanel extends ContentPanel{
    static name = CLASSNAMES.PROJECT_PANEL;
    constructor(parent){
        super(parent, "id");
        this.name = ProjectContentPanel.name;
    }

    load(projects) {
        this.elements.forEach(el => {
            let element = new el(this.make_id(), "main");
            element.initiate();
            element.load();
        });
        projects.forEach((project, c) => {
            this.add(project);
        });
    }

    add(project) {
        let div = new ProjectElement(this.make_id(), project);
        div.initiate();
        div.load();
    }
    
}

class ProjectElement extends CElement{
    constructor(parent, project){
        super(parent, project.id);
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

class ProjectHeader extends CategoryHeader{
    constructor(parent, id, project){

        super(parent, id, project);
        this.elements = [
            //ProjectInfo, 
            CategoryLabel, ProjectConfig,
            ProjectSwitch];
    }

}

class ProjectDescription extends CategoryDescription {
    constructor(parent, id, category) {
        super(parent, id);
        this.name = CLASSNAMES.CATEGORY_DESCRIPTION;
        this.content = category.description;
    }
}

class ProjectSwitch extends CElement{
    static _name = CLASSNAMES.CATEGORY_SWITCH;
    constructor(parent, id, project){

        super(parent);
        this.id = id;
        this.name = ProjectSwitch._name;
        this.project = project;
        this.parent = parent; //CLASSNAMES.CATEGORY_HEADER;
    }

    static isActive(project) {
        let d = document.getElementById(`${this._name}_${project}`);
        return d.children[0].checked;
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

        }
        let e2 = document.createElement("span");
        element.appendChild(e1);
        element.appendChild(e2);

    }
}

class ProjectConfig extends CElement{
    constructor(parent, id, project){
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
             CityLayersPanel.switch(this.project.config);
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
    constructor(parent, project) {
        super(parent, project.id);
        this.id = project.name;
        this.parent = parent ? parent : "body";
        this.name = CLASSNAMES.CATEGORY_SIDE_PANEL;
        this.content = project;

        this.elements = [CloseButton,
            CategoryDescription,
        ];
        
        this.args = [() => { ProjectSidePanel.toggle(project); }]
    }

    getParent() {
        let elements = document.getElementsByClassName(this.parent);
        if (elements.length > 0) {
            return elements[0];
        }
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), this.content, e<this.args.length?this.args[e]:undefined);
            element.initiate();
            element.load();
        }

        this.getElement().style.display = "none";
    }

    static toggle(category) {
        let sidePanel = document.getElementById(`${CLASSNAMES.CATEGORY_SIDE_PANEL}_${category.name}`);
        let container = document.getElementById(`${CLASSNAMES.CATEGORY_CONTAINER}_${category.name}`);
        if (sidePanel.style.display === "none") {
            this.hideAll();
        }
        container.classList.toggle("simple-drop-shadow");
        sidePanel.style.display = sidePanel.style.display === "none" ? "flex" : "none";
        document.body.style.setProperty(`--side-panel-color`, `#${category.color}`);
    }

    static hideAll() {
        let panels = document.getElementsByClassName(CLASSNAMES.CATEGORY_SIDE_PANEL);
        let containers = document.getElementsByClassName(CLASSNAMES.CATEGORY_CONTAINER);
        Array.from(panels).forEach(panel => {
        })
        for (let i = 0; i < panels.length; i++) {
            panels[i].style.display = "none";
            containers[i].classList.remove("simple-drop-shadow");            
        }
    }
}



