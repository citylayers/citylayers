class ImageElement extends CElement {
    
    constructor(parent, id, classname, image) {
        // image is instance of Illustration
        super(parent, id);
        this.name = classname ? classname : CLASSNAMES.LOGO;
        this.content = image; // Illustration
    }

    initiate() {
        
        let element = document.createElement("img");
        element.src = this.content.path;
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        if (this.content.link!="" && this.content.link!=undefined && this.content.link!=null){
            element.addEventListener("click", () => {
                window.location.href = this.content.link;
            });
        }
        this.getParent().appendChild(element);
    }
}

class ImagePreviewElement extends ImageElement {
    
    constructor(parent, id, classname) {
        // image is instance of Illustration
        super(parent, id);
        this.name = classname? classname : CLASSNAMES.LOGO;
        this.id = IDS.IMG_PREVIEW;
        this.content = new Illustration("", "", "Upload"); // Illustration
    }

    initiate() {
        
        let element = document.createElement("img");
        element.src = this.content.path;
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.id);
        this.getParent().appendChild(element);
    }
}

