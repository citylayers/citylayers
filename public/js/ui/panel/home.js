

class HomePanel extends ContentPanel{
    static name = CLASSNAMES.LANDING_GENERAL;
    constructor(parent){
        super(parent, "");
        this.name = HomePanel.name;
        this.elements = [LandingSlogan, 
            LandingIllustration, LandingBrief, ProjectPanel]
    }

    load(projects) {
        this.elements.forEach(el => {
            let element = new el(this.make_id(), "");
            element.initiate();
            element.load(projects);
        });

    }
}

