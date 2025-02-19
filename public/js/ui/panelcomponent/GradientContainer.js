

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
        this.args = [[""],
           [ CLASSNAMES.GRADPICKER, (ev)=>{ HrElement.updateColor(ev, GRADBAR_ENDS.START);
                colorpubsub.publish();
            }],
            [ CLASSNAMES.GRADPICKER, 
            (ev)=>{ HrElement.updateColor(ev, GRADBAR_ENDS.END); 
                colorpubsub.publish()}]
        ]
    }

    load(){
        for (let e=0; e<this.elements.length; e++){
            
            let element = new this.elements[e](this.make_id(), 
                                               `${e}`, ...this.args[e]);

            let el = element.initiate();
            if (this.elements[e]==HrElement){
                el.style.setProperty(GRADBAR_ENDS.START, "var(--secondary-color)");
                el.style.setProperty(GRADBAR_ENDS.END, "var(--secondary-color)");
            }
            element.load();
        }
    }
}

