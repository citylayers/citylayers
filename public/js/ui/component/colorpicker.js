
class ColorPickerElement extends CElement {
    constructor(parent, id, onchange) {
        super(parent, id);
        this.name = CLASSNAMES.COLORPICKER;
        this.value = "#014751";
        this.onchange = onchange ? onchange : ()=> {};
    }

    initiate() {
        let el = document.createElement("input");
        el.setAttribute('type', "color");
        el.setAttribute('class', this.name);
        el.setAttribute("id", this.make_id());
        el.setAttribute("value", this.value);
        el.oninput = this.onchange;
        this.getParent().appendChild(el);
    }
}


