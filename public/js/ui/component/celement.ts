import { v4 as uuidv4 } from 'uuid';

import { CLASSNAMES } from "../../../classnames";

class CElement {
    
    id: string;
    name: string;
    parent: string;
    elements: typeof CElement[];
    content: any;
    constructor(parent:string, id?:string, content?:any) {
        this.id = id ? id : uuidv4();
        this.name = CLASSNAMES.CATEGORY_CONTAINER;
        this.content = content;
        this.parent = parent;
        this.elements = [];

    }

    getElement() {
        return document.getElementById(`${this.name}_${this.id}`);
    }

    static getElements(){
        return document.getElementsByClassName(this.name);
    }

    getParent() {
        let element = document.getElementById(this.parent);
        return element;
    }

    initiate(a?:any, n?:any) {
        let panel = document.createElement("div");
        panel.setAttribute('class', this.name);
        panel.setAttribute("id", this.make_id());
        this.getParent().appendChild(panel);
    }

    load(elements?:any[], args?:any) {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), this.id, this.content);
            element.initiate();
            element.load();
        }
    }
    make_id() {
        return `${this.name}_${this.id}`
    }

    show(display:boolean){
        this.getElement().style.display = display==false ? "none" : "flex";
    }
}
export {CElement};