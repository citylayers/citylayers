

class QPanel extends ContentPanel{
    static name = CLASSNAMES.Q_PANEL;
    static controller = undefined;
    static initialStep = 0;
    static currentStep = 0;
    static totalSteps = 0;
    static tree = undefined;

    constructor(parent){
        super(parent, "id");
        this.name = CLASSNAMES.Q_PANEL;
        this.elements = [QHeader,  QContainer, QFooter];
        
    }

    load(qasets, answerTree) {
        let kartaset = new QASet(0, [new KartaPair]);
        qasets.unshift(kartaset);
        QPanel.totalSteps = qasets.length -1;
        QPanel.tree = answerTree;
               
        this.elements.forEach((el, i) => {
            
            let element = el == QContainer ? new el(this.make_id(), qasets, answerTree) : 
                                             new el(this.make_id(), "main");
            element.initiate();
            
            if (element instanceof QContainer){
                element.load(QPanel.currentStep, i==QPanel.currentStep)
                QPanel.controller = element;
            }
            else{
                element.load([QPanel.back, QPanel.next, QPanel.submit]);
            }
        });
    }

    static back(){
        QPanel.controller.load(QPanel.currentStep-1);
        QPanel.currentStep -= 1;
        QFooter.reload(QPanel.currentStep, QPanel.totalSteps);
    }

    static next(){
        QPanel.controller.load(QPanel.currentStep+1);
        QPanel.currentStep += 1;
        QFooter.reload(QPanel.currentStep, QPanel.totalSteps);
    }

    static make_form(){

        const d = new FormData();

        if (QPanel.tree.getAnswer("image")!=undefined && QPanel.tree.getAnswer("image")!=null && QPanel.tree.getAnswer("image")!=""){
            d.set("image", QPanel.tree.getAnswer("image"));
        }

        return d
    }

    static submit(){
        // window.location.href = "";
        
        let indata = {
            coords: {
                lat: Position.lat,
                lon: Position.lon},
            data: QPanel.tree.out()
        }

        QPanel.currentStep = QPanel.initialStep;
        

        let d = QPanel.make_form();
        fetch('/upload', {
            method: 'POST',
            body: d
            })
            .then(response => {
                response.json().then(response=>{
                    
                indata.image = response.content;
                fetch('/submit', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(indata)
                })
                    .then(response => {
                        window.location.href = "/success"
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })})
            .catch(error => {
                console.log(error);
            });
    }

}

