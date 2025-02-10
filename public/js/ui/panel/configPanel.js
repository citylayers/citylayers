
class ConfigPanel extends ContentPanel{

    static remove(){
        let element = document.getElementsByClassName(CLASSNAMES.CATEGORY_PANEL)[0];
        element.remove();
    }

    constructor(parent){
        super(parent);
        this.name = CLASSNAMES.CATEGORY_PANEL;
        this.parent = parent ? parent : "body";
        this.elements = [ConfigHeader, ControllerContainer];
    }

    load(config) {
        this.elements.forEach(el => {
            let element = new el(this.make_id(), "main");
            element.initiate();
            element.load(config);
        });
    }

}
