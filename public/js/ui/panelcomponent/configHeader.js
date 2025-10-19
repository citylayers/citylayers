
class ConfigDescrContainer extends ContentPanel{
    static name = CLASSNAMES.TEXT;
    constructor(parent){
        super(parent, "id");
        this.name = ConfigDescrContainer.name;
        this.elements = [TextElement, TextElement];
        this.args = [
            "👉 Click on the layers to include them in the map.",
            "👇 Choose how you want to show them!"
        ]
    }

    load(){
        for (let e=0; e<this.elements.length; e++){

            let element = new this.elements[e](this.makeId(),
                                               `${e}`,
                                               this.args[e]);

            element.initiate();
            element.load();
        }
    }
}

class ConfigHeader extends ContentPanel{
    static name = CLASSNAMES.CONFIG_HEADER;
    constructor(parent){
        super(parent, "id");
        this.name = ConfigHeader.name;
        this.elements = [LineLogo, ConfigDescrContainer, VisChoiceContainer, GradientContainer];
    }

    load() {
        this.elements.forEach(el => {
            let element = new el(this.makeId(), this.parent);
            element.initiate();
            element.load();
        });

    }
}

// Export to global scope for ConfigPanel to use
window.ConfigHeader = ConfigHeader;