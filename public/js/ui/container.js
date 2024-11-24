
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


class CategoryElement extends CElement{
    
    constructor(parent, category){
        super(parent, category.name);
        this.content = category;
        this.name = CLASSNAMES.CATEGORY_CONTAINER;
        this.parent = parent ? parent : CLASSNAMES.CATEGORY_PANEL;
        this.elements = [
            CategoryHeader,
            DoubleSlider,
            SliderLabelContainer,
            SubcategoryTagContainer,
            CategorySidePanel
        ]
    }
    getParent() {
        let element = document.getElementById(this.parent);
        return element;
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = 0;

            switch (this.elements[e]) {
                case (CategorySidePanel):
                    element = new this.elements[e](this.make_id(),
                        this.content);
                    element.parent = "right-container";
                    break;

                case (CategoryHeader): 
                    element = new this.elements[e](this.make_id(), 
                                    this.content.name, this.content);
                    break;
                case (DoubleSlider):
                    element = new this.elements[e](this.make_id(), 
                    this.content.name, this.content);
                    break;
                case (SliderLabelContainer):
                    element = new this.elements[e](this.make_id(), 
                    this.content.name, this.content);
                    break;
                default:
                    element = new this.elements[e](this.make_id(),
                    this.content.name, this.content.subcategories);
            }

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


class CategoryHeader extends CElement{
    
    constructor(parent, id, category){

        super(parent);
        this.id = id;
        this.name = CLASSNAMES.CATEGORY_HEADER;
        this.category = category;
        // this.parent = parent; //CLASSNAMES.CATEGORY_CONTAINER;
        this.elements = [CategoryInfo, 
            CategoryLabel, CategorySwitch];
    }


    load(){
        for (let e=0; e<this.elements.length; e++){
            let element = new this.elements[e](this.make_id(), this.id, this.category);

            element.initiate();
        }
    }
}


class CategoryLabel extends CElement{
    

    constructor(parent, id){

        super(parent);
        this.id = id;
        this.name = CLASSNAMES.CATEGORY_HEADER_TITLE;
        this.parent = parent; //CLASSNAMES.CATEGORY_HEADER;
    }
    initiate() {
        let element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.id;
        this.getParent().appendChild(element);
    }
}

class CategorySwitch extends Switch{
    static _name = CLASSNAMES.CATEGORY_SWITCH;
    constructor(parent, id, category){
        super(parent, id, category);
        this.name = CLASSNAMES.CATEGORY_SWITCH;
        
    }

    initiate() {
        let element = document.createElement("label");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
        let e1 = document.createElement("input");
        e1.setAttribute("type", "checkbox");

        e1.onchange = ()=>{
            
            CityLayersPanel.activation(this.category, 
                            CategorySwitch.isActive(this.id) ? DoubleSlider.getCurrentValue(this.id).min : 0, 
                            CategorySwitch.isActive(this.id) ? DoubleSlider.getCurrentValue(this.id).max : 0);
            DoubleSlider.activate(this.id, CategorySwitch.isActive(this.id));

        }
        let e2 = document.createElement("span");
        element.appendChild(e1);
        element.appendChild(e2);

    }
}


class CategoryInfo extends CElement{
    
    constructor(parent, id, category){
        super(parent, id);
        this.content = "info"; 
        this.id = id;
        this.name = "material-symbols-outlined";
        this.category = category;
    }

    initiate() {
        var element = document.createElement("span");
        element.innerHTML = this.content;
        element.setAttribute('class', this.name);
        element.onclick = ()=>{
             CategorySidePanel.toggle(this.category);            
        };
        this.getParent().appendChild(element);
    }
}


class SubcategoryTagContainer extends CElement {
   
    static cname = CLASSNAMES.TAG_CONTAINER
    constructor(parent, id) {
        super(parent, id);
        this.name = CLASSNAMES.TAG_CONTAINER;
        this.parent = parent; //CLASSNAMES.CATEGORY_CONTAINER;
    }

    load(labels) {
        if (labels == undefined) {
            labels = [];
        }
        labels.forEach(label => {
            let element = new SubcategoryTag(this.make_id(), label);
            element.initiate();
        });
    }

    static getByCategory(category) {
        return document.getElementById(`${this.cname}_${category}`)
    }

    static addLabel(category, label, togglable) {
        togglable = false;
        let element = new SubcategoryTag(`${this.cname}_${category}`, label);
        element.initiate(togglable);

    }
}

class SubcategoryTag extends CElement {
    
    constructor(parent, tag) {
        super(parent, tag.name);
        this.name = CLASSNAMES.SUBCATEGORY_TAG;
        if (tag.name == undefined) {
            this.id = tag;
        }
        this.subcat_id = tag.id;
        
        this.parent = parent; //CLASSNAMES.TAG_CONTAINER;
    }

    toggle() {
        let _cname = this.getParent().parentElement.parentElement.className;
        let _id = this.getParent().parentElement.parentElement.id;
        let category = _id.replace(`${_cname}_`, "");
        let new_id = `${this.name}_${this.id}`;

        let container = SubcategoryTagContainer.getByCategory(category);
        let existing_ids = Array.from(container.children).map(el => el.id);

        if (existing_ids.includes(new_id)) {
            document.getElementById(new_id).remove();
        }
        else {
            SubcategoryTagContainer.addLabel(category, this.id, true);
        }
        ConfigPanel.markertoggle(this.subcat_id, !existing_ids.includes(new_id));
    }

    initiate(togglable) {
        togglable = togglable == undefined ? true : togglable;
        let element = document.createElement("div");
        element.setAttribute('class', CLASSNAMES.SUBCATEGORY_TAG);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
        let e1 = document.createElement("input");
        e1.setAttribute("type", "checkbox");
        let e2 = document.createElement("div");
        e2.setAttribute("class", "tag-element");
        let label = document.createElement("label");
        label.innerHTML = this.id;
        e2.appendChild(label);
        element.appendChild(e1);
        element.appendChild(e2);

        if (togglable == true) {
            e1.onclick = () => { this.toggle(); }
        }
        else {
            e1.setAttribute("disabled", "true");
        }
    }
}


