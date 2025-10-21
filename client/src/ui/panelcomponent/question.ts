







// Legacy imports for compatibility

class QHeader extends ContentPanel{
    constructor(parent:string){
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
    private buttonContent: string;

    constructor(parentId: string, onClick?: () => void) {
        super(parentId, "exit-button");
        this.buttonContent = "Save and Exit";
    }

    protected getElementTag(): string {
        return 'button';
    }

    protected createElement(): HTMLElement {
        const element = super.createElement();
        element.innerHTML = this.buttonContent;
        return element;
    }

    // Legacy compatibility
    static getElements(): HTMLCollectionOf<Element> {
        return document.getElementsByClassName("exit-button");
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
           
            let element = new el(this.makeId(), "", el==NavButtons ? onclicks : this.steps);
            element.initiate();
            element.load();
        });
        QFooter.reload(0, this.steps);
    }

    static reload(step:number, totalSteps:number) {
        NavButtons.reload(step, totalSteps);
    }
}




/**
 * Back button for questionnaire navigation.
 * Extends BaseComponent with proper OOP principles.
 */
class BackButton extends BaseComponent {
    private buttonContent: string;
    private clickHandler: () => void;
    static readonly componentName: string = ClassName.BACK;

    constructor(parentId: string, id: string, onClick: () => void) {
        super(parentId, ClassName.BACK);
        this.buttonContent = "Back";
        this.clickHandler = onClick || (() => {});
    }

    protected getElementTag(): string {
        return 'button';
    }

    protected createElement(): HTMLElement {
        const element = super.createElement();
        element.innerHTML = this.buttonContent;
        return element;
    }

    protected afterInit(): void {
        this.addEventListener('click', this.clickHandler);
    }

    // Legacy compatibility
    static getElements(): HTMLCollectionOf<Element> {
        return document.getElementsByClassName(ClassName.BACK);
    }
}

/**
 * Next button for questionnaire navigation.
 * Extends BaseComponent with proper OOP principles.
 */
class NextButton extends BaseComponent {
    private buttonContent: string;
    private clickHandler: () => void;
    static readonly componentName: string = ClassName.NEXT;

    constructor(parentId: string, id: string, onClick: () => void) {
        super(parentId, ClassName.NEXT);
        this.buttonContent = "Next";
        this.clickHandler = onClick || (() => {});
    }

    protected getElementTag(): string {
        return 'button';
    }

    protected createElement(): HTMLElement {
        const element = super.createElement();
        element.innerHTML = this.buttonContent;
        return element;
    }

    protected afterInit(): void {
        this.addEventListener('click', this.clickHandler);
    }

    // Legacy compatibility
    static getElements(): HTMLCollectionOf<Element> {
        return document.getElementsByClassName(ClassName.NEXT);
    }
}

/**
 * Submit button for questionnaire.
 * Extends BaseComponent with proper OOP principles.
 */
class SubmitButton extends BaseComponent {
    private buttonContent: string;
    private clickHandler: () => void;
    static readonly componentName: string = ClassName.SUBMIT;

    constructor(parentId: string, id: string, onClick: () => void) {
        super(parentId, ClassName.SUBMIT);
        this.buttonContent = "Submit";
        this.clickHandler = onClick || (() => {});
    }

    protected getElementTag(): string {
        return 'button';
    }

    protected createElement(): HTMLElement {
        const element = super.createElement();
        element.innerHTML = this.buttonContent;
        return element;
    }

    protected afterInit(): void {
        this.addEventListener('click', this.clickHandler);
    }

    // Legacy compatibility
    static getElements(): HTMLCollectionOf<Element> {
        return document.getElementsByClassName(ClassName.SUBMIT);
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
            let element = new el(this.makeId(), "", this.args[i]);
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
        [NextButton.name, (step, steps)=>{return step==steps-1}],
        [SubmitButton.name,(step, steps)=>{return step!=steps-1}]
    ]);

    static reload(step:number, steps:number) {

        [BackButton, NextButton, SubmitButton].forEach(
            b=>{
                let bb = b.getElements();
                if (bb.length>0){
                    let cond = this.buttonConditions.get(b.name);
                    let ba = bb[0] as HTMLElement;
                    ba.style.display = cond(step, steps) ? DISPLAY.NONE : "inline-block";
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

/**
 * Steps indicator component for questionnaire.
 * Extends BaseComponent with proper OOP principles.
 */
class Steps extends BaseComponent {
    constructor(parentId: string) {
        super(parentId, "steps");
    }
}

class QContainer extends ContentPanel{
    
    tree:any;

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
        console.log("QContainer.load_ called, step:", step, "content:", this.content);
        // First initiate all QA pairs if not already done
        this.content.forEach((qs:any, i:number) => {
            qs.content.forEach((qa:any, j:number) => {
                if (!qa.e) {  // Only initiate if not already done
                    qa.initiate(this.makeId());
                }
            });
        });
        // Then make with visibility (i == step for 0-indexed steps)
        this.content.forEach((qs:any, i:number) => {
            qs.content.forEach((qa:any, j:number) => {
                // Check if previous answer exists AND is truthy (for checkboxes, must be checked)
                const prevValue = qa.prev_id ? this.tree.get(qa.prev_id) : undefined;
                const shouldDisplay = (i == step && (j == 0 || !!prevValue));
                console.log(`Step ${i}, QA ${j}: shouldDisplay=${shouldDisplay}, step=${step}, i==step=${i==step}, j==0=${j==0}, prev_id=${qa.prev_id}, prevValue=${prevValue}`);
                qa.make(this.makeId(), shouldDisplay, this.tree);
            });
        });
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
        this.makeQuestion(this.makeId());
        this.makeHelp(this.makeId());
    }

    show(display){
        this.getElement().style.display = display==false ? "none" : "flex";
    }
}

class QAContainer extends ContentPanel{

    constructor(parent:string, id:string, content:any){
        super(parent, id, content);
        this.name = CLASSNAMES.QA_CONTAINER;
        this.elements = [];
    }

    load(tree?:any, next_ids?:any, display?:any) {
        this.load_(tree, next_ids, display);
    }

    load_(tree:any, next_ids:Map<string, string>, display:boolean) {
        this.content.question.make(this.makeId());
        this.content.answer.make(this.makeId(), tree, next_ids);
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
        this.content.forEach((qa, i)=>qa.make(this.makeId(), i==step-1));
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

