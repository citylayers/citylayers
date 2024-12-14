
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

    activate(value){
        let res = value==undefined || value == true ? false : true;
        console.log(res);
        this.getElement().disabled = res;
    }

    activateNext(nextids){
        if (nextids==undefined){
            return
        }
        if (tree.get(this.id)!=undefined){
            let nextid = nextids.get(this.id);
            if (nextid!=undefined){
                nextid = `qa-container_${nextid}`;
                document.getElementById(nextid).style.display=DISPLAY.FLEX;
            }
        }
    }

    action(ev, next){
        tree.add(this.id, ev.target.value);
        this.activateNext(tree, next);

    }

    initiate(nextid) {
        let element = this.init_input(nextid);
        this.init_extra(element);
    }

    init_input(nextid){
        let element = document.createElement(this.t);
        element.setAttribute('type', this.input_type);
        element.setAttribute('name', this.name);
        element.setAttribute("class", this.name);
        element.setAttribute("id", this.make_id());
        element.onchange = (ev)=>{
            this.action(ev, nextid)
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

    action(ev, next){
        this.activateNext(next);
        const file = ev.target.files[0];
        
        if (file) {
            
            const fileReader = new FileReader();
            // fileReader.onload = event => {
            //     this.image_src = event.target.result;
            // }
            fileReader.readAsDataURL(file);
            tree.add("image", file);
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
        this.components = [];
        this.elements = [];
    }

    activate(value){
        this.elements.forEach(s=>{
            s.activate(value);
        })
    }

    getElement() {
        return document.getElementById(`${this.name}_${this.id}`);
    }

    load(nextid) {
        this.elements = this.components.map((el, i) => {
            let element = new el(this.make_id(), this.id, 
                                 this.content instanceof Array ? this.content[i] : this.content);
            
            element instanceof InputElement ? element.initiate(nextid) : element.initiate();
            element instanceof InputContainer ? element.load(nextid) : element.load();
            return element;
        });
    }
}

class ImageInputContainer extends InputContainer {
    static name = CLASSNAMES.IMGINPUT_CONTAINER;
    constructor(parent, id){
        super(parent);
        this.content = ["", "or skip"];
        this.components = [ImageInputContainerElement, SpanElement];
    }
}

class TextInputContainer extends InputContainer {
    static name = CLASSNAMES.TEXTINPUT_CONTAINER;
    constructor(parent, id, content){
        super(parent, id);
        this.content = content;
        this.components = [TextInputElement];
    }
}

class ImageInputContainerElement extends InputContainer {
    constructor(parent, id){
        super(parent, id);
        this.name = CLASSNAMES.IMGINPUT_CONTAINER;
        this.components = [ImageInputElement, ImagePreviewElement, TextElement];
        this.content = ["", "", "Upload an image"];
    }
}

class RangeInputElement extends InputElement {
    static name = CLASSNAMES.RANGE_SLIDER;
    constructor(parent, id, content) {
        super(parent, id, content);
        this.content = content;
        let min = this.content.values ? this.content.values["min"] : 0;
        let max = this.content.values ? this.content.values["max"] : 100;
        this.values = new Map(
            [
                [RANGE_LABELS.MIN, min],
                [RANGE_LABELS.MAX, max],
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
        this.components = [SpanElement, SpanElement];
        this.content = content.labels ? [content.labels[RANGE_LABELS.MIN], content.labels[RANGE_LABELS.MAX]] : ["Less", "More"];
    }


}

class RangeContainerElement extends InputContainer {
    static name = CLASSNAMES.TAG_CONTAINER;
    constructor(parent, id, content){
        super(parent, id, content);
        this.components = [RangeInputElement, RangeLabelElement];
    }

}

class CheckboxContainerElement extends InputContainer {
    static name = CLASSNAMES.TAG_CONTAINER;
    constructor(parent, id, checks){
        super(parent, id, checks);
        this.content = checks;
        this.components = checks.map(c=>CheckboxElement);
    }
    activate(value){
        
        this.elements.forEach(s=>{
            s.activate(value);
        })
    }
    
}

class CheckboxElement extends InputContainer {
    static name = "tag selectable";
    constructor(parent, id, content){
        super(parent, content.id, content);
        this.content = content;
        this.components = [CheckboxInputElement, CheckboxLabelElement];
    }
    activate(value){
        
        this.elements.forEach(s=>{
            s.activate(value);
        })
    }
}

class CheckboxInputElement extends InputElement {
    static name = CLASSNAMES.TAG_LABEL;
    constructor(parent, id, content) {
        super(parent, id, content);
        this.input_type = INPUT_TYPES.CHECKBOX;
    }

    activate(value){
        let res = value==undefined || value == true ? false : true;
        this.getElement().disabled = res;
    }


    init_extra(element){
        };

    action(ev, next){
        tree.add(this.id, ev.target.checked);
        this.activateNext(next);

    }
}

class CheckboxLabelElement extends InputElement {
    static name = CLASSNAMES.TAG_LABEL;
    constructor(parent, id, content) {
        super(parent, id, content);
        this.content = content.name ? content.name : content;
        this.t = "div";
    }

    activate(value){
        let res = value==undefined || value == true ? false : true;
        this.getElement().disabled = res;
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



