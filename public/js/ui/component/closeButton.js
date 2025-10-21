/**
 * Close button component.
 * Extends BaseComponent with proper OOP principles.
 */
class CloseButton extends BaseComponent {
    constructor(parentId, id, onClick) {
        super(parentId, ClassName.CLOSE, id);
        this.buttonContent = "✕"; // U+02715
        this.clickHandler = onClick || (() => { });
    }
    getElementTag() {
        return 'button';
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.buttonContent;
        return element;
    }
    afterInit() {
        this.addEventListener('click', this.clickHandler);
    }
}
