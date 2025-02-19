

class QHeader extends ContentPanel{
    constructor(parent){
        super(parent, "qheader");
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
    
    constructor(parent) {
        let onclick = ()=>{};
        super(parent, "id", onclick);
        this.name = "exit-button";
        this.content = "Save and Exit"; // U+02715
        // this.onclick = onclick ? onclick : () => { };
    }
}

class QFooter extends ContentPanel{
    // static steps = 0
    constructor(parent, steps){
        super(parent, "qfooter");
        this.name = CLASSNAMES.Q_FOOTER;
        this.elements = [Steps, HrElement, NavButtons];
        this.steps = steps;
    }
    load(onclicks) {
        this.elements.forEach(el => {
            let element = new el(this.make_id(), el==NavButtons ? onclicks : this.steps);
            element.initiate();
            element.load();
        });
        QFooter.reload(0, this.steps);
    }

    static reload(step, totalSteps) {
        NavButtons.reload(step, totalSteps);
    }
}

class BackButton extends CButton{
    static name = CLASSNAMES.BACK;
    constructor(parent, onclick) {
        // let onclick = ()=>{};
        super(parent, onclick);
        this.name = BackButton.name;
        this.content = "Back"; // U+02715
    }
}

class NextButton extends CButton{
    static name = CLASSNAMES.NEXT;
    constructor(parent, onclick) {
        // let onclick = ()=>{};
        super(parent,onclick);
        this.name = NextButton.name;
        this.content = "Next"; // U+02715
    }
}

class SubmitButton extends CButton{
    static name = CLASSNAMES.SUBMIT;
    constructor(parent, onclick) {
        // let onclick = ()=>{};
        super(parent, onclick);
        this.name = SubmitButton.name;
        this.content = "Submit"; // U+02715
    }
}

class NavButtons extends ContentPanel{
    static name = CLASSNAMES.NAV;
    constructor(parent, onclicks){
        super(parent, "");
        this.elements = [BackButton, NextButton, SubmitButton];
        this.args = onclicks;
    }

    load() {
        this.elements.forEach((el, i) => {
            let element = new el(this.make_id(), this.args[i]);
            element.initiate();
            element.load();
        });
    }
    static getButton(name){
        let el = document.getElementsByClassName(name);
        if (el.length>0){
            return el[0];
        }
    }

    static buttonConditions = new Map([
        [BackButton.name, (step, steps)=>{return step==0}],
        [NextButton.name, (step, steps)=>{return step==steps}],
        [SubmitButton.name,(step, steps)=>{return step!=steps}]
    ]);

    static reload(step, steps) {
        [BackButton, NextButton, SubmitButton].forEach(
            b=>{
                let bb = b.getElements();
                if (bb.length>0){
                    let cond = this.buttonConditions.get(b.name);
                    
                    bb[0].style.display = cond(step, steps) ? DISPLAY.NONE : DISPLAY.BLOCK;
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
    constructor(parent) {
        super(parent);
        this.name = "steps";
        this.content = "";
    }
    load() { }
    
} 

class QContainer extends ContentPanel{
    static name = CLASSNAMES.Q_CONTAINER;
    constructor(parent, content, answerTree){
        super(parent, CLASSNAMES.Q_CONTAINER);
        // this.name = CLASSNAMES.Q_CONTAINER;
        this.content = content;  // QASet[]
        this.element = QContainer;
        this.tree = answerTree;
    }

    initiate() {
        let panel = document.createElement("div");
        panel.setAttribute('class', this.name);
        panel.setAttribute("id", this.make_id());
        this.getParent().appendChild(panel);
        this.init();
        return panel;
    }

    init(){
        let step = 0;
        this.content.forEach((qs, i)=>{
            qs.content.forEach(
            (qa, j)=>{qa.initiate(this.make_id(), (i==step && 
                                            (j==0 || this.tree.get(qa.prev_id)!=undefined)

            ), this.tree)}
        )
        }
    );

    }

    load(step, display) {
        
        this.content.forEach((qs, i)=>{
            qs.content.forEach(
            (qa, j)=>{qa.make(this.make_id(), (i==step && 
                                            (j==0 || this.tree.get(qa.prev_id)!=undefined)

            ), this.tree)}
        )
        }
    );
    }
}

class QuestionContainer extends ContentPanel{
    static name = CLASSNAMES.QUESTION_CONTAINER
    constructor(parent, id, content){
        super(parent, id);
        // this.name = CLASSNAMES.Q_CONTAINER;
        this.content = content;  // QASet[]
        this.element = [TextElement, TextElement];
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
    static name = CLASSNAMES.QA_CONTAINER
    constructor(parent, id, content){
        super(parent, id);
        this.content = content;  // QASet[]
        this.element = [];
    }

    load(tree, next_ids, display) {    
        this.content.question.make(this.make_id());
        this.content.answer.make(this.make_id(), tree, next_ids);
        this.show(display);
    }

    show(display){
        this.getElement().style.display = display==false ? DISPLAY.NONE : DISPLAY.FLEX;
    }
}

class QContainer_ extends ContentPanel{
    constructor(parent, content){
        super(parent, "question-page");
        this.name = CLASSNAMES.Q_PAGE;
        this.content = content;
        // this.answerTree = answerTree;
    }

    load(step) {        
        this.content.forEach((qa, i)=>qa.make(this.make_id(), i==step-1));
    }
}

class QContainerLeg extends ContentPanel{
    constructor(parent, qtree, answerTree){
        super(parent, "question-container");
        this.name = CLASSNAMES.Q_CONTAINER;
        this.content = qtree;
        this.answerTree = answerTree;
    }

    load(aspect) {        
            this.content.questions.filter(q=>this.content.q_locs
                                        .filter(q=>q.aspect_id==aspect)
                                        .map(q=>q.question_id)
                                        .includes(q.id))
                                  .forEach((question, i)=>question.make(this.make_id(), 
                                                                        this.answerTree, 
                                                                        this.content.questions[i+1].id, 
                                                                        i==0)
    );
    }
}