

class TextElement extends CElement {
    static name = CLASSNAMES.TEXT;
    constructor(parent, id, content) {
        super(parent, id);
        this.id = id;
        this.content = content ? content.replaceAll("\\n", "<br>") : "";
    }
    load() { }

    initiate() {
        let element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content; //emoji.emojify(this.content);
        this.getParent().appendChild(element);
    }
}
