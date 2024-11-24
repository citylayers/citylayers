
import { CLASSNAMES } from "../../../classnames";
import {TextElement} from "./textElement";

class LinkElement extends TextElement {
    link:string;
    id: string;
    parent: string;
    onclick: ()=>{};
    name: string;
    constructor(parent:string, id:string, content?:string[]) {
        super(parent, id, content[0]);
        this.link = content[1];
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

export {LinkElement};