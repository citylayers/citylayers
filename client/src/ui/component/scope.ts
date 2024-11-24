import { CLASSNAMES } from "../../../classnames";
import {CElement} from "./celement";

class Scope extends CElement{
    id: string;
    parent: string;
    name: string; 
    constructor(parent:string){
        super(parent);
        this.name = "scope";
        this.content = "/images/scope.svg"; // U+02715
    }

    initiate() {
        var element = document.createElement("img");
        element.src = this.content;
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
    }
}

export {Scope};