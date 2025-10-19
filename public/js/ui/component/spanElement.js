/**
 * Span element component for inline text.
 * Extends BaseComponent with proper OOP principles.
 */
class SpanElement extends BaseComponent {
    constructor(parentId, id, content) {
        super(parentId, "", id);
        this.htmlContent = content || "";
    }
    getElementTag() {
        return 'span';
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.htmlContent;
        return element;
    }
}
