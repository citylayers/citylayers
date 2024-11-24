
import { CLASSNAMES } from "../../../classnames";
import {CElement} from "./celement";

class HrElement extends CElement{
    id: string;
    parent: string;
    content: string;
    name: string;
    constructor(parent:string) {
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

export {HrElement};