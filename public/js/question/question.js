class QASet{
    constructor(step, content){
        this.step = step;
        this.content = content ? content : [];
    }
    add(qapair){
        this.content.push(qapair);
        this.setPrevs(qapair);

    }

    setPrevs(qapair){
        
        let prevs = this.content.filter(qp=>qp.answer.getIds().includes(qapair.prev_id));
        prevs.forEach(pr=>{pr.setNext(qapair.prev_id, qapair.answer.id)});
    }

    convertContent(){
        
        this.content = this.content.map(qa => new QAPair(qa.question, qa.answer, qa.prev_id));
        this.content.forEach(qa => {
            qa.convertContent();
        });
        this.content.forEach(qa => {
            this.setPrevs(qa);
        });
    }
}

class QAPair{
    constructor(question, answer, prev_id){
        this.question = question;
        this.step = question.step;
        this.answer = answer;
        this.prev_id = prev_id;
        this.next_ids = new Map();
        this.element = QAContainer;
        this.e = undefined;
    }

    initiate(parent_id){
        this.e = new QAContainer(parent_id, this.answer.id, this);
        this.e.initiate();
    }

    make(parent_id, display, tree){
        this.e.load(tree, this.next_ids, display);
    }

    setNext(prev, next){
        this.next_ids.set(prev, next)
    }
    
    convertContent(){
        this.question = Question.fromNode(this.question);
        this.answer = AnswerParser.fromNode(this.answer);
        
    }
}

class KartaPair{
    constructor(question, answer, prev_id){
        
        this.step = 0;
        this.prev_id = undefined;
        this.next_ids = new Map();
        this.element = KartaPanel;
        this.e = undefined;
    }

    initiate(parent_id){
        this.e = new KartaPanel(parent_id);
        this.e.initiate();
        this.e.load();
    }

    make(parent_id, display, tree){
        this.e.show(display);
    }

    setNext(prev, next){
    }
    
    convertContent(){
        
        
    }
}

class Answer{
    constructor(id, content){
        this.id = id;
        this.content = content;
        this.answer = TextInputContainer;
        this.element = undefined;
    }

    static fromNode(node){
        return new Answer(node.id, node.atype);
    }

    getIds(){
        return [this.id];
    }

    make(parent_id, tree, nextids){
        if (this.element==undefined){
            this.element = new this.answer(parent_id, this.id, this.content);
            this.element.initiate();
            this.element.load(tree, nextids);
        }

        // this.element.show(display);
        
        return this.element;
    }
    empty(){
        return "";
    }
}

class Question{
    constructor(id, content, help, step){
        this.id = id;
        this.help = help ? help : "";
        // this.step = step ? step : 0;
        this.content = content;
        this.element = undefined;
        // this.answer = answer;
    }

    static fromNode(node){
        let q = new Question(node.id, node.content, node.help);
        return q;
    }

    make(parent_id){   
        this.element = this.element==undefined ? this._make(parent_id) : this.element;
        // this.element.show(display);
    }

    _make(parent_id){
        let el = new QuestionContainer(parent_id, this.id, [this.content, this.help]);
        el.initiate();
        el.load();
        return el;
    }

    
}

class AnswerBool extends Answer{
    constructor(id, content){
        super(id, content);
    }
    empty(){
        return false;
    }

    
}

class AnswerCategorical extends Answer{
    constructor( id, content){
        super( id, content);
    }
    empty(){
        return -1;
    }

}

class AnswerMultiCategorical extends Answer{
    constructor(id, content){
        super(id, content);
        this.answer = CheckboxContainerElement;
        this.content = content.content;
    }

    getIds(){
        return this.content.map(e=>e.id);
    }

    static fromNode(node){
        let q = new AnswerMultiCategorical(node.id, node);
        return q;
    }
    empty(){
        return [];
    }
}

class AnswerRange extends Answer{
    constructor(id, content){
        super( id, content);
        this.answer = RangeContainerElement;
        this.labels = content.labels;
        this.values = content.values;
    }
    static fromNode(node){
        return new AnswerRange(node.id, node);
    }
    empty(){
        return -1;
    }
}

class AnswerImage extends Answer{
    constructor( id, content){
        super( id, content);
        this.answer = ImageInputContainerElement;
    }

    static fromNode(node){
        let q = new AnswerImage(node.id, node.atype);
        return q;
    }
}

class AnswerText extends Answer{
    constructor( id, content){
        super(id, content);
    }
    static fromNode(node){
        let q = new AnswerText(node.id, node.atype);
        return q;
    }
}