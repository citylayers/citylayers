import { CLASSNAMES } from "../../../classnames";
// import {ContentElement} from "./contentElement";
import { Illustration } from "../../../../logic/illustration";
import { ImageElement } from "./imageElement";


class Logo extends ImageElement {
    content: Illustration;
    constructor(parent:string, illustration?:Illustration) {
        let content = illustration ? illustration : new Illustration("/images/logo_2.svg", "/");
        super(parent, CLASSNAMES.LOGO, content);
        this.name = CLASSNAMES.LOGO;
         // U+02715
    }
}

class ColorLogo extends Logo {
    content: Illustration;
    constructor(parent:string) {
        let content = new Illustration("/images/logo_full.svg", "/");
        super(parent, content);
        this.name = CLASSNAMES.LOGO;
    }
}

class LineLogo extends Logo {
    content: Illustration;
    constructor(parent:string) {
        let content = new Illustration("/images/logo_2.svg", "/");
        super(parent, content);
        this.name = CLASSNAMES.LOGO;
    }
}

export {Logo, ColorLogo, LineLogo};