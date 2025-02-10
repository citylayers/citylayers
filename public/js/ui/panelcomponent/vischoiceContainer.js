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
    static name = "vischoice icon"
    static icon_path = "/icons/maps"
    constructor(parent, id, image){
        super(parent, id);
        this.name = VisChoiceIcon.name;
        this.elements = [ImageElement];
        this.image = new Illustration(`${VisChoiceIcon.icon_path}/${image}`);
    }

    load(){
        for (let e=0; e<this.elements.length; e++){
            
            let element = new this.elements[e](this.make_id(), `${e}`, this.image);
            console.log(element);
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
        this.args = [()=>{console.log(vis)}, vis
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
    constructor(parent, id, vis){
        super(parent, id);
        this.name = VisChoice.name;
        this.elements = [VisChoiceIcon, VisChoiceDescr];
        this.vis = vis;
        this.args = [
            `${VIS_ICONS.get(vis)}`, vis
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

class VisChoiceContainer extends ContentPanel{
    static name = "subcontainer vischoice";
    constructor(parent){
        super(parent, "id");
        this.name = VisChoiceContainer.name;
        this.elements = [VisChoice, VisChoice, VisChoice];
        this.args = [
            VIS.HIGHLIGHT, VIS.GRADIENT, VIS.ELEMENTS
        ]
    }

    load(){
        for (let e=0; e<this.elements.length; e++){
            
            let element = new this.elements[e](this.make_id(), 
                                               `${e}`, 
                                               this.args[e]);

            element.initiate();
            element.load();
        }
    }
}

