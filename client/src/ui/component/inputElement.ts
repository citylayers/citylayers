import { CLASSNAMES, DISPLAY, RANGE_LABELS } from "../../../classnames";
import {ContentPanel} from "../panel/contentPanel";
import {CElement} from "./celement";
// import { Illustration } from "../../../../logic/illustration";
import {ImageElement, ImagePreviewElement} from "./imageElement";
import {SpanElement} from "./spanElement";
import {TextElement} from "./textElement";
import {AnswerTree} from "../../../../logic/question/answerTree";

const INPUT_TYPES = {
    TEXT: "text",
    FILE: "file",
    RANGE: "range",
    CHECKBOX: "checkbox"
}

class InputElement extends CElement {
    id: string;
    parent: string;
    content: any;
    onclick: ()=>{};
    name: string;
    t: string;
    input_type: string;
    constructor(parent:string, id:string, content?:any) {
        super(parent, id, content);
        this.id = id;
        this.name = "input";
        this.content = content; //content ? content.replaceAll("\\n", "<br>") : "";
        this.t = "input";
        this.input_type = INPUT_TYPES.TEXT;
    }
    load() { }

    activateNext(tree:AnswerTree, nextids:Map<string, string>){
        if (nextids==undefined){
            return
        }
        if (tree.getAnswer(this.id)!=undefined){
            let nextid = nextids.get(this.id);
            if (nextid!=undefined){
                nextid = `qa-container_${nextid}`;
                document.getElementById(nextid).style.display=DISPLAY.FLEX;
            }
        }
    }

    action(ev:any, tree:AnswerTree, next:Map<string, string>){
        tree.addAnswer(this.id, ev.target.value);
        this.activateNext(tree, next);

    }

    initiate(answerTree:AnswerTree, nextid:Map<string, string>) {
        let element = this.init_input(answerTree, nextid);
        this.init_extra(element);
    }

    init_input(answerTree:AnswerTree, nextid:Map<string, string>){
        let element = document.createElement(this.t);
        element.setAttribute('type', this.input_type);
        element.setAttribute('name', this.name);
        element.setAttribute("class", this.name);
        element.setAttribute("id", this.make_id());
        element.onchange = (ev)=>{
            this.action(ev, answerTree, nextid)
        };
        this.getParent().appendChild(element);
        return element;

    }
    init_extra(element:HTMLElement){}
}

class TextInputElement extends InputElement {
    id: string;
    parent: string;
    content: any;
    onclick: ()=>{};
    name: string;
    t: string;
    input_type: string;
    constructor(parent:string, id:string, content?:any) {
        super(parent, id, content);
        this.name = CLASSNAMES.TEXT_INPUT;
        this.t = "textarea";
        this.input_type = INPUT_TYPES.TEXT;
    }
    init_extra(element:HTMLElement){
        element.setAttribute("placeholder", "Type your comment here");
    }

}

class ImageInputElement extends InputElement {
    id: string;
    parent: string;
    content: any;
    onclick: ()=>{};
    name: string;
    t: string;
    input_type: string;
    constructor(parent:string, id:string, content?:any) {
        super(parent, id, content);
        this.name = CLASSNAMES.IMG_INPUT;
        this.input_type = INPUT_TYPES.FILE;
    }

    action(ev:any, tree:AnswerTree, next:Map<string, string>){
        this.activateNext(tree, next);
        tree.addAnswer(this.id, ev.target.files[0]);
        // console.log(tree.content);
        // const file = e.target.files[0];
            //     if (file) {
            //         const fileReader = new FileReader();
            //         fileReader.onload = event => {
            //             this.image_src = event.target.result;
                        
            //         }
            //         fileReader.readAsDataURL(file);
            //         this.place_data["image"] = file;
                    
            //     }

    }

    init_extra(element:HTMLElement){
        element.setAttribute('accept', ".jpg, .png, .jpeg");
    }

}

class InputContainer extends ContentPanel {
    id: string;
    parent: string;
    content: any;
    onclick: ()=>{};
    name: string;
    elements: any[]; 
    constructor(parent:string, id:string, content?:any){
        super(parent, id, content);
        this.name = CLASSNAMES.IMGINPUT_CONTAINER;
        this.content = content ? content : ["", "or skip"];
        this.elements = [];
    }

    getElement() {
        return document.getElementById(`${this.name}_${this.id}`);
    }

    load_(answerTree:AnswerTree, nextid:Map<string, string>) {
        this.elements.forEach((el, i) => {
            let element = new el(this.make_id(), this.id, 
                                 this.content instanceof Array ? this.content[i] : this.content);
                                 
            element instanceof InputElement ? element.initiate(answerTree, nextid) : element.initiate();
            element instanceof InputContainer ? element.load_(answerTree, nextid) : element.load();
        });
    }
}

