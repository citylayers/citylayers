import { CLASSNAMES } from "../../../classnames";
import {CElement} from "../component/celement";

class ContentPanel extends CElement{

    constructor(parent:string, id:string, content?:any){
        super(parent, id, content);
        this.name = CLASSNAMES.CATEGORY_PANEL;
        this.parent = parent ? parent : "body";
        this.elements = [];
    }

    load(categories:any[], args:any) {
        this.elements.forEach(el => {
            let element = new el(this.make_id(), this.id);
            element.initiate();
            element.load();
        });
        // categories ?
        // categories.forEach((category, c) => {
        //     this.addCategory(category);
        //     document.body.style.setProperty(`--category${c+1}`, `#${category.color}`);
        // }) : ()=>{};
    }


    add(element:any, args:any) {
        // let div = new CategoryElement(this.make_id(), category);
        // div.initiate();
        // div.load();
    }

    // getElement() {
    //     let elements = document.getElementsByClassName(this.name);
    //     if (elements.length > 0) {
    //         return elements[0];
    //     }
    //     return this.initiate();
    // }

    getParent() {
        if (this.parent=="body"){
            return document.body;
        }
        return document.getElementById(this.parent);
    }


    static activate(on:boolean){
        let mode = on == true ? "flex" : "none";
        let elements = document.getElementsByClassName(this.name);
        if (elements.length > 0) {
            let el = elements[0] as HTMLElement;
            el.style.display = mode;
        }
    }
}
export {ContentPanel};