// Legacy imports
class LandingIllustration extends ContentPanel {
    constructor(parent) {
        super(parent, "id");
        this.name = CLASSNAMES.LANDING_ILLUSTRATION;
        this.elements = [ColorLogo, GradElement];
        this.images = Array.from(Array(15).keys()).filter(e => e > 1).map(e => `images/landing/v0.2.11/${e}.png`);
    }
    load() {
        this.images.forEach(el => {
            let illustration = new Illustration(el, "", "");
            let element = new ImageElement(this.makeId(), "image", illustration, "landing_illustration");
            element.initiate();
            element.load();
        });
        this.elements.forEach(el => {
            let element = new el(this.makeId(), this.id);
            element.initiate();
            element.load();
        });
    }
}
class GeneralContent extends ContentPanel {
    constructor(parent) {
        super(parent, "id");
        this.name = CLASSNAMES.LANDING_GENERAL;
        this.elements = [LandingSlogan, LandingBrief];
    }
    load() {
        this.elements.forEach(el => {
            let element = new el(this.makeId(), this.id);
            element.initiate();
            element.load();
        });
    }
}
class LandingSlogan extends BaseComponent {
    constructor(parent, id) {
        let content = "Collaborative mapping as a practice of resilient city-making";
        super(parent, ClassName.SLOGAN, id, content);
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.content;
        return element;
    }
}
class LandingBrief extends BaseComponent {
    constructor(parent, id) {
        let content = "CITY LAYERS are a socially conscious framework that integrates \
                    subjective community knowledge with existing open datasets. Its \
                    purpose – to reveal, map and inform the key urban challenges, \
                    while simoultaneously offering a clear roadmap for overcoming \
                    them. \
                    Global challenges related to climate, mobility, and health are broken \
                    down into a series of micro-scale 'layers' — easily understandable urban \
                    phenomena that citizens can identify, record, and reflect upon through \
                    collaborative city-mapping. This participatory \
                    methodology elevates individual observations into collective \
                    knowledge, providing both citizens and city planners with actionable \
                    insights to improve decision-making.";
        super(parent, "description", id, content);
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.content;
        element.classList.add("description");
        return element;
    }
}
/**
 * Gradient element for landing page.
 * Extends BaseComponent with proper OOP principles.
 */
class GradElement extends BaseComponent {
    constructor(parentId, id) {
        super(parentId, ClassName.GRAD, id);
    }
}
