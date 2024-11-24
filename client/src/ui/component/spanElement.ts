import { CLASSNAMES } from "../../../classnames";
import {CElement} from "./celement";

class SpanElement extends CElement{
    id: string;
    parent: string;
    name: string; 
    constructor(parent:string, id:string, content?:any) {
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

export {SpanElement};