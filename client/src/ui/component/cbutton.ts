
import { CLASSNAMES } from "../../constants/ClassNames";
import {CElement} from "./celement";

class CButton extends CElement {
    id: string;
    parent: string;
    content: string;
    onclick: ()=>{};
    name: string;
    constructor(parent:string, onclick: any) {
        super(parent, "");
        this.name = CLASSNAMES.CLOSE;
        this.content = "✕"; // U+02715
        this.onclick = onclick ? onclick : () => {}; //CategorySidePanel.toggle(category)
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

export {CButton};