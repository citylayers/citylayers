
class ConfigPanel extends ContentPanel {

    static remove(): void {
        const element = document.getElementsByClassName(CLASSNAMES.CATEGORY_PANEL)[0];
        if (element) {
            element.remove();
        }
    }

    static markertoggle(subcat_id: string, show: boolean): void {
        // Toggle visibility of markers with this subcategory
        // This filters the observations on the map
        // Trigger map update via pubsub
        const pubsub = (window as any).pubsub;
        const tree = (window as any).tree;
        if (pubsub && tree) {
            pubsub.publish(tree.out());
        }
    }

    elements: any[];

    constructor(parent: string) {
        super(parent, "config-panel");
        this.name = CLASSNAMES.CATEGORY_PANEL;
        this.parent = parent ? parent : "body";
        // ConfigHeader and ControllerContainer are legacy JS classes
        this.elements = [(window as any).ConfigHeader, (window as any).ControllerContainer];
    }

    load(config: any): void {
        this.elements.forEach(el => {
            let element = new el(this.makeId(), "main");
            element.initiate();
            element.load(config);
        });
    }

}
