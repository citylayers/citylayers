

const GRADBAR_ENDS = {
    START : "--start",
    END: "--end"
};

class GradientContainer extends ContentPanel{
    static name = CLASSNAMES.TEXT;
    constructor(parent){
        super(parent, "id");
        this.name = "gradient subcontainer";
        this.elements = [HrElement, ColorPickerElement, ColorPickerElement];
        this.args = ["",
            (ev)=>{ HrElement.updateColor(ev, GRADBAR_ENDS.START)},
            (ev)=>{ HrElement.updateColor(ev, GRADBAR_ENDS.END)}
        ]
    }

    load(){
        for (let e=0; e<this.elements.length; e++){
            
            let element = new this.elements[e](this.make_id(), 
                                               `${e}`, this.args[e]);

            element.initiate();
            element.load();
        }
    }
}

