/**
 * Image element component for displaying images.
 * Extends BaseComponent with proper OOP principles.
 */
class ImageElement extends BaseComponent {
    constructor(parentId, id, image, className) {
        super(parentId, className || ClassName.LOGO, id);
        this.illustration = image || new Illustration("", "", "");
        // Setup click handler if link exists
        if (this.illustration.link && this.illustration.link !== "") {
            this.clickHandler = () => {
                window.location.href = this.illustration.link;
            };
        }
    }
    getElementTag() {
        return 'img';
    }
    createElement() {
        const element = super.createElement();
        element.src = this.illustration.path;
        return element;
    }
    afterInit() {
        if (this.clickHandler) {
            this.addEventListener('click', this.clickHandler);
        }
    }
    /**
     * Update image source
     */
    setImage(illustration) {
        this.illustration = illustration;
        const element = this.getElement();
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
    constructor(parentId, id, className) {
        super(parentId, className || ClassName.LOGO, ElementId.IMG_PREVIEW);
        this.illustration = new Illustration("", "", "Upload");
    }
    getElementTag() {
        return 'img';
    }
    createElement() {
        const element = super.createElement();
        element.src = this.illustration.path;
        return element;
    }
    /**
     * Update preview image
     */
    setImage(illustration) {
        this.illustration = illustration;
        const element = this.getElement();
        if (element) {
            element.src = illustration.path;
        }
    }
}
