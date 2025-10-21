class ConfigPanel extends ContentPanel {
    static remove() {
        const element = document.getElementsByClassName(CLASSNAMES.CATEGORY_PANEL)[0];
        if (element) {
            element.remove();
        }
    }
    static markertoggle(subcat_id, show) {
        // Toggle visibility of markers with this subcategory
        // This filters the observations on the map
        // Trigger map update via pubsub
        const pubsub = window.pubsub;
        const tree = window.tree;
        if (pubsub && tree) {
            pubsub.publish(tree.out());
        }
    }
    constructor(parent) {
        super(parent, "config-panel");
        this.name = CLASSNAMES.CATEGORY_PANEL;
        this.parent = parent ? parent : "body";
        // ConfigHeader and ControllerContainer are legacy JS classes
        this.elements = [window.ConfigHeader, window.ControllerContainer];
    }
    load(config) {
        this.elements.forEach(el => {
            let element = new el(this.makeId(), "main");
            element.initiate();
            element.load(config);
        });
    }
}
