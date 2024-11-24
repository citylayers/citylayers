
class PinPage{

    static build(content){
        
        let answerTree = new AnswerTree();
        
        const qPanel = new QPanel(CLASSNAMES.MAIN_CONTAINER);
        qPanel.initiate();

        qPanel.load(content.map(qs=>{
            let a = new QASet(qs.step, qs.content);
            a.convertContent();
            return a;
        }), answerTree);
    };

}

