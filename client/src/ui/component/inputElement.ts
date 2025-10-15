import { CLASSNAMES, DISPLAY, RANGE_LABELS, ClassName } from "../../constants/ClassNames";
import {ContentPanel} from "../panel/contentPanel";
import {BaseComponent} from "./BaseComponent";
// import { Illustration } from '../../../../src/logic/illustration';
import {ImageElement, ImagePreviewElement} from "./imageElement";
import {SpanElement} from "./spanElement";
import {TextElement} from "./textElement";
import {AnswerTree} from '../../../../src/logic/question/answerTree';

const INPUT_TYPES = {
    TEXT: "text",
    FILE: "file",
    RANGE: "range",
    CHECKBOX: "checkbox"
}

/**
 * Input element base class for form inputs.
 * Extends BaseComponent with custom initiation pattern for questionnaire logic.
 */
class InputElement extends BaseComponent {
    protected answerTree: AnswerTree | null;
    protected nextIds: Map<string, string> | null;
    protected elementTag: string;
    protected inputType: string;
    protected changeHandler: (ev: Event) => void;

    constructor(parent: string, id: string, content?: any) {
        super(parent, "input", id, content);
        this.answerTree = null;
        this.nextIds = null;
        this.elementTag = "input";
        this.inputType = INPUT_TYPES.TEXT;
        this.changeHandler = (ev: Event) => {
            if (this.answerTree && this.nextIds) {
                this.action(ev, this.answerTree, this.nextIds);
            }
        };
    }

    /**
     * Custom initiation for InputElement that accepts answerTree and nextIds.
     * This maintains backward compatibility with questionnaire logic.
     */
    initiate(answerTree?: AnswerTree, nextid?: Map<string, string>): void {
        if (answerTree && nextid) {
            this.answerTree = answerTree;
            this.nextIds = nextid;
        }
        super.initiate();
    }

    protected getElementTag(): string {
        return this.elementTag;
    }

    protected createElement(): HTMLElement {
        const element = document.createElement(this.elementTag);
        element.setAttribute('type', this.inputType);
        element.setAttribute('name', this.className);
        element.setAttribute('class', this.className);
        element.setAttribute('id', this.makeId());

        const parent = this.getParent();
        if (parent) {
            parent.appendChild(element);
        }

        return element;
    }

    protected afterInit(): void {
        this.addEventListener('change', this.changeHandler);
        const element = this.getElement();
        if (element) {
            this.initExtra(element);
        }
    }

    /**
     * Template method for subclasses to add extra initialization.
     * Override this in subclasses to customize element attributes.
     */
    protected initExtra(element: HTMLElement): void {
        // To be overridden by subclasses
    }

    protected activateNext(tree: AnswerTree, nextids: Map<string, string>): void {
        if (nextids === undefined) {
            return;
        }
        if (tree.get(this.id) !== undefined) {
            let nextid = nextids.get(this.id);
            if (nextid !== undefined) {
                nextid = `qa-container_${nextid}`;
                const nextElement = document.getElementById(nextid);
                if (nextElement) {
                    nextElement.style.display = DISPLAY.FLEX;
                }
            }
        }
    }

    protected action(ev: any, tree: AnswerTree, next: Map<string, string>): void {
        tree.add(this.id, ev.target.value);
        this.activateNext(tree, next);
    }
}

class TextInputElement extends InputElement {
    constructor(parent: string, id: string, content?: any) {
        super(parent, id, content);
        this.className = CLASSNAMES.TEXT_INPUT;
        this.elementTag = "textarea";
        this.inputType = INPUT_TYPES.TEXT;
    }

    protected initExtra(element: HTMLElement): void {
        element.setAttribute("placeholder", "Type your comment here");
    }
}

class ImageInputElement extends InputElement {
    constructor(parent: string, id: string, content?: any) {
        super(parent, id, content);
        this.className = CLASSNAMES.IMG_INPUT;
        this.inputType = INPUT_TYPES.FILE;
    }

    protected action(ev: any, tree: AnswerTree, next: Map<string, string>): void {
        this.activateNext(tree, next);
        tree.add(this.id, ev.target.files[0]);
    }

    protected initExtra(element: HTMLElement): void {
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
            let element = new el(this.makeId(), this.id, 
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
    elements: any[];
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
    elements: any[];
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
    private values: Map<string, Number>;

    constructor(parent: string, id?: string, content?: any) {
        super(parent, id, content);
        this.className = CLASSNAMES.RANGE_SLIDER;
        this.values = new Map([
            [RANGE_LABELS.MIN, this.content?.value ? this.content.value["min"] : 0],
            [RANGE_LABELS.MAX, this.content?.value ? this.content.value["max"] : 100],
        ]);
        this.inputType = INPUT_TYPES.RANGE;
    }

    protected initExtra(element: HTMLElement): void {
        element.setAttribute('min', this.values.get(RANGE_LABELS.MIN)?.toString() || '0');
        element.setAttribute('max', this.values.get(RANGE_LABELS.MAX)?.toString() || '100');
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
    constructor(parent: string, id: string, content: any) {
        super(parent, id, content);
        this.className = CLASSNAMES.TAG_LABEL;
        this.inputType = INPUT_TYPES.CHECKBOX;
    }

    protected initExtra(element: HTMLElement): void {
        // No extra initialization needed
    }
}

class CheckboxLabelElement extends InputElement {
    constructor(parent: string, id: string, content: any) {
        super(parent, id, content);
        this.className = CLASSNAMES.TAG_LABEL;
        this.content = content?.name ? content.name : content;
        this.elementTag = "div";
    }

    protected createElement(): HTMLElement {
        const element = document.createElement(this.elementTag);
        element.setAttribute("class", this.className);
        element.setAttribute("id", this.makeId());

        const parent = this.getParent();
        if (parent) {
            parent.appendChild(element);
        }

        return element;
    }

    protected afterInit(): void {
        // Don't add change listener for label elements
        const element = this.getElement();
        if (element) {
            const label = document.createElement("label");
            label.setAttribute("class", this.className);
            label.innerHTML = this.content;
            element.appendChild(label);
        }
    }
}

export {InputContainer, TextInputContainer, ImageInputContainerElement, RangeInputElement,
    ImageInputContainer, RangeContainerElement, CheckboxContainerElement}