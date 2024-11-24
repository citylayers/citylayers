
const INPUT_TYPES = {
    TEXT: "text",
    FILE: "file",
    RANGE: "range",
    CHECKBOX: "checkbox"
}

class InputElement extends CElement {
    static name = "input";
    constructor(parent, id, content) {
        super(parent, id, content);
        this.id = id;
        this.content = content; //content ? content.replaceAll("\\n", "<br>") : "";
        this.t = "input";
        this.input_type = INPUT_TYPES.TEXT;
    }
    load() { }

    activateNext(tree, nextids){
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

    action(ev, tree, next){
        tree.addAnswer(this.id, ev.target.value);
        this.activateNext(tree, next);

    }

    initiate(answerTree, nextid) {
        let element = this.init_input(answerTree, nextid);
        this.init_extra(element);
    }

    init_input(answerTree, nextid){
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
    init_extra(element){}
}

class TextInputElement extends InputElement {
    static name = CLASSNAMES.TEXT_INPUT;
    constructor(parent, id, content) {
        super(parent, id, content);
        this.t = "textarea";
        this.input_type = INPUT_TYPES.TEXT;
    }
    init_extra(element){
        element.setAttribute("placeholder", "Type your comment here");
    }

}

class ImageInputElement extends InputElement {
    static name = CLASSNAMES.IMG_INPUT;
    constructor(parent, name, content) {
        super(parent, name, content);
        this.input_type = INPUT_TYPES.FILE;
    }

    action(ev, tree, next){
        this.activateNext(tree, next);
        const file = ev.target.files[0];
        
        if (file) {
            
            const fileReader = new FileReader();
            // fileReader.onload = event => {
            //     this.image_src = event.target.result;
            // }
            fileReader.readAsDataURL(file);
            tree.addAnswer("image", file);
            // this.place_data["image"] = file;
        }

    }

    init_extra(element){
        element.setAttribute('accept', ".jpg, .png, .jpeg");
    }

}

class InputContainer extends ContentPanel {
    static name = CLASSNAMES.IMGINPUT_CONTAINER;
    constructor(parent, id, content){
        super(parent, id, content);
        this.content = content ? content : ["", "or skip"];
        this.elements = [];
    }

    

    getElement() {
        return document.getElementById(`${this.name}_${this.id}`);
    }

    load(answerTree, nextid) {
        this.elements.forEach((el, i) => {
            let element = new el(this.make_id(), this.id, 
                                 this.content instanceof Array ? this.content[i] : this.content);
                                 
            element instanceof InputElement ? element.initiate(answerTree, nextid) : element.initiate();
            element instanceof InputContainer ? element.load(answerTree, nextid) : element.load();
        });
    }
}

class ImageInputContainer extends InputContainer {
    static name = CLASSNAMES.IMGINPUT_CONTAINER;
    constructor(parent, id){
        super(parent);
        this.content = ["", "or skip"];
        this.elements = [ImageInputContainerElement, SpanElement];
    }
}

class TextInputContainer extends InputContainer {
    static name = CLASSNAMES.TEXTINPUT_CONTAINER;
    constructor(parent, id, content){
        super(parent, id);
        this.content = content;
        this.elements = [TextInputElement];
    }
}

class ImageInputContainerElement extends InputContainer {
    constructor(parent, id){
        super(parent, id);
        this.name = CLASSNAMES.IMGINPUT_CONTAINER;
        this.elements = [ImageInputElement, ImagePreviewElement, TextElement];
        this.content = ["", "", "Upload an image"];
    }
}

class RangeInputElement extends InputElement {
    static name = CLASSNAMES.RANGE_SLIDER;
    constructor(parent, id, content) {
        super(parent, id, content);
        this.content = content;
        this.values = new Map(
            [
                [RANGE_LABELS.MIN, this.content.values ? this.content.values["min"] : 0],
                [RANGE_LABELS.MAX, this.content.values ? this.content.values["max"] : 100],
            ]
        );
        this.input_type = INPUT_TYPES.RANGE;
    }

    init_extra(element){
        element.setAttribute('min', this.values.get(RANGE_LABELS.MIN).toString());
        element.setAttribute('max', this.values.get(RANGE_LABELS.MAX).toString());
    }

}

class RangeLabelElement extends InputContainer {
    static name = CLASSNAMES.RANGE_CONTAINER;
    constructor(parent, id, content) {
        super(parent, id, content);
        this.elements = [SpanElement, SpanElement];
        this.content = content.labels ? [content.labels[RANGE_LABELS.MIN], content.labels[RANGE_LABELS.MAX]] : ["Less", "More"];
    }


}

class RangeContainerElement extends InputContainer {
    static name = CLASSNAMES.TAG_CONTAINER;
    constructor(parent, id, content){
        super(parent, id, content);
        this.elements = [RangeInputElement, RangeLabelElement];
    }

}

class CheckboxContainerElement extends InputContainer {
    static name = CLASSNAMES.TAG_CONTAINER;
    constructor(parent, id, checks){
        super(parent, id, checks);
        this.content = checks;
        this.elements = checks.map(c=>CheckboxElement);
    }

    
}

class CheckboxElement extends InputContainer {
    static name = "tag selectable";
    constructor(parent, id, content){
        super(parent, content.id, content);
        this.content = content;
        this.elements = [CheckboxInputElement, CheckboxLabelElement];
    }
    make_id() {
        return `${this.name}_${this.id}_${this.content.name}`
    }
}

class CheckboxInputElement extends InputElement {
    static name = CLASSNAMES.TAG_LABEL;
    constructor(parent, id, content) {
        super(parent, id, content);
        this.input_type = INPUT_TYPES.CHECKBOX;
    }


    init_extra(element){
        };

    action(ev, tree, next){
        tree.addAnswer(this.id, ev.target.checked);
        this.activateNext(tree, next);

    }
}

class CheckboxLabelElement extends InputElement {
    static name = CLASSNAMES.TAG_LABEL;
    constructor(parent, id, content) {
        super(parent, id, content);
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