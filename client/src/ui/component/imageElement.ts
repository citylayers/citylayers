


/**
 * Image element component for displaying images.
 * Extends BaseComponent with proper OOP principles.
 */
class ImageElement extends BaseComponent {
    protected illustration:any;
    private clickHandler?: () => void;

    constructor(parentId: string, id: string, image?:any, className?: string) {
        super(parentId, className || ClassName.LOGO, id);
        this.illustration = image || new Illustration("", "", "");

        // Setup click handler if link exists
        if (this.illustration.link && this.illustration.link !== "") {
            this.clickHandler = () => {
                window.location.href = this.illustration.link;
            };
        }
    }

    protected getElementTag(): string {
        return 'img';
    }

    protected createElement(): HTMLElement {
        const element = super.createElement() as HTMLImageElement;
        element.src = this.illustration.path;
        return element;
    }

    protected afterInit(): void {
        if (this.clickHandler) {
            this.addEventListener('click', this.clickHandler);
        }
    }

    /**
     * Update image source
     */
    public setImage(illustration:any): void {
        this.illustration = illustration;
        const element = this.getElement() as HTMLImageElement;
        if (element) {
            element.src = illustration.path;
        }
    }
}

/**
 * Image preview element component.
 * Specialized ImageElement for image upload previews.
 */
class ImagePreviewElement extends BaseComponent {
    protected illustration:any;

    constructor(parentId: string, id?: string, className?: string) {
        super(parentId, className || ClassName.LOGO, ElementId.IMG_PREVIEW);
        this.illustration = new Illustration("", "", "Upload");
    }

    protected getElementTag(): string {
        return 'img';
    }

    protected createElement(): HTMLElement {
        const element = super.createElement() as HTMLImageElement;
        element.src = this.illustration.path;
        return element;
    }

    /**
     * Update preview image
     */
    public setImage(illustration:any): void {
        this.illustration = illustration;
        const element = this.getElement() as HTMLImageElement;
        if (element) {
            element.src = illustration.path;
        }
    }
}

