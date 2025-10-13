import { ContentPanel } from "../panel/contentPanel";
import { LineLogo } from "../component/logo";
import { CLASSNAMES, DISPLAY } from "../../constants/ClassNames";
import { CButton } from "../component/cbutton";
import { HrElement } from "../component/hrElement";
import { CElement } from "../component/celement";
import { AnswerTree } from "../../../../logic/question/answerTree";
import { QAPair, QASet } from "../../../../logic/question/question";
import { TextElement } from "../component/textElement";

class QHeader extends ContentPanel{
    constructor(parent:string){
        super(parent, "");
        this.name = CLASSNAMES.Q_HEADER;
        this.elements = [LineLogo, ExitButton];
    }

    load() {
        this.elements.forEach(el => {
            let element = new el(this.make_id(), this.parent);
            element.initiate();
            element.load();
        });
    }
}

class ExitButton extends CButton{
    
    constructor(parent:string) {
        let onclick = ()=>{};
        super(parent, onclick);
        this.name = "exit-button";
        this.content = "Save and Exit"; // U+02715
    }
}

class QFooter extends ContentPanel{
    steps: number;

    // static steps = 0
    constructor(parent:string, id: string, steps:number){
        super(parent, "qfooter");
        this.name = CLASSNAMES.Q_FOOTER;
        this.elements = [Steps, HrElement, NavButtons];
        this.steps = steps;
    }
    load(onclicks:string[]) {
        this.elements.forEach(el => {
           
            let element = new el(this.make_id(), "", el==NavButtons ? onclicks : this.steps);
            element.initiate();
            element.load();
        });
        QFooter.reload(0, this.steps);
    }

    static reload(step:number, totalSteps:number) {
        NavButtons.reload(step, totalSteps);
    }
}




class BackButton extends CButton{
    
    constructor(parent:string, id: string, onclick:()=>{}) {
        // let onclick = ()=>{};
        super(parent, onclick);
        this.name = CLASSNAMES.BACK;
        this.content = "Back"; // U+02715
    }
}

class NextButton extends CButton{
    
    constructor(parent:string, id:string, onclick:()=>{}) {
        // let onclick = ()=>{};
        super(parent, onclick);
        this.name = CLASSNAMES.NEXT;
        this.content = "Next"; // U+02715
    }
}

class SubmitButton extends CButton{
    
    constructor(parent:string, id:string, onclick:()=>{}) {
        // let onclick = ()=>{};
        super(parent, onclick);
        this.name = CLASSNAMES.SUBMIT;
        this.content = "Submit"; // U+02715
    }
}


class NavButtons extends ContentPanel{
    args: any[];
    constructor(parent:string, id: string="", onclicks:any[]=[]){
        super(parent, id);
        this.elements = [BackButton, NextButton, SubmitButton];
        this.name = CLASSNAMES.NAV;
        this.args = onclicks;
    }

    load() {
        this.elements.forEach((el, i) => {
            let element = new el(this.make_id(), "", this.args[i]);
            element.initiate();
            element.load();
        });
    }
    static getButton(name:string){
        let el = document.getElementsByClassName(name);
        if (el.length>0){
            return el[0];
        }
    }

    static buttonConditions = new Map<string, (step:number, steps:number)=>boolean>([
        [BackButton.name, (step, steps)=>{return step==0}],
        [NextButton.name, (step, steps)=>{return step==steps}],
        [SubmitButton.name,(step, steps)=>{return step!=steps}]
    ]);

