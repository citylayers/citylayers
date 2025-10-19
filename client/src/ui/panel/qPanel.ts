/// <reference path="../../karta/positioning.ts" />

// Position class is loaded globally via script tag
// positioning.ts is compiled to public/js/karta/positioning.js

// Legacy imports

class QPanel extends ContentPanel {
    name: string;
    elements: any[];

    static controller = undefined;
    static currentStep = 0;
    static initialStep = 0;
    static totalSteps = 0;
    static tree = undefined;

    constructor(parent:string){
        super(parent, "id");
        this.name = CLASSNAMES.Q_PANEL;
        this.elements = [QHeader, QContainer, QFooter];
        
    }

    load(qasets:any[], answerTree:any) {
        QPanel.totalSteps = qasets.length;
        QPanel.tree = answerTree;
        
        this.elements.forEach((el, i) => {
            
            let element = el == QContainer ? new el(this.makeId(), "", [qasets, answerTree]) : 
                                             new el(this.makeId(), "main");
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

    static make_form(): FormData {
        // Create FormData from image input if present
        const d = new FormData();

        if (QPanel.tree.get("image")!=undefined && 
            QPanel.tree.get("image")!=null && 
            QPanel.tree.get("image")!=""){
            d.set("image", QPanel.tree.get("image"));
        }

        return d

        // const imageInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        // const formData = new FormData();
        // if (imageInput && imageInput.files && imageInput.files[0]) {
        //     formData.append('image', imageInput.files[0]);
        // }
        // return formData;
    }
    

    static submit_image(dd:any, indata: any){
        fetch('/upload', {
                    method: 'POST',
                    body: dd
                    })
                    .then(response => {
                        response.json().then(response=>{
                            
                        indata.image = response.content;
                        QPanel.submit_form(dd, indata);
                    })})
                    .catch(error => {
                        console.log(error);
                    });
        
    }

    static submit_form(dd:any, indata: any){
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
    }

    static submit(){
        let indata: any = {
                coords: {
                    lat: Position.lat,
                    lon: Position.lon},
                data: QPanel.tree.out()
            }

            QPanel.currentStep = QPanel.initialStep;
            

            let d = QPanel.make_form();
            if (d.get("image")!=undefined && d.get("image")!=null && d.get("image")!=""){
                QPanel.submit_image(d, indata);
            }
            else{
                
                QPanel.submit_form(d, indata)

            }
        }



    // static submit(){
    //     console.log('Submit button clicked, tree:', QPanel.tree);
    //     const answers = QPanel.tree.out();
    //     console.log('Submitting answers:', answers);

    //     fetch('/submit', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(answers)
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //             window.location.href = '/success';
    //         } else {
    //             console.error('Submit failed:', response);
    //             alert('Failed to submit. Please try again.');
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Submit error:', error);
    //         alert('Error submitting. Please try again.');
    //     });
    // }

}

