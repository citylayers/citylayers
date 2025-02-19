

class HrElement extends CElement{
    constructor(parent, id) {
        super(parent, id);
        this.name = "";
        this.content = "";
    }
    load() { }

    initiate() {
        let el = document.createElement("hr");
        el.setAttribute('class', "gradient bar");
        el.setAttribute('id', this.id);
        this.getParent().appendChild(el);
        return el;
    }

    static updateColor(ev, gradientEnd){
        /* which */
        document.getElementsByTagName("hr")[0].style.setProperty(gradientEnd, ev.target.value);
    }
    
}