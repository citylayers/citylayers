class ImageContainerElement extends ContentPanel{
    constructor(parent, name, illustrations){
        super(parent, undefined, name);
        this.name = CLASSNAMES.PROJECT_IMAGE_CONTAINER;
        this.parent = parent ? parent : "main";
        this.elements = illustrations.map(e=>ImageElement);
        this.images = illustrations;
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), 
                                    this.id, this.images[e]);
            element.initiate();
            element.load();
        }
    }
}

class PartnerImageContainerElement extends ImageContainerElement{
    constructor(parent, name, illustrations){
        super(parent, name, illustrations);
        this.name = CLASSNAMES.PARTNER;
    }
}
