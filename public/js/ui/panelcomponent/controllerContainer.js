class ControllerContainer extends ContentPanel{

    static remove(){
        let element = document.getElementsByClassName(CLASSNAMES.CATEGORY_PANEL)[0];
        element.remove();
    }

    constructor(parent){
        super(parent);
        this.name = CLASSNAMES.CONTROLLER_CONTAINER;
        this.parent = parent ? parent : "body";
        this.elements = [];
    }

    load(config) {
        this.elements.forEach(el => {
            let element = new el(this.makeId(), "main");
            element.initiate();
            element.load();
        });
        if (config!=undefined && config!=null){
            config.filter(s => s.name!=null && s.name!=undefined && s.name!="").forEach((category, c) => {
                this.add(category);
            });
        }
        vischoicepubsub.subscribe(ControllerContainerManager.update);
        // Call initial update to set correct visibility for initial mode
        ControllerContainerManager.update();

    }


    add(category) {
        let element = new CategoryController(this.makeId(), category);
        element.initiate();
        element.load();
    }

}

// Export to global scope for ConfigPanel to use
window.ControllerContainer = ControllerContainer;