class ImageInputContainer extends InputContainer {
    id: string;
    parent: string;
    content: string[];
    name: string;
    elements: typeof CElement[]; 
    constructor(parent:string, id:string){
        super(parent, id);
        this.content = ["", "or skip"];
        this.name = CLASSNAMES.IMGINPUT_CONTAINER;
        this.elements = [ImageInputContainerElement, SpanElement];
    }
}

class TextInputContainer extends InputContainer {
    id: string;
    parent: string;
    content: string[];
    name: string;
    elements: typeof CElement[]; 
    constructor(parent:string, id:string, content?:any){
        super(parent, id);
        this.name = CLASSNAMES.TEXTINPUT_CONTAINER;
        this.content = content;
        this.elements = [TextInputElement];
    }
}

class ImageInputContainerElement extends InputContainer {
    id: string;
    parent: string;
    content: string[];
    name: string;
    elements: any[]; 
    constructor(parent:string, id:string){
        super(parent, id);
        this.name = CLASSNAMES.IMGINPUT_CONTAINER;
        this.elements = [ImageInputElement, ImagePreviewElement, TextElement];
        this.content = ["", "", "Upload an image"];
    }
}

class RangeInputElement extends InputElement {
    id: string;
    parent: string;
    content: any;
    name: string;
    elements: any[]; 
    values: Map<string, Number>;
    constructor(parent:string, id?:string, content?:any) {
        super(parent, id, content);
        this.name = CLASSNAMES.RANGE_SLIDER;
        this.content = content;
        this.values = new Map(
            [
                [RANGE_LABELS.MIN, this.content.value ? this.content.value["min"] : 0],
                [RANGE_LABELS.MAX, this.content.value ? this.content.value["max"] : 100],
            ]
        );
        this.input_type = INPUT_TYPES.RANGE;
    }

    init_extra(element:HTMLElement){
        element.setAttribute('min', this.values.get(RANGE_LABELS.MIN).toString());
        element.setAttribute('max', this.values.get(RANGE_LABELS.MAX).toString());
    }

}

class RangeLabelElement extends InputContainer {
    id: string;
    parent: string;
    content: any;
    name: string;
    elements: any[]; 
    values: Map<string, Number>;
    constructor(parent:string, id:string, content?:any) {
        super(parent, id, content);
        this.name = CLASSNAMES.RANGE_CONTAINER;
        this.elements = [SpanElement, SpanElement];
        this.content = content.label ? [content.label[RANGE_LABELS.MIN], content.label[RANGE_LABELS.MAX]] : ["Less", "More"];
    }


}

class RangeContainerElement extends InputContainer {
    id: string;
    parent: string;
    content: any;
    name: string;
    elements: any[]; 
    constructor(parent:string, id:string, content?:any){
        super(parent, id, content);
        this.name = CLASSNAMES.TAG_CONTAINER;
        this.elements = [RangeInputElement, RangeLabelElement];
    }

}

class CheckboxContainerElement extends InputContainer {
    id: string;
    parent: string;
    content: any;
    name: string;
    elements: typeof CheckboxElement[]; 
    
    constructor(parent:string, id:string, checks:any[]){
        super(parent, id, checks);
        this.name = CLASSNAMES.TAG_CONTAINER;
        this.content = checks;
        this.elements = checks.map(c=>CheckboxElement);
    }

    
}

class CheckboxElement extends InputContainer {
    
    id: string;
    parent: string;
    content: any;
    name: string;
    elements: any[]; 
    constructor(parent:string, id:string, content?:any){
        super(parent, content.id, content);
        this.name = "tag selectable";
        this.content = content;
        this.elements = [CheckboxInputElement, CheckboxLabelElement];
    }
    make_id():string {
        return `${this.name}_${this.id}_${this.content.name}`
    }

}

class CheckboxInputElement extends InputElement {
    id: string;
    parent: string;
    content: any;
    name: string;
    constructor(parent:string, id:string, content:any) {
        super(parent, id, content);
        this.name = CLASSNAMES.TAG_LABEL;
        this.input_type = INPUT_TYPES.CHECKBOX;
    }
    init_extra(element:HTMLElement){
        };
}

class CheckboxLabelElement extends InputElement {
    id: string;
    parent: string;
    content: any;
    name: string; 
    constructor(parent:string, id:string, content:any) {
        super(parent, id, content);
        this.name = CLASSNAMES.TAG_LABEL;
        this.content = content.name ? content.name : content;
        this.t = "div";
    }

    initiate() {
        let element = document.createElement(this.t);
        element.setAttribute("class", this.name);
        this.getParent().appendChild(element);

        let element1 = document.createElement("label");
        element1.setAttribute("class", this.name);
        element1.innerHTML = this.content;
        element.appendChild(element1);
    }

}

export {InputContainer, TextInputContainer, ImageInputContainerElement,
    ImageInputContainer, RangeContainerElement, CheckboxContainerElement}