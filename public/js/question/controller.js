
class Controller{
    constructor(id, content){
        this.id = id;
        this.content = content;
        this.answer = TextInputContainer;
        this.element = undefined;
    }

    static fromNode(node){
        return new Controller(node.id, node.atype);
    }

    activate(on){
        this.element.activate(on);
    }

    getIds(){
        return [this.id];
    }

    make(parent_id, nextids){
        if (this.element==undefined){
            this.element = new this.answer(parent_id, this.id, this.content);
            this.element.initiate();
            this.element.load(nextids);
        }

        // this.element.show(display);
        
        return this.element;
    }
    empty(){
        return "";
    }
}


class ControllerBool extends Controller{
    constructor(id, content){
        super(id, content);
    }
    empty(){
        return false;
    }

    
}

class ControllerCategorical extends Controller{
    constructor( id, content){
        super( id, content);
    }
    empty(){
        return -1;
    }

}

class ControllerMultiCategorical extends Controller{
    constructor(id, content){
        super(id, content);
        this.answer = CheckboxContainerElement;
        this.content = content.content;
    }

    getIds(){
        return this.content.map(e=>e.id);
    }

    static fromNode(node){
        let q = new ControllerMultiCategorical(node.id, node);
        return q;
    }
    empty(){
        return [];
    }
}

class ControllerRange extends Controller{
    constructor(id, content){
        super( id, content);
        this.answer = DoubleRangeContainerElement; //RangeContainerElement;
        this.labels = content.labels;
        this.values = content.values;
    }
    static fromNode(node){
        return new ControllerRange(node.id, node);
    }
    empty(){
        return -1;
    }
}

class ControllerImage extends Controller{
    constructor( id, content){
        super( id, content);
        this.answer = ImageInputContainerElement;
    }

    static fromNode(node){
        let q = new ControllerImage(node.id, node.atype);
        return q;
    }
}

class ControllerText extends Controller{
    constructor( id, content){
        super(id, content);
    }
    static fromNode(node){
        let q = new ControllerText(node.id, node.atype);
        return q;
    }
}