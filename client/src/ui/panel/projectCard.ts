import { CLASSNAMES, LEGAL_CLASSNAMES } from "../../constants/ClassNames";
import {CElement} from "../component/celement";
import {LegalPanel} from "./legal";
import { Logo } from "../component/logo";
import { CloseButton } from "../component/closeButton";
import { ImageElement } from "../component/imageElement";
import { Illustration } from "../../../../logic/illustration";
// import { ProjectRecognition } from "../../../../logic/projectInfo";
import { ImageContainerElement } from "../component/imageContainerElement";
import { TextElement } from "../component/textElement";
// import { Partner } from "../../../../logic/partner";
import { Project } from "../../../../logic/project";
import { ProjectPeriodInfo, ProjectTeam, Recognition } from "../component/projectComponent";

class ProjectCardPanel extends LegalPanel{

    constructor(parent:string, id:string, content?:any){
        super(parent, id, content);
        this.content = content;
        this.name = LEGAL_CLASSNAMES.PANEL;
        this.elements = [ProjectCardHeader, ProjectCardBody];

    }

    // getParent(){
    //     let els = document.getElementsByTagName(this.parent);
    //     return els.length>0 ? els[0] : document.body;
    // }
}

class ProjectCardHeader extends CElement{
    args: any[];
    elements: any[];
    constructor(parent:string, id:string, content?:any){
        super(parent, id, content);
        this.name =  LEGAL_CLASSNAMES.HEADER;
        this.content = content; 
        this.elements = [Logo, CloseButton];
        this.args = [undefined, ()=>{location.href = "/"}]
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), this.args[e]);
            element.initiate();
        }
    }
}



class ProjectCardBody extends CElement{
    elements: typeof CElement[];
    classes: string[];
    args: any[];
    constructor(parent:string, id:string, content?:any){
        super(parent, id, content);
        this.name = LEGAL_CLASSNAMES.BODY;
        this.content = content;  // Project
        this.elements = [ImageElement, 
                        TextElement, 
                        Recognition,
                        ProjectPeriodInfo,
                        ProjectTeam,
                        ExploreButton,
                        ProjectSlogan,
                        TextElement,
                        ImageContainerElement,
                        ImageContainerElement
                        ]; 

        this.classes = [CLASSNAMES.COVER, 
                        LEGAL_CLASSNAMES.TITLE, 
                        CLASSNAMES.RECOGNITION,
                        CLASSNAMES.PERIOD,
                        CLASSNAMES.TEAM,
                        ExploreButton.name,
                        CLASSNAMES.PROJECT_DESCRIPTION,
                        CLASSNAMES.PROJECT_DESCRIPTION,
                        CLASSNAMES.PROJECT_IMAGE_CONTAINER,
                        CLASSNAMES.PARTNER
                    
                    ];
        let cover = new Illustration(`/images/projects/${content.name}/cover.svg`, '');
        this.args = [cover, 
                     content.name, 
                     content.info.recognition,
                     content.info,
                     content.info.team,
                     content,
                     content.info.subtitle,
                     content.info.description,
                     content.info.images,
                     content.info.partners.map( e=>e.image)
                    
                    ];
    }

    initiate() {
        var element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
        
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), 
                                    this.classes[e], 
                                    e < this.args.length ? this.args[e] : undefined
                                );
            element.initiate();
            element.load();
        }
    }
}

class ProjectSlogan extends TextElement {
    constructor(parent:string, id:string, content?:any) {
        super(parent, id, content);
        this.name = CLASSNAMES.SLOGAN;
    }
}

// class ProjectCardBodyContent extends ContentElement{
    
//     constructor(parent, name, content){
//         parent = parent ? parent : LEGAL_CLASSNAMES.PANEL;
//         super(parent, undefined);
//         this.name = name;
//         this.content = content;
//         this.elements = [
//             // ProjectTitle,
//             ProjectCardInfo,
//             ExploreButton,
//             ProjectSlogan,
//             ProjectCardText,
//             ImageContainerElement,
//             PartnerElement
//         ];
//     }
//     load() {
//         for (let e = 0; e < this.elements.length; e++) {
//             let args = this.content;
//             if (this.elements[e]==ProjectCardText){
//                 args = this.content.info.description;
//             }
//             else if (this.elements[e]==ProjectSlogan){
//                 args = this.content.info.subtitle;
//             }
//             else if (this.elements[e]==ImageContainerElement){
//                 args = this.content.info.images;
//             }
//             let element = new this.elements[e](this.make_id(), 
//             CLASSNAMES.PROJECT_DESCRIPTION,  args);
//             element.initiate();
//             element.load();
//         }
//     }
// }

class ExploreButton extends CElement {

    static _text = "Explore";
    content: Project;
    constructor(parent:string, id:string, project:Project) {
        super(parent, id, project);
        this.name = "projectButton";
        this.content = project;
    }

    initiate() {
        var element = document.createElement("button");
        element.innerHTML = ExploreButton._text;
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
        element.addEventListener("click", () => {
            
            window.location.href = `/explore/${this.content.name}`;
        });
    }
}