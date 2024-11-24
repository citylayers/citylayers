import { AnswerTree } from "../../../../logic/question/answerTree";
import { QASet } from "../../../../logic/question/question";
import { CElement } from "../component/celement";
import { ContentPanel } from "./contentPanel";
import { CLASSNAMES } from "../../../classnames";

import { QHeader, QFooter, QAContainer, QContainer } from "../panelcomponent/question";

class QPanel extends ContentPanel{
    
    name: string;
    elements: typeof CElement[];

    static controller = undefined;
    static currentStep = 1;
    static totalSteps = 0;
    static tree = undefined;

    constructor(parent:string){
        super(parent, "id");
        this.name = CLASSNAMES.Q_PANEL;
        this.elements = [QHeader, QContainer, QFooter];
        
    }

    load(qasets:QASet[], answerTree:AnswerTree) {
        QPanel.totalSteps = qasets.length;
        QPanel.tree = answerTree;
        
        this.elements.forEach((el, i) => {
            
            let element = el == QContainer ? new el(this.make_id(), "", [qasets, answerTree]) : 
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

    static submit(){
        // window.location.href = "";
        QPanel.currentStep = 1;
    }

}

export {QPanel};
