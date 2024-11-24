// import { CElement } from "../ui/component/celement";
// import { TextInputContainer, ImageInputContainer, ImageInputContainerElement, 
//     RangeContainerElement, CheckboxContainerElement, 
//     InputContainer} from "../ui/component/inputElement";

import { AnswerTree } from "./answerTree";
// import { QAContainer, QuestionContainer } from "../ui/panelcomponent/question";
import { AnswerParser, ANSWERS } from "../../server/src/parser/question";

class QASet{
    step: number;
    content: QAPair[];
    constructor(step:number, content:QAPair[]){
        this.step = step;
        this.content = content ? content : [];
    }
    add(qapair:QAPair){
        this.content.push(qapair);
        let prevs = this.content.filter(qp=>qp.answer.getIds().includes(qapair.prev_id));
        prevs.forEach(pr=>{pr.setNext(qapair.prev_id, qapair.answer.id)});

    }

    convertContent(){
        
        this.content = this.content.map(qa => new QAPair(qa.question, qa.answer));
        this.content.forEach(qa => qa.convertContent());
    }
}

class QAPair{
    question: Question;
    answer: Answer;
    step: number;
    prev_id: string;
    next_ids: Map<string, string>
    // element: typeof CElement;
    constructor(question:Question, answer:Answer, prev_id?:string){
        this.question = question;
        this.step = question.step;
        this.answer = answer;
        this.prev_id = prev_id;
        this.next_ids = new Map();
        // this.element = QAContainer;
    }

    make(parent_id:string, display:boolean, tree:AnswerTree){
        // let e = new QAContainer(parent_id, this.answer.id, this);
        // e.initiate();
        // e.load_(tree, this.next_ids, display);
    }

    setNext(prev:string, next:string){
        this.next_ids.set(prev, next)
    }
    
    convertContent(){
        
        this.question = Question.fromNode(this.question);
        this.answer = AnswerParser.fromNode(this.answer);
        
    }
}

class Answer{
    id: string;
    content: any;
    type: string;
    // answer: typeof InputContainer;
    // element: InputContainer;
    constructor(id:string, content:any){
        this.id = id;
        this.content = content;
        this.type = ANSWERS.TEXT;
        // this.answer = TextInputContainer;
        // this.element = undefined;
    }

    static fromNode(node:any){
        return new Answer(node.id, node.atype);
    }

    getIds():string[]{
        return [this.id];
    }

    // make(parent_id:string, tree:AnswerTree, nextids:Map<string, string>){
    //     if (this.element==undefined){
    //         this.element = new this.answer(parent_id, this.id, this.content);
    //         this.element.initiate();
    //         this.element.load_(tree, nextids);
    //     }

    //     // this.element.show(display);
        
    //     return this.element;
    // }
    empty():any{
        return "";
    }
}

class Question{
    id: string;
    content: string;
    step: number;
    help: string;
    
    // element:CElement;
    constructor(id:string, content:string, help:string, step?:number){
        this.id = id;
        this.help = help ? help : "";
        this.step = step ? step : 0;
        this.content = content;
        // this.element = undefined;
        // this.answer = answer;
    }

    static fromNode(node:any){
        return new Question(node.id, node.value, node.help, node.step ? node.step : 0);
    }

    // make(parent_id:string){   
    //     this.element = this.element==undefined ? this._make(parent_id) : this.element;
    //     // this.element.show(display);
    // }

    // _make(parent_id:string){
    //     let el = new QuestionContainer(parent_id, this.id, [this.content, this.help]);
    //     el.initiate();
    //     el.load();
    //     return el;
    // }

    
}

class AnswerBool extends Answer{
    constructor(id:string, content:any){
        super(id, content);
        this.type = ANSWERS.BOOL;
    }
    empty():any{
        return false;
    }

    
}

class AnswerCategorical extends Answer{
    constructor( id:string, content:any){
        super( id, content);
        this.type = ANSWERS.CATEGORY;
    }
    empty(){
        return -1;
    }

}

class AnswerMultiCategorical extends Answer{
    constructor(id:string, content:any){
        super(id, content);
        // this.answer = CheckboxContainerElement;
        this.content = content.content;
        this.type = ANSWERS.MULTICATEGORY;
    }

    getIds(){
        return this.content.map(e=>e.id);
    }

    static fromNode(node:any){
        let q = new AnswerMultiCategorical(node.id, node);
        return q;
    }
    empty(){
        return [];
    }
}



class AnswerRange extends Answer{
    labels: Map<string, number>;
    values: Map<string, number>;
    constructor(id:string, content:any){
        super( id, content);
        // this.answer = RangeContainerElement;
        this.labels = content.label;
        this.values = content.value;
        this.type = ANSWERS.RANGE;
    }
    static fromNode(node){
        return new AnswerRange(node.id, node);
    }
    empty(){
        return -1;
    }
}

class AnswerImage extends Answer{
    constructor( id:string, content:any){
        super( id, content);
        this.type = ANSWERS.IMAGE;
        // this.answer = ImageInputContainerElement;
    }

    static fromNode(node:any){
        return new AnswerImage(node.id, node.atype);
        
    }
}

class AnswerText extends Answer{
    constructor( id:string, content:any){
        super(id, content);
        this.type = ANSWERS.TEXT;
    }
    static fromNode(node:any){
        let q = new AnswerText(node.id, node.atype);
        return q;
    }
}

export {Question, Answer, AnswerImage, AnswerText, 
    AnswerRange, AnswerMultiCategorical,
    QAPair, QASet, AnswerCategorical, AnswerBool
}