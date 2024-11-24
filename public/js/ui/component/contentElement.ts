import { CLASSNAMES } from "../../../classnames";
import {CElement} from "./celement";

class ContentElement extends CElement{
    id: string;
    parent: string;
    content: string;
    name: string;
    elements: typeof CElement[];

    constructor(parent:string, id:string, content:string){
        super(parent, id);
        this.content = content;
        this.name = "contentelement";
        this.parent = parent ? parent : "main";
        this.elements = [];
    }

    getParent() {
        let element = document.getElementById(this.parent);
        return element;
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            
            let element = new this.elements[e](this.make_id(), 
                                    this.id, this.content);
            element.initiate();
            element.load();
        }
    }

    initiate() {
        let panel = document.createElement("div");
        panel.setAttribute('class', this.name);
        panel.setAttribute("id", this.make_id());

        this.getParent().appendChild(panel);
    }
}

export {ContentElement};