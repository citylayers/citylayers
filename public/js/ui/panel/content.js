
class ContentPanel extends CElement{
    static name = CLASSNAMES.CATEGORY_PANEL;

    constructor(parent, id){
        super(parent, id);
        this.parent = parent ? parent : "body";
        this.elements = [];
    }

    load(categories) {
        this.elements.forEach(el => {
            let element = new el(this.make_id(), this.id);
            element.initiate();
            element.load();
        });
        categories ?
        categories.forEach((category, c) => {
            this.addCategory(category);
            document.body.style.setProperty(`--category${c+1}`, `#${category.color}`);
        }) : ()=>{};
    }


    add(category) {
        let div = new CategoryElement(this.make_id(), category);
        div.initiate();
        div.load();
    }

    // getElement() {
    //     let elements = document.getElementsByClassName(this.name);
    //     if (elements.length > 0) {
    //         return elements[0];
    //     }
    //     return this.initiate();
    // }

    getParent() {
        if (this.parent=="body"){
            return document.body;
        }
        return document.getElementById(this.parent);
    }

    initiate() {
        let panel = document.createElement("div");
        panel.setAttribute('class', this.name);
        panel.setAttribute("id", this.make_id());
        this.getParent().appendChild(panel);
        return panel;
    }

    static activate(on){
        let mode = on == true ? "flex" : "none";
        let elements = document.getElementsByClassName(this.name);
        if (elements.length > 0) {
            elements[0].style.display = mode;
        }
    }
}
