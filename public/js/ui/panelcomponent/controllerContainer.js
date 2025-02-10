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
            let element = new el(this.make_id(), "main");
            element.initiate();
            element.load();
        });
        if (config!=undefined && config!=null){
            config.filter(s => s.name!=null && s.name!=undefined && s.name!="").forEach((category, c) => {
                this.add(category);
                //document.body.style.setProperty(`--category${c+1}`, `#${category.color}`);
            });
        }
    }


    add(category) {
        let element = new CategoryController(this.make_id(), category);
        element.initiate();
        element.load();
    }

}