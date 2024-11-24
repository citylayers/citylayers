import { CElement } from "../component/celement";
import {ContentPanel} from "./contentPanel";

import { LEGAL_CLASSNAMES, CLASSNAMES } from "../../../classnames";
import { Logo } from "../component/logo";
import { CloseButton } from "../component/closeButton";
import { TextElement } from "../component/textElement";

class LegalPanel extends ContentPanel{
    constructor(parent:string, id:string, content?:any){
        super(parent, id, content);
        this.name = LEGAL_CLASSNAMES.PANEL;
        this.elements = [LegalHeader, LegalBody];
        this.content = content;
    }

    load(args?:any) {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), this.id, this.content);
            element.initiate();
            element.load();
        }
    }
}

class LegalHeader extends ContentPanel{
    args: string[];
    elements: any[];
    constructor(parent:string, id:string, content?:any){
        super(parent, id, content);
        this.name = LEGAL_CLASSNAMES.HEADER;
        this.content = content;
        this.elements = [Logo, CloseButton];
        this.args = [CLASSNAMES.LOGO , ()=>{location.href = "/"}, content[0].name]
    }

    initiate() {
        var element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), this.id, this.args[e]);
            element.initiate();
        }
    }
}

class LegalBody extends ContentPanel{
    classes: string[];
    args: string[];
    constructor(parent:string, id:string, content?:any){
        super(parent, id, content);
        this.name = LEGAL_CLASSNAMES.BODY;
        this.content = content;
        this.elements = [TextElement, LegalBodyContent]; 
        this.classes = [LEGAL_CLASSNAMES.TITLE, LEGAL_CLASSNAMES.LEGALBODYCONTENT]
        this.args = [content[0].title, content];
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {

            
            let element = new this.elements[e](this.make_id(), 
                                    this.classes[e], 
                                    e < this.args.length ? this.args[e] : undefined
                                );
            element.initiate();
            element.load();
        }
    }
}

class LegalBodyContent extends ContentPanel{
    classes: string[];
    args: string[];
    constructor(parent:string, id:string, content?:any){
        super(parent, id, content);
        this.name = LEGAL_CLASSNAMES.BODY;
        this.content = content;
        
        this.elements = [...content.map(e=> (e.link!=undefined && e.link!=null && e.link!="") ? LegalLinkText : TextElement)]; 
        this.classes = [ ...content.map(e=> e.formatting==1 ? LEGAL_CLASSNAMES.TEXT_F : LEGAL_CLASSNAMES.TEXT)]
        this.args = [...content.map(e=> e.content)];
    }

    initiate() {
        let suffix = location.href.endsWith("dataprivacyandprotection") || location.href.endsWith("accessibility") ? " onecol" : ""
        let element = document.createElement("div");
        element.setAttribute('class', this.name + suffix);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = undefined;
            if (this.elements[e]==TextElement){
                element = new this.elements[e](this.make_id(), this.id,
                                        e < this.args.length ? this.args[e] : undefined
                                        // this.content[e]!=undefined ? this.content[e].link : undefined
                                    );
                                }
            else{
                element = new this.elements[e](this.make_id(), this.id,
                [e < this.args.length ? this.args[e] : undefined,
                this.content[e]!=undefined ? this.content[e].link : undefined]
            );

            }
            element.initiate();
        }
    }
}



class LegalLinkText extends CElement {
    link: string;
    constructor(parent:string, id:string, content?:any) {
        super(parent, id, content);
        
        this.name = LEGAL_CLASSNAMES.TEXT;
        this.content = content ? content[0].replaceAll("\\n", "<br>") : "";
        this.link = content ? content[1] : "/";
    }
    load() { }

    initiate() {
        let el = document.createElement("a");
        el.href = this.link;
        this.getParent().appendChild(el);
        
        let element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content;
        el.appendChild(element);
        
    }
}

export {LegalPanel}