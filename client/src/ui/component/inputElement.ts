


// import { Illustration } from '../../../../src/logic/illustration';




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
    protected answerTree:any | null;
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
            // Note: answerTree/nextIds are only used for pin page question flow
            // Map page sliders don't use this mechanism
        };
    }

    /**
     * Custom initiation for InputElement that accepts answerTree and nextIds.
     * This maintains backward compatibility with questionnaire logic.
     */
    initiate(answerTree?:any, nextid?: Map<string, string>): void {
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

    protected activateNext(tree:any, nextids: Map<string, string>): void {
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

    protected action(ev: any, tree:any, next: Map<string, string>): void {
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

    protected action(ev: any, tree:any, next: Map<string, string>): void {
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

    /**
     * Public load method that matches Answer.make() call signature: load(nextids, tree)
     * Swaps parameters and delegates to load_() for proper initialization
     */
    load(nextids?: any, answerTree?: any): void {
        this.load_(answerTree, nextids);
    }

    load_(answerTree:any, nextid:Map<string, string>): void {
        this.elements.forEach((el, i) => {
            let element = new el(this.makeId(), this.id,
                                 this.content instanceof Array ? this.content[i] : this.content);

            // For InputElement instances, pass answerTree and nextid during initiate
            if (element instanceof InputElement) {
                element.initiate(answerTree, nextid);
            } else {
                element.initiate();
            }

            // For InputContainer instances, pass them during load_
            if (element instanceof InputContainer) {
                element.load_(answerTree, nextid);
            } else {
                element.load();
            }
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

    /**
     * Override afterInit to use 'input' event instead of 'change' for real-time updates
     */
    protected afterInit(): void {
        // Range inputs need 'input' event for real-time updates, not 'change'
        this.addEventListener('input', this.changeHandler);
        const element = this.getElement();
        if (element) {
            this.initExtra(element);
        }
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
        this.content = (content && content.labels) ? [content.labels[RANGE_LABELS.MIN], content.labels[RANGE_LABELS.MAX]] : ["Less", "More"];
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

    load(nextids?: any, answerTree?: any): void {
        // Create CheckboxElement for each checkbox data item
        this.content.forEach((checkData: any, index: number) => {
            let element = new CheckboxElement(this.makeId(), this.id, checkData);
            element.initiate();
            element.load(nextids, answerTree);
        });
    }

    /**
     * Activate or deactivate all checkboxes
     */
    activate(on: boolean): void {
        // Checkboxes don't need activation logic for the map page
        // This is a placeholder to satisfy the Controller interface
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

    load(nextids?: any, answerTree?: any): void {
        // Pass this.content to both the checkbox input and label
        this.elements.forEach(ElementClass => {
            let element = new ElementClass(this.makeId(), this.id, this.content);
            // Pass answerTree and nextids to InputElement instances (CheckboxInputElement)
            element instanceof InputElement ? element.initiate(answerTree, nextids) : element.initiate();
            element.load();
        });
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

    protected action(ev: any, tree: any, next: Map<string, string>): void {
        // Use checked state instead of value for checkboxes
        const checked = ev.target.checked;
        console.log(`Checkbox action: id=${this.id}, checked=${checked}`);
        tree.add(this.id, checked);
        console.log(`Tree after checkbox:`, tree.out());
        this.activateNext(tree, next);

        // Reload current step to show/hide followup questions based on updated tree
        const QPanel = (window as any).QPanel;
        if (QPanel && QPanel.controller) {
            console.log(`Reloading step ${QPanel.currentStep} to show followup questions`);
            QPanel.controller.load(QPanel.currentStep);
        }
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

class SingleChoiceInputElement extends InputElement {
    constructor(parent: string, id?: string, content?: any) {
        super(parent, id, content);
        this.className = "input";
        this.inputType = "radio";
        this.changeHandler = content;
    }

    protected createElement(): HTMLElement {
        const element = document.createElement("input");
        element.setAttribute('type', this.inputType);
        element.setAttribute('name', 'vis-choice');
        element.setAttribute('class', this.className);
        element.setAttribute('id', this.makeId());

        const parent = this.getParent();
        if (parent) {
            parent.appendChild(element);
        }

        return element;
    }

    protected afterInit(): void {
        const element = this.getElement();
        if (element && typeof this.changeHandler === 'function') {
            element.addEventListener('change', this.changeHandler);
        }
    }
}

