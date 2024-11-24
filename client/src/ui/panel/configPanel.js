
class ConfigPanel extends ContentPanel{

    static remove(){
        let element = document.getElementsByClassName(CLASSNAMES.CATEGORY_PANEL)[0];
        element.remove();
    }

    constructor(parent){
        super(parent, "id");
        this.name = CLASSNAMES.CATEGORY_PANEL;
        this.parent = parent ? parent : "body";
        this.id = "id";
        this.elements = [];
    }

    load(config) {
        this.elements.forEach(el => {
            let element = new el(this.make_id(), "main");
            element.initiate();
            element.load();
        });
        config.categories.forEach((category, c) => {
            this.add(category);
            document.body.style.setProperty(`--category${c+1}`, `#${category.color}`);
        });
    }


    add(category) {
        let div = new CategoryElement(this.make_id(), category);
        div.initiate();
        div.load();
    }

}
