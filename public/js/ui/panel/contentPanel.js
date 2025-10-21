/**
 * Content panel base class for panels with dynamic content.
 * Extends BaseComponent with panel-specific functionality.
 *
 * Design Pattern: Template Method Pattern
 */
class ContentPanel extends BaseComponent {
    constructor(parentId, id, content) {
        super(parentId || "body", "", id, content); // className set by subclass via this.name
        this.elements = [];
        this.name = "";
        this.parent = parentId;
    }
    /**
     * Override createElement to use this.name as className
     */
    createElement() {
        const element = document.createElement(this.getElementTag());
        element.setAttribute('class', this.name || ClassName.CATEGORY_PANEL);
        element.setAttribute('id', this.makeId());
        return element;
    }
    /**
     * Override makeId to use this.name instead of this.className
     */
    makeId() {
        return `${this.name || this.className}_${this.id}`;
    }
    /**
     * Override getParent to handle body element
     */
    getParent() {
        if (this.parentId === "body") {
            return document.body;
        }
        return document.getElementById(this.parentId);
    }
    /**
     * Load child elements (legacy pattern support)
     */
    load(categories, args) {
        // Legacy load pattern for old-style elements
        this.elements.forEach(el => {
            let element = new el(this.makeId(), this.id);
            element.initiate();
            element.load();
        });
        // Modern pattern: load BaseComponent children
        super.load();
    }
    /**
     * Add element (placeholder for subclass implementations)
     */
    add(element, args) {
        // To be implemented by subclasses
    }
    /**
     * Static method to activate/deactivate panels by class name
     */
    static activate(on) {
        const mode = on ? DisplayStyle.FLEX : DisplayStyle.NONE;
        const elements = document.getElementsByClassName(ClassName.CATEGORY_PANEL);
        if (elements.length > 0) {
            const el = elements[0];
            el.style.display = mode;
        }
    }
}
