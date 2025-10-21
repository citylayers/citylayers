/**
 * Base component class for UI elements.
 * Improved version of CElement with better OOP principles.
 *
 * Design Pattern: Template Method Pattern
 */
class BaseComponent {
    constructor(parentId, className, id, content) {
        this.id = id || window.uuidv4();
        this.className = className;
        this.parentId = parentId;
        this.content = content;
        this.children = [];
        this.element = null;
    }
    /**
     * Get the DOM element
     */
    getElement() {
        if (!this.element) {
            this.element = document.getElementById(this.makeId());
        }
        return this.element;
    }
    /**
     * Get parent DOM element
     */
    getParent() {
        return document.getElementById(this.parentId);
    }
    /**
     * Create and append element to parent
     */
    initiate() {
        const parent = this.getParent();
        if (!parent) {
            console.error(`Parent element not found: ${this.parentId}`);
            return;
        }
        const element = this.createElement();
        parent.appendChild(element);
        this.element = element;
        this.afterInit();
    }
    /**
     * Create the DOM element - override in subclasses
     */
    createElement() {
        const element = document.createElement(this.getElementTag());
        element.setAttribute('class', this.className);
        element.setAttribute('id', this.makeId());
        return element;
    }
    /**
     * Get HTML tag for element - override in subclasses if needed
     */
    getElementTag() {
        return 'div';
    }
    /**
     * Hook called after element initialization
     */
    afterInit() {
        // Override in subclasses
    }
    /**
     * Load child components
     */
    load() {
        this.children.forEach(child => {
            child.initiate();
            child.load();
        });
        this.afterLoad();
    }
    /**
     * Hook called after loading children
     */
    afterLoad() {
        // Override in subclasses
    }
    /**
     * Add child component
     */
    addChild(child) {
        this.children.push(child);
    }
    /**
     * Remove child component
     */
    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
    /**
     * Make element ID
     */
    makeId() {
        return `${this.className}_${this.id}`;
    }
    /**
     * Show or hide element
     */
    show(visible, displayStyle = DisplayStyle.FLEX) {
        const element = this.getElement();
        if (element) {
            element.style.display = visible ? displayStyle : DisplayStyle.NONE;
        }
    }
    /**
     * Set element content
     */
    setContent(content) {
        this.content = content;
        const element = this.getElement();
        if (element) {
            this.updateContent(element);
        }
    }
    /**
     * Update element content - override in subclasses
     */
    updateContent(element) {
        if (typeof this.content === 'string') {
            element.textContent = this.content;
        }
    }
    /**
     * Add event listener
     */
    addEventListener(event, handler) {
        const element = this.getElement();
        if (element) {
            element.addEventListener(event, handler);
        }
    }
    /**
     * Remove event listener
     */
    removeEventListener(event, handler) {
        const element = this.getElement();
        if (element) {
            element.removeEventListener(event, handler);
        }
    }
    /**
     * Add CSS class
     */
    addClass(className) {
        const element = this.getElement();
        if (element) {
            element.classList.add(className);
        }
    }
    /**
     * Remove CSS class
     */
    removeClass(className) {
        const element = this.getElement();
        if (element) {
            element.classList.remove(className);
        }
    }
    /**
     * Toggle CSS class
     */
    toggleClass(className) {
        const element = this.getElement();
        if (element) {
            element.classList.toggle(className);
        }
    }
    /**
     * Destroy component and remove from DOM
     */
    destroy() {
        // Destroy children first
        this.children.forEach(child => child.destroy());
        this.children = [];
        // Remove from DOM
        const element = this.getElement();
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
        this.element = null;
    }
    /**
     * Get component ID
     */
    getId() {
        return this.id;
    }
    /**
     * Get class name
     */
    getClassName() {
        return this.className;
    }
}
