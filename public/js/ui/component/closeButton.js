class CloseButton extends CElement {
    
    constructor(parent, category, onclick) {
        super(parent, category ? category.name : "id");
        this.name = CLASSNAMES.CLOSE;
        this.content = "✕"; // U+02715
        this.onclick = onclick ? onclick : () => { CategorySidePanel.toggle(category) };
    }

    initiate() {
        let element = document.createElement("button");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content;
        element.onclick = this.onclick;
        this.getParent().appendChild(element);
    }
}