/**
 * Scope image component.
 * Extends BaseComponent with proper OOP principles.
 */
class Scope extends BaseComponent {
    constructor(parentId) {
        super(parentId, "scope");
        this.imageSrc = "/images/scope.svg";
    }
    getElementTag() {
        return 'img';
    }
    createElement() {
        const element = super.createElement();
        element.src = this.imageSrc;
        return element;
    }
}
