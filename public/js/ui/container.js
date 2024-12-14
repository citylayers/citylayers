
// const PanelMap = new Map(
//     (PANEL_IDS.PROJECT, ProjectContentPanel),
//     (PANEL_IDS.CATEGORY, ContentPanel)
// )

/*
    ------------------------------------------------------

    Panel Header elements

    ------------------------------------------------------

*/

class PanelHeader extends CElement {
    
    constructor(parent, id) {
        super(parent);
        this.id = id;
        
        this.name = CLASSNAMES.CATEGORYPANEL_HEADER;
        // this.parent = parent; //CLASSNAMES.CATEGORY_CONTAINER;
        this.elements = [CategoryPanelLabel, CategoryPanelDescr, ToProjects];
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), this.id);
            element.initiate();
        }
    }
}

class ToProjects extends CElement{
    static content = "< To projects"
    constructor(parent, id) {
        super(parent);
        this.id = id;
        this.name = CLASSNAMES.CATEGORYPANEL_LABEL;
        this.parent = parent; //CLASSNAMES.CATEGORY_HEADER;
        this.content = ToProjects.content;
    }
    initiate() {
        let element = document.createElement("div");
        element.setAttribute('class', `${this.name} ${CLASSNAMES.CLICK}`);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content;
        element.onclick = ()=>{
            CityLayersPanel.switch(); 
                       
       };
        this.getParent().appendChild(element);
    }
    static activate(on){
        let elements = Array.from(document.getElementsByClassName(
            CLASSNAMES.CATEGORYPANEL_LABEL)).filter(e=>e.innerText==ToProjects.content);
        if (elements.length>0){
            elements[0].style.display = on==false ? "none" : "flex";
        }
    }
    static hide(){
        let elements = Array.from(document.getElementsByClassName(
            CLASSNAMES.CATEGORYPANEL_LABEL)).filter(e=>e.innerText==ToProjects.content);
            
        if (elements.length>0){
            elements[0].style.display ="none";
        }
    }

}


class CategoryPanelLabel extends CElement {
    
    constructor(parent, id) {
        super(parent);
        this.id = id;
        this.name = CLASSNAMES.CATEGORYPANEL_LABEL;
        this.parent = parent; //CLASSNAMES.CATEGORY_HEADER;
        this.content = "Explore and compare layers";
    }
    initiate() {
        let element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content;
        this.getParent().appendChild(element);
    }
}

class CategoryPanelDescr extends CElement {
    
    constructor(parent, id) {
        super(parent);
        this.id = id;
        this.name = CLASSNAMES.CATEGORYPANEL_DESCR;
        this.parent = parent; //CLASSNAMES.CATEGORY_HEADER;
        this.content = "Activate and adjust the ranges of \
                the various categories below in order to visualise \
                them in the space."
    }
    initiate() {
        let element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content;
        this.getParent().appendChild(element);
    }
}

/*
    ------------------------------------------------------

    Category Container and its elements

    ------------------------------------------------------

*/
