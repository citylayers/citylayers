
class ConfigPanel extends ContentPanel{

    static remove(){
        let element = document.getElementsByClassName(CLASSNAMES.CATEGORY_PANEL)[0];
        element.remove();
    }

    static markertoggle(subcat_id, show){
        // Toggle visibility of markers with this subcategory
        // This filters the observations on the map
        // TODO: Implement marker filtering based on subcategory
        console.log(`Toggle markers for subcategory ${subcat_id}: ${show}`);

        // Trigger map update via pubsub
        if (window.pubsub) {
            window.pubsub.publish(window.tree?.payload);
        }
    }

    constructor(parent){
        super(parent);
        this.name = CLASSNAMES.CATEGORY_PANEL;
        this.parent = parent ? parent : "body";
        this.elements = [ConfigHeader, ControllerContainer];
    }

    load(config) {
        this.elements.forEach(el => {
            let element = new el(this.makeId(), "main");
            element.initiate();
            element.load(config);
        });
    }

}
