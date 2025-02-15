class Logo extends ImageElement {
    
    constructor(parent, illustration) {
        let content = illustration ? illustration : new Illustration("/images/logo_2.svg", "/");
        super(parent, uuidv4(), CLASSNAMES.LOGO, content);
        this.name = CLASSNAMES.LOGO;
         // U+02715
    }
}

class ColorLogo extends Logo {
    
    constructor(parent) {
        let content = new Illustration("/images/logo_full.svg", "/");
        super(parent, content);
        this.name = CLASSNAMES.LOGO;
    }
}

class LineLogo extends Logo {
    
    constructor(parent) {
        let content = new Illustration("/images/logo_2.svg", "/");
        super(parent, content);
        this.name = CLASSNAMES.LOGO;
    }
}