

class ProjectCardPanel extends LegalPanel{
    constructor(parent, content){
        super(parent, content);
        this.content = content;
        this.name = LEGAL_CLASSNAMES.PANEL;
        this.elements = [ProjectCardHeader, ProjectCardBody];

    }

    getParent() {
        if (this.parent=="body"){
            return document.body;
        }
        return document.getElementById(this.parent);
    }
}

class ProjectCardHeader extends CElement{
    constructor(parent, name, content){
        super(parent);
        this.name = name? name : LEGAL_CLASSNAMES.HEADER;
        this.content = content; 
        this.elements = [Logo];
        this.args = [undefined, ()=>{location.href = "/"}]
    }

    initiate() {
        var element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), this.args[e]);
            element.initiate();
        }
    }
}


class ProjectCardBody extends CElement{
    constructor(parent, name, content){
        super(parent);
        this.name = name? name : LEGAL_CLASSNAMES.BODY;
        this.content = content;  // Project
        this.elements = [
                        LegalText, 
                        ImageElement, 
                        ProjectSlogan,
                        AddPinButton,                        
                        ProjectPeriodInfo,
                        ProjectCardText,
                        ImageContainerElement,
                        Recognition,
                        ProjectTeam,
                        PartnerImageContainerElement
                        ]; 

        this.classes = [
                        LEGAL_CLASSNAMES.TITLE, 
                        CLASSNAMES.COVER, 
                        CLASSNAMES.PROJECT_DESCRIPTION,
                        "",
                        CLASSNAMES.PERIOD,
                        CLASSNAMES.PROJECT_DESCRIPTION,
                        CLASSNAMES.PROJECT_IMAGE_CONTAINER,
                        CLASSNAMES.RECOGNITION,
                        CLASSNAMES.TEAM,
                        CLASSNAMES.PARTNER
                    
                    ];
        let cover = new Illustration(`/images/projects/${content.name}/cover.svg`, '');
        this.args = [
                     content.name, 
                     cover, 
                     content.info.subtitle,
                     content.name,
                     content.info,
                     content.info.description,
                     content.info.images,
                     content.info.recognition,
                     content.info.team,
                     content.info.partners.map(e=>e.image)
                    
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
            if (this.elements[e]==AddPinButton && this.content.info.mappable==false){
                continue
            }
            let element = undefined;

            // TODO: refactor
            if (this.elements[e]==ImageElement){

                element = new this.elements[e](this.make_id(), uuidv4(), 
                                    this.classes[e], 
                                    e < this.args.length ? this.args[e] : undefined
                                );
            }
            else{
                element = new this.elements[e](this.make_id(), 
                                    this.classes[e], 
                                    e < this.args.length ? this.args[e] : undefined
                                );
            }
            
            
            element.initiate();
            element.load();
        }
    }
}

class ProjectSlogan extends TextElement {
    constructor(parent, id, content) {
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
    
    constructor(parent, name, project) {
        super(parent, project);
        this.name = "projectButton";
        this.content = project;
    }

    initiate() {
        var element = document.createElement("button");
        element.innerHTML = ProjectCardButton._text;
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
        element.addEventListener("click", () => {
            
            window.location.href = `/pin/${this.content.id}`;
        });
    }
}