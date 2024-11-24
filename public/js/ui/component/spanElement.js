

class SpanElement extends CElement{
    constructor(parent, id, content) {
        super(parent, id);
        this.name = "";
        this.content = content;
    }
    load() { }

    initiate() {
        let element = document.createElement("span");
        element.innerHTML = this.content;
        this.getParent().appendChild(element);
    }
    
}