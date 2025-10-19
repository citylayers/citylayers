/**
 * Text element component for displaying formatted text.
 * Extends BaseComponent with proper OOP principles.
 */
class TextElement extends BaseComponent {
    constructor(parentId, id, content) {
        super(parentId, ClassName.TEXT, id);
        this.textContent = content ? content.replace(/\\n/g, "<br>") : "";
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.textContent;
        return element;
    }
    updateContent(element) {
        if (typeof this.content === 'string') {
            element.innerHTML = this.content.replace(/\\n/g, "<br>");
        }
    }
}
/**
 * Header element component.
 * Specialized TextElement with header styling.
 */
class HeaderElement extends BaseComponent {
    constructor(parentId, id, content) {
        super(parentId, ClassName.HEADER, id);
        this.textContent = content ? content.replace(/\\n/g, "<br>") : "";
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.textContent;
        return element;
    }
    updateContent(element) {
        if (typeof this.content === 'string') {
            element.innerHTML = this.content.replace(/\\n/g, "<br>");
        }
    }
}
