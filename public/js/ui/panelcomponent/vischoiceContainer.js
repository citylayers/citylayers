const VIS = {
    HIGHLIGHT : "highlight",
    GRADIENT: "heatmap",
    ELEMENTS: "elements",
}

const VIS_ICONS = new Map(
    [
        [VIS.HIGHLIGHT, "highlight_icon.svg"],
        [VIS.GRADIENT, "gradient_icon.svg"],
        [VIS.ELEMENTS, "elements_icon.svg"],
    ]
)

class VisChoiceIcon extends ContentPanel{
    static name = "icon"
    static icon_path = "/icons/maps"
    constructor(parent, id, vis){
        super(parent, id);
        this.name = VisChoiceIcon.name;
        this.id = vis;
        this.elements = [ImageElement];
        this.image = new Illustration(`${VisChoiceIcon.icon_path}/${VIS_ICONS.get(vis)}`);
    }

    load(){
        for (let e=0; e<this.elements.length; e++){
            
            let element = new this.elements[e](this.make_id(), this.id, `vis`, this.image);
            element.initiate();
            element.load();
        }
    }
}

class VisChoiceDescr extends ContentPanel{
    static name = "descr"
    constructor(parent, id, vis){
        super(parent, id);
        this.name = VisChoiceDescr.name;
        this.elements = [InfoElement, TextElement];
        this.args = [()=>{
            console.log(vis)
        }, vis
        ]
    }

    load(){
        for (let e=0; e<this.elements.length; e++){
            
            let element = new this.elements[e](this.make_id(), 
                                               uuidv4(), 
                                               this.args[e]);

            element.initiate();
            element.load();
        }
    }
}

class VisChoice extends ContentPanel{
    static name = "vischoice";
    static suffix = "selected"

    static getSiblings(){
        return [...document.getElementsByClassName(VisChoice.name)].filter((v)=>!v.getAttribute("class").includes("subcontainer"));
    }

    constructor(parent, id, vis){
        super(parent, id);
        let _suffix = vis==VIS.GRADIENT ? `${VisChoice.suffix}`:  "" //" disabled"
        this.name = `${VisChoice.name} ${_suffix}`;
        this.elements = [VisChoiceIcon, 
                         VisChoiceDescr, 
                         SingleChoiceInputElement
                        ];
        this.vis = vis;
        this.args = [
            vis, vis, 
            (ev)=>{
                VisChoice.getSiblings().forEach(v=>v.setAttribute("class", VisChoice.name));
                this.getElement().setAttribute("class", `${VisChoice.name} ${VisChoice.suffix}`);
                globalvisualization.active = vis;
                vischoicepubsub.publish();
            }
        ]
    }

    

    load(){
        for (let e=0; e<this.elements.length; e++){
            let id = this.elements[e]==SingleChoiceInputElement ? this.vis : uuidv4();
            
            let element = new this.elements[e](this.make_id(), 
                                               id, 
                                               this.args[e]);

            let _e = element.initiate();

            if(this.elements[e]==VisChoiceIcon){
                _e.onclick = (ev)=>{
                    globalvisualization.active = this.vis;
                    let check = document.getElementById(`input_${ev.target.id.split("_")[1]}`);
                    
                    if (check.checked!=true){
                        tree.clear();
                    }
                    
                    check.checked = true;
                    this.getElement().setAttribute("class", VisChoice.name)
                    check.onchange();
                } 
            } 
            element.load();
        }
    }
}

class VisChoiceContainer extends ContentPanel{
    static name = "subcontainer vischoice";
    constructor(parent){
        super(parent, "id");
        this.name = VisChoiceContainer.name;
        this.elements = [VisChoice, VisChoice, VisChoice];
        this.args = [
            VIS.GRADIENT, 
            VIS.HIGHLIGHT, 
            
            VIS.ELEMENTS
        ]
    }

    load(){
        for (let e=0; e<this.elements.length; e++){
            
            let element = new this.elements[e](this.make_id(), 
                                               `${this.args[e]}`, 
                                               this.args[e]);

            element.initiate();
            element.load();
        }
    }
}

