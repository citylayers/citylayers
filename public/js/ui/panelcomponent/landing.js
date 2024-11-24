class LandingIllustration extends ContentPanel{
    static name = CLASSNAMES.LANDING_ILLUSTRATION;
    constructor(parent){
        super(parent, "id");
        this.name = LandingIllustration.name;
        this.elements = [ColorLogo, GradElement];
        this.images = [...Array(15).keys()].filter(e=>e>1).map(
            e=>`images/landing/v0.2.11/${e}.png`);
    }

    load() {
        this.images.forEach(el => {
            let illustration = new Illustration(el)
            let element = new ImageElement(this.make_id(),"image", illustration);
            element.initiate();
            element.load();
        });
        this.elements.forEach(el => {
            let element = new el(this.make_id(), this.parent);
            element.initiate();
            element.load();
        });

    }
}

// class GeneralContent extends ContentPanel{
//     static name = CLASSNAMES.LANDING_GENERAL;
//     constructor(parent){
//         super(parent, "id");
//         this.name = GeneralContent.name;
//         this.elements = [LandingSlogan, LandingBrief];
//     }

//     load() {
//         this.elements.forEach(el => {
//             let element = new el(this.make_id(), this.parent);
//             element.initiate();
//             element.load();
//         });
//     }
// }

class LandingSlogan extends TextElement{
    constructor(parent, id) {
        
        let content = "Collaborative mapping as a practice of resilient city-making";
        super(parent, id, content);
        this.name = CLASSNAMES.SLOGAN;
    }
}

class LandingBrief extends TextElement{
    constructor(parent, id) {
        let content = "CITY LAYERS are a socially conscious framework that integrates \
                    subjective community knowledge with existing open datasets. Its \
                    purpose – to reveal, map and inform the key urban challenges, \
                    while simoultaneously offering a clear roadmap for overcoming \
                    them.\
                    Global challenges related to climate, mobility, and health are broken \
                    down into a series of micro-scale “layers” — easily understandable urban \
                    phenomena that citizens can identify, record, and reflect upon through \
                    collaborative city-mapping. This participatory \
                    methodology elevates individual observations into collective \
                    knowledge, providing both citizens and city planners with actionable \
                    insights to improve decision-making.";
        super(parent, id, content);
        this.name = CLASSNAMES.DESCRIPTION;
    }
}


class GradElement extends CElement{
    constructor(parent, id){
        super(parent, id);
        this.content = "";
        this.name = CLASSNAMES.GRAD;
    }
}

