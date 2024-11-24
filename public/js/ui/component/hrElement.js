

class HrElement extends CElement{
    constructor(parent) {
        super(parent);
        this.name = "";
        this.content = "";
    }
    load() { }

    initiate() {
        let element = document.createElement("hr");
        this.getParent().appendChild(element);
    }
    
}