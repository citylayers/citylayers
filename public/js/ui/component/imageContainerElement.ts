import { CLASSNAMES } from "../../../classnames";
import {ContentElement} from "./contentElement";
import { Illustration } from "../../../../logic/illustration";
import {ImageElement} from "./imageElement";

class ImageContainerElement extends ContentElement{
    id: string;
    parent: string;
    images: Illustration[];
    onclick: ()=>{};
    name: string;
    constructor(parent:string,  name:string, illustrations:Illustration[]){
        super(parent, undefined, name);
        this.name = name;
        this.parent = parent ? parent : "main";
        this.elements = illustrations.map(e=>ImageElement);
        this.images = illustrations;
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), 
                                    this.id, this.images[e]);
            element.initiate();
            element.load();
        }
    }
}

class PartnerImageContainerElement extends ImageContainerElement{
    constructor(parent:string,  name:string, illustrations:Illustration[]){
        super(parent, name, illustrations);
        this.name = CLASSNAMES.PARTNER;
    }
}
export {ImageContainerElement, PartnerImageContainerElement};