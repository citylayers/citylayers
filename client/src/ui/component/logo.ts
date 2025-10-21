


/**
 * Logo component.
 * Extends ImageElement with logo-specific behavior.
 */
class Logo extends ImageElement {
    constructor(parentId: string, illustration?:any) {
        const content = illustration || new Illustration("/images/logo_2.svg", "/");
        super(parentId, ClassName.LOGO, content, ClassName.LOGO);
    }
}

/**
 * Color logo variant.
 */
class ColorLogo extends ImageElement {
    constructor(parentId: string) {
        const content = new Illustration("/images/logo_full.svg", "/");
        super(parentId, ClassName.LOGO, content, ClassName.LOGO);
    }
}

/**
 * Line logo variant.
 */
class LineLogo extends ImageElement {
    constructor(parentId: string) {
        const content = new Illustration("/images/logo_2.svg", "/");
        super(parentId, ClassName.LOGO, content, ClassName.LOGO);
    }
}