    static reload(step:number, steps:number) {

        [BackButton, NextButton, SubmitButton].forEach(
            b=>{
                let bb = b.getElements();
                if (bb.length>0){
                    let cond = this.buttonConditions.get(b.name);
                    let ba = bb[0] as HTMLElement;
                    ba.style.display = cond(step, steps) ? DISPLAY.NONE : DISPLAY.BLOCKINLINE;
                }
            }
        )
        
        // let bb = BackButton.getElements();
        // if (bb.length>0){
        //     bb[0].style.display = step==0 ? DISPLAY.NONE : DISPLAY.FLEX;
        // }

        // let nb = NextButton.getElements();
        // if (nb.length>0){
        //     nb[0].style.display = step==steps ? DISPLAY.NONE : DISPLAY.FLEX;
        // }
        // let sb = SubmitButton.getElements();
        // if (sb.length>0){
        //     sb[0].style.display = step!=steps ? DISPLAY.NONE : DISPLAY.FLEX;
        // }
        
    }
}

class Steps extends CElement{
    constructor(parent:string) {
        super(parent);
        this.name = "steps";
        this.content = "";
    }
    load() { }
    
}

class QContainer extends ContentPanel{
    
    tree: AnswerTree;

    constructor(parent:string,id:string, content?:any){
        super(parent, CLASSNAMES.Q_CONTAINER);
        this.name = CLASSNAMES.Q_CONTAINER;
        this.content = content[0];  // QASet[]
        this.elements = [QContainer];
        this.tree = content[1];
    }

    load(c:any, a:any){
        this.load_(c, a);
    }

    load_(step:number, display:boolean) {        
        
        this.content.forEach((qs:QASet, i:number)=>{
            qs.content.forEach(
            (qa, j)=>qa.make(this.make_id(), (i==step-1 && (j==0 || this.tree.get(qa.prev_id)!=undefined)

            ), this.tree))
        }
    );
    }
}

class QuestionContainer extends ContentPanel{
    
    constructor(parent, id, content){
        super(parent, id);
        this.name = CLASSNAMES.QUESTION_CONTAINER;
        this.content = content;  // QASet[]
        this.elements = [TextElement, TextElement];
    }

    makeHelp(parent_id){
        let el = new TextElement(parent_id, this.id, this.content[1]);
        el.initiate();
        el.load();
        return el;
    }

    makeQuestion(parent_id){
        let el = new TextElement(parent_id, this.id, this.content[0]);
        el.initiate();
        el.load();
        return el;
    }

    load() {        
        this.makeQuestion(this.make_id());
        this.makeHelp(this.make_id());
    }

    show(display){
        this.getElement().style.display = display==false ? "none" : "flex";
    }
}

class QAContainer extends ContentPanel{
    
    constructor(parent:string, id:string, content:QAPair){
        super(parent, id, content);
        this.name = CLASSNAMES.QA_CONTAINER;
        this.elements = [];
    }

    load_(tree:AnswerTree, next_ids:Map<string, string>, display:boolean) {    
        this.content.question.make(this.make_id());
        this.content.answer.make(this.make_id(), tree, next_ids);
        this.show(display);
    }

    show(display:boolean){
        this.getElement().style.display = display==false ? DISPLAY.NONE : DISPLAY.FLEX;
    }
}

class QContainer_ extends ContentPanel{
    constructor(parent:string, content?:any){
        super(parent, "");
        this.name = CLASSNAMES.Q_PAGE;
        this.content = content;
        // this.answerTree = answerTree;
    }

    load_(step:number) {        
        this.content.forEach((qa, i)=>qa.make(this.make_id(), i==step-1));
    }
}

// class QContainerLeg extends ContentPanel{
//     tree: AnswerTree;
//     constructor(parent, qtree, tree:AnswerTree){
//         super(parent, "question-container");
//         this.name = CLASSNAMES.Q_CONTAINER;
//         this.content = qtree;
//         this.tree = tree;
//     }

//     load(aspect) {        
//             this.content.questions.filter(q=>this.content.q_locs
//                                         .filter(q=>q.aspect_id==aspect)
//                                         .map(q=>q.question_id)
//                                         .includes(q.id))
//                                   .forEach((question, i)=>question.make(this.make_id(), 
//                                                                         this.answerTree, 
//                                                                         this.content.questions[i+1].id, 
//                                                                         i==0)
//     );
//     }
// }

export {QContainer, QAContainer, QFooter, QHeader, QuestionContainer};