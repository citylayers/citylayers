// Legacy imports for compatibility
class QHeader extends ContentPanel {
    constructor(parent) {
        super(parent, "");
        this.name = CLASSNAMES.Q_HEADER;
        this.elements = [LineLogo, ExitButton];
    }
    load() {
        this.elements.forEach(el => {
            let element = new el(this.makeId(), this.parent);
            element.initiate();
            element.load();
        });
    }
}
/**
 * Exit button for questionnaire.
 * Extends BaseComponent with proper OOP principles.
 */
class ExitButton extends BaseComponent {
    constructor(parentId, onClick) {
        super(parentId, "exit-button");
        this.buttonContent = "Save and Exit";
    }
    getElementTag() {
        return 'button';
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.buttonContent;
        return element;
    }
    // Legacy compatibility
    static getElements() {
        return document.getElementsByClassName("exit-button");
    }
}
class QFooter extends ContentPanel {
    // static steps = 0
    constructor(parent, id, steps) {
        super(parent, "qfooter");
        this.name = CLASSNAMES.Q_FOOTER;
        this.elements = [Steps, HrElement, NavButtons];
        this.steps = steps;
    }
    load(onclicks) {
        this.elements.forEach(el => {
            let element = new el(this.makeId(), "", el == NavButtons ? onclicks : this.steps);
            element.initiate();
            element.load();
        });
        QFooter.reload(0, this.steps);
    }
    static reload(step, totalSteps) {
        NavButtons.reload(step, totalSteps);
    }
}
/**
 * Back button for questionnaire navigation.
 * Extends BaseComponent with proper OOP principles.
 */
class BackButton extends BaseComponent {
    constructor(parentId, id, onClick) {
        super(parentId, ClassName.BACK);
        this.buttonContent = "Back";
        this.clickHandler = onClick || (() => { });
    }
    getElementTag() {
        return 'button';
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.buttonContent;
        return element;
    }
    afterInit() {
        this.addEventListener('click', this.clickHandler);
    }
    // Legacy compatibility
    static getElements() {
        return document.getElementsByClassName(ClassName.BACK);
    }
}
BackButton.componentName = ClassName.BACK;
/**
 * Next button for questionnaire navigation.
 * Extends BaseComponent with proper OOP principles.
 */
class NextButton extends BaseComponent {
    constructor(parentId, id, onClick) {
        super(parentId, ClassName.NEXT);
        this.buttonContent = "Next";
        this.clickHandler = onClick || (() => { });
    }
    getElementTag() {
        return 'button';
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.buttonContent;
        return element;
    }
    afterInit() {
        this.addEventListener('click', this.clickHandler);
    }
    // Legacy compatibility
    static getElements() {
        return document.getElementsByClassName(ClassName.NEXT);
    }
}
NextButton.componentName = ClassName.NEXT;
/**
 * Submit button for questionnaire.
 * Extends BaseComponent with proper OOP principles.
 */
class SubmitButton extends BaseComponent {
    constructor(parentId, id, onClick) {
        super(parentId, ClassName.SUBMIT);
        this.buttonContent = "Submit";
        this.clickHandler = onClick || (() => { });
    }
    getElementTag() {
        return 'button';
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.buttonContent;
        return element;
    }
    afterInit() {
        this.addEventListener('click', this.clickHandler);
    }
    // Legacy compatibility
    static getElements() {
        return document.getElementsByClassName(ClassName.SUBMIT);
    }
}
SubmitButton.componentName = ClassName.SUBMIT;
class NavButtons extends ContentPanel {
    constructor(parent, id = "", onclicks = []) {
        super(parent, id);
        this.elements = [BackButton, NextButton, SubmitButton];
        this.name = CLASSNAMES.NAV;
        this.args = onclicks;
    }
    load() {
        this.elements.forEach((el, i) => {
            let element = new el(this.makeId(), "", this.args[i]);
            element.initiate();
            element.load();
        });
    }
    static getButton(name) {
        let el = document.getElementsByClassName(name);
        if (el.length > 0) {
            return el[0];
        }
    }
    static reload(step, steps) {
        [BackButton, NextButton, SubmitButton].forEach(b => {
            let bb = b.getElements();
            if (bb.length > 0) {
                let cond = this.buttonConditions.get(b.name);
                let ba = bb[0];
                ba.style.display = cond(step, steps) ? DISPLAY.NONE : "inline-block";
            }
        });
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
NavButtons.buttonConditions = new Map([
    [BackButton.name, (step, steps) => { return step == 0; }],
    [NextButton.name, (step, steps) => { return step == steps - 1; }],
    [SubmitButton.name, (step, steps) => { return step != steps - 1; }]
]);
/**
 * Steps indicator component for questionnaire.
 * Extends BaseComponent with proper OOP principles.
 */
class Steps extends BaseComponent {
    constructor(parentId) {
        super(parentId, "steps");
    }
}
class QContainer extends ContentPanel {
    constructor(parent, id, content) {
        super(parent, CLASSNAMES.Q_CONTAINER);
        this.name = CLASSNAMES.Q_CONTAINER;
        this.content = content[0]; // QASet[]
        this.elements = [QContainer];
        this.tree = content[1];
    }
    load(c, a) {
        this.load_(c, a);
    }
    load_(step, display) {
        console.log("QContainer.load_ called, step:", step, "content:", this.content);
        // First initiate all QA pairs if not already done
        this.content.forEach((qs, i) => {
            qs.content.forEach((qa, j) => {
                if (!qa.e) { // Only initiate if not already done
                    qa.initiate(this.makeId());
                }
            });
        });
        // Then make with visibility (i == step for 0-indexed steps)
        this.content.forEach((qs, i) => {
            qs.content.forEach((qa, j) => {
                // Check if previous answer exists AND is truthy (for checkboxes, must be checked)
                const prevValue = qa.prev_id ? this.tree.get(qa.prev_id) : undefined;
                const shouldDisplay = (i == step && (j == 0 || !!prevValue));
                console.log(`Step ${i}, QA ${j}: shouldDisplay=${shouldDisplay}, step=${step}, i==step=${i == step}, j==0=${j == 0}, prev_id=${qa.prev_id}, prevValue=${prevValue}`);
                qa.make(this.makeId(), shouldDisplay, this.tree);
            });
        });
    }
}
class QuestionContainer extends ContentPanel {
    constructor(parent, id, content) {
        super(parent, id);
        this.name = CLASSNAMES.QUESTION_CONTAINER;
        this.content = content; // QASet[]
        this.elements = [TextElement, TextElement];
    }
    makeHelp(parent_id) {
        let el = new TextElement(parent_id, this.id, this.content[1]);
        el.initiate();
        el.load();
        return el;
    }
    makeQuestion(parent_id) {
        let el = new TextElement(parent_id, this.id, this.content[0]);
        el.initiate();
        el.load();
        return el;
    }
    load() {
        this.makeQuestion(this.makeId());
        this.makeHelp(this.makeId());
    }
    show(display) {
        this.getElement().style.display = display == false ? "none" : "flex";
    }
}
class QAContainer extends ContentPanel {
    constructor(parent, id, content) {
        super(parent, id, content);
        this.name = CLASSNAMES.QA_CONTAINER;
        this.elements = [];
    }
    load(tree, next_ids, display) {
        this.load_(tree, next_ids, display);
    }
    load_(tree, next_ids, display) {
        this.content.question.make(this.makeId());
        this.content.answer.make(this.makeId(), tree, next_ids);
        this.show(display);
    }
    show(display) {
        this.getElement().style.display = display == false ? DISPLAY.NONE : DISPLAY.FLEX;
    }
}
class QContainer_ extends ContentPanel {
    constructor(parent, content) {
        super(parent, "");
        this.name = CLASSNAMES.Q_PAGE;
        this.content = content;
        // this.answerTree = answerTree;
    }
    load_(step) {
        this.content.forEach((qa, i) => qa.make(this.makeId(), i == step - 1));
    }
}
// class QContainerLeg extends ContentPanel{
//     tree:any;
//     constructor(parent, qtree, tree:any){
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
//                                   .forEach((question, i)=>question.make(this.makeId(), 
//                                                                         this.answerTree, 
//                                                                         this.content.questions[i+1].id, 
//                                                                         i==0)
//     );
//     }
// }
