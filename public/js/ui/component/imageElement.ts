import { CLASSNAMES , IDS} from "../../../classnames";
import {CElement} from "./celement";
import { Illustration } from "../../../../logic/illustration";

class ImageElement extends CElement {
    id: string;
    parent: string;
    content: Illustration;
    onclick: ()=>{};
    name: string;
    
    constructor(parent:string, id:string, image?:Illustration, name?:string) {
        // image is instance of Illustration
        super(parent, id);
        this.name = name? name : CLASSNAMES.LOGO;
        this.content = image ? image : new Illustration("", "", ""); // Illustration
    }

    initiate() {
        
        let element = document.createElement("img");
        element.src = this.content.path;
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        if (this.content.link!="" && this.content.link!=undefined && this.content.link!=null){
            element.addEventListener("click", () => {
                window.location.href = this.content.link;
            });
        }
        this.getParent().appendChild(element);
    }
}

class ImagePreviewElement extends ImageElement {
    id: string;
    parent: string;
    content: Illustration;
    name: string;

    constructor(parent:string, id?:string, name?:string) {
        // image is instance of Illustration
        super(parent, id);
        this.name = name? name : CLASSNAMES.LOGO;
        this.id = IDS.IMG_PREVIEW;
        this.content = new Illustration("", "", "Upload"); // Illustration
    }

    initiate() {
        
        let element = document.createElement("img");
        element.src = this.content.path;
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.id);
        this.getParent().appendChild(element);
    }
}

export {ImageElement, ImagePreviewElement};
