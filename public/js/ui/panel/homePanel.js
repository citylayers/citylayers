class HomePanel extends ContentPanel {
    constructor(parent) {
        super(parent, "id");
        this.name = CLASSNAMES.HOME_PANEL;
        this.elements = [LandingIllustration, GeneralContent, ProjectPanel];
    }
    load(projects) {
        this.elements.forEach(el => {
            // Pass this.makeId() as parent so components nest properly
            let element = new el(this.makeId(), this.id);
            element.initiate();
            element.load(projects);
        });
    }
}
