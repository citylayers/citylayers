

/*
    ------------------------------------------------------

    Project Container and its elements

    ------------------------------------------------------

*/


class ProjectPanel extends ContentPanel{
    static name = CLASSNAMES.PROJECT_PANEL;
    constructor(parent){
        super(parent, "id");
        this.name = ProjectPanel.name;
        //this.sections = ["Team", "About"];
    }

    load(projects) {
        this.elements.forEach(el => {
            let element = new el(this.make_id(), "");
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

    add(element, args) {
        let div = new element(this.make_id(), args);
        div.initiate();
        div.load();
    }
}


class ProjectCard extends CElement{
    constructor(parent, project){
        let _p = project ? project : undefined;
        let id = _p ? _p.id : "";
        super(parent, id);
        

        this.content = _p;
        this.link = `/project/${project.name}`;
        this.name = CLASSNAMES.CARD;
        this.parent = parent ? parent : CLASSNAMES.CARD;
        this.elements = [
            ProjectTitle,
            ProjectCardInfo,
            ProjectCardButton
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
        panel.addEventListener("click", () => {
            window.location.href = `${this.link}`; // `/explore`;
        });
    }
}


class ProjectCardInfo extends ContentPanel{

    

    constructor(parent, id, project){

        super(parent, id, project);
        this.name = "projectstatus";
        this.content = project;
        this.elements = [
            ProjectCardText];
    }

    _makeText(project){
        //📍 ${project.getPlace()}\n
        return `🕙 ${project.getPeriod()}\n🥂 ${project.getStatus()}\n`
    }

    load(){
        for (let e=0; e<this.elements.length; e++){
            let element = new this.elements[e](this.make_id(), CLASSNAMES.PROJECT_DESCRIPTION, this._makeText(this.content));

            element.initiate();
        }
    }
}

class ProjectTeam extends ContentPanel{

    

    constructor(parent, id, team){

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

    constructor(parent, id, teamMember){
        super(parent, id, teamMember);
        this.name = CLASSNAMES.TEAM_MEMBER;
        this.content = teamMember;
        this.elements = [LinkElement, TextElement];
        
    }

    load(){
        
        let element = new LinkElement(this.make_id(), this.id, this.content.name, this.content.link);
        element.initiate();
        let element1 = new TextElement(this.make_id(), this.id, this.content.role);
        element1.initiate();
    }
}



class ProjectPeriodInfo extends ContentPanel{
    constructor(parent, id, content){
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
    constructor(parent, id, content){
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

    static _text = "Add a pin asd";
    
    constructor(parent, project) {
        super(parent, project);
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

class AddPinButton extends CButton {

    constructor(parent, id, project) {
        super(parent, project);
        this.name = "projectButton";
        this.content = "Add a pin";
        this.project = project;
        this.onclick = () => {
            window.location.href = `/pin/${this.project}`;
        }
    }
}

class DashboardButton extends CButton {

    constructor(parent, id, project) {
        super(parent, project);
        this.name = "projectButton";
        this.content = "Explore";
        this.project = project;
        this.onclick = () => {
            window.location.href = `/map/${this.project}`;
        }
    }
}

class ProjectCardText extends TextElement {
    constructor(parent, name, content) {
        super(parent, name, content);
        this.name = CLASSNAMES.PROJECT_DESCRIPTION;
        this.content = content;
    }
}

class ProjectTitle extends TextElement {
    constructor(parent, name, project) {
        project = project.name;
        super(parent, name, project);
        this.name = CLASSNAMES.TITLE;
    }
}

class SectionCard extends ProjectCard{
    // static _text = "Explore projects"
    constructor(parent, section){
        super(parent, section[0]);
        this.id = section[0]
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
                                    CLASSNAMES.PROJECT_DESCRIPTION, 
                                    this._makeText(this.content));
            element.initiate();
        }
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
}




