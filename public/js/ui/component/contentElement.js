/**
 * Content element component for generic content containers.
 * Extends BaseComponent with proper OOP principles.
 */
class ContentElement extends BaseComponent {
    constructor(parentId, id, content) {
        super(parentId || "main", "contentelement", id);
        this.htmlContent = content;
    }
    createElement() {
        const element = super.createElement();
        // Content is set via children, not innerHTML
        return element;
    }
}
