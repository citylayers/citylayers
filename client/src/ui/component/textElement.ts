import { CLASSNAMES } from "../../../classnames";
import {CElement} from "./celement";

class TextElement extends CElement {
    id: string;
    parent: string;
    onclick: ()=>{};
    name: string; 
    constructor(parent:string, id:string, content?:any) {
        super(parent, id);
        this.name = CLASSNAMES.TEXT;
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

class HeaderElement extends TextElement{
    constructor(parent:string, id:string, content?:any){
        super(parent, id, content);
        this.name = CLASSNAMES.HEADER;
    }
}

export {TextElement, HeaderElement};
