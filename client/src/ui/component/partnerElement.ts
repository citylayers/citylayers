import { CLASSNAMES } from "../../../classnames";
import {ContentElement} from "./contentElement";
import {Logo} from "./logo";

class PartnerElement extends ContentElement{
    id: string;
    parent: string;
    onclick: ()=>{};
    elements: any[];
    name: string;
    constructor(parent:string, id:string, content:string){
        
        super(parent, id, content);
        this.name = CLASSNAMES.PARTNER;
        this.elements = [Logo, Logo, Logo];
    }

}

export {PartnerElement}