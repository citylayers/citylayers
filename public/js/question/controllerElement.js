class DoubleRangeInput extends CElement {
   
    static cname = CLASSNAMES.CONTROLLER
    constructor(parent, id) {
        super(parent, id);
        this.name = CLASSNAMES.CONTROLLER;
        this.parent = parent; //CLASSNAMES.CATEGORY_CONTAINER;
        this.elements = [
            DoubleSlider,
            SliderLabelContainer
        ]
    }

    load() {
        let element = new this.elements[e](this.make_id(), this.content.name, this.content);
        element.initiate();
        element.load();
    }
}

class MultiCategoricalContainer extends CElement {
   
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

        let container = ControllerMultiCategorical.getByCategory(category);
        let existing_ids = Array.from(container.children).map(el => el.id);

        if (existing_ids.includes(new_id)) {
            document.getElementById(new_id).remove();
        }
        else {
            ControllerMultiCategorical.addLabel(category, this.id, true);
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