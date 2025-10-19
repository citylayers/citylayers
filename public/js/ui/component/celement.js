

class CElement {
    static name = CLASSNAMES.CATEGORY_CONTAINER;
    constructor(parent, id) {
        this.id = id ? id : uuidv4();
        this.name = this.constructor.name;
        this.parent = parent;
        this.elements = []
    }

    getElement() {
        // let elements = document.getElementsByClassName(this.name);
        // if (elements.length > 0){
        //     return elements[0];
        // }
        return document.getElementById(`${this.name}_${this.id}`);
        // return this.initiate();
    }

    static getElements(){
        return document.getElementsByClassName(this.name);
    }

    getParent() {
        let element = document.getElementById(this.parent);
        return element;
    }



    initiate() {
        let panel = document.createElement("div");
        panel.setAttribute('class', this.name);
        panel.setAttribute("id", this.make_id());
        this.getParent().appendChild(panel);
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), this.id);
            element.initiate();
            element.load();
        }
    }
    
    make_id() {
        return `${this.name}_${this.id}`
    }

    // Alias for compatibility with BaseComponent naming convention
    makeId() {
        return this.make_id();
    }

    show(display){
        this.getElement().style.display = display==false ? "none" : "flex";
    }
}
