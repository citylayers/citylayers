

class LinkElement extends TextElement {
    constructor(parent, name, content, link) {
        super(parent, name, content);
        this.link = link
    }

    initiate() {
        let el = document.createElement("a");
        el.href = this.link;
        this.getParent().appendChild(el);
        
        let element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content;
        el.appendChild(element);
    }
}
