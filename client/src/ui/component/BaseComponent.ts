import { v4 as uuidv4 } from 'uuid';
import { DisplayStyle } from '../../constants/ClassNames';

/**
 * Base component class for UI elements.
 * Improved version of CElement with better OOP principles.
 *
 * Design Pattern: Template Method Pattern
 */
export abstract class BaseComponent {
    protected id: string;
    protected className: string;
    protected parentId: string;
    protected children: BaseComponent[];
    protected content: any;
    protected element: HTMLElement | null;

    constructor(parentId: string, className: string, id?: string, content?: any) {
        this.id = id || uuidv4();
        this.className = className;
        this.parentId = parentId;
        this.content = content;
        this.children = [];
        this.element = null;
    }

    /**
     * Get the DOM element
     */
    public getElement(): HTMLElement | null {
        if (!this.element) {
            this.element = document.getElementById(this.makeId());
        }
        return this.element;
    }

    /**
     * Get parent DOM element
     */
    public getParent(): HTMLElement | null {
        return document.getElementById(this.parentId);
    }

    /**
     * Create and append element to parent
     */
    public initiate(): void {
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
    protected createElement(): HTMLElement {
        const element = document.createElement(this.getElementTag());
        element.setAttribute('class', this.className);
        element.setAttribute('id', this.makeId());

        return element;
    }

    /**
     * Get HTML tag for element - override in subclasses if needed
     */
    protected getElementTag(): string {
        return 'div';
    }

    /**
     * Hook called after element initialization
     */
    protected afterInit(): void {
        // Override in subclasses
    }

    /**
     * Load child components
     */
    public load(): void {
        this.children.forEach(child => {
            child.initiate();
            child.load();
        });

        this.afterLoad();
    }

    /**
     * Hook called after loading children
     */
    protected afterLoad(): void {
        // Override in subclasses
    }

    /**
     * Add child component
     */
    public addChild(child: BaseComponent): void {
        this.children.push(child);
    }

    /**
     * Remove child component
     */
    public removeChild(child: BaseComponent): void {
        const index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    /**
     * Make element ID
     */
    protected makeId(): string {
        return `${this.className}_${this.id}`;
    }

    /**
     * Show or hide element
     */
    public show(visible: boolean, displayStyle: DisplayStyle = DisplayStyle.FLEX): void {
        const element = this.getElement();
        if (element) {
            element.style.display = visible ? displayStyle : DisplayStyle.NONE;
        }
    }

    /**
     * Set element content
     */
    public setContent(content: any): void {
        this.content = content;
        const element = this.getElement();
        if (element) {
            this.updateContent(element);
        }
    }

    /**
     * Update element content - override in subclasses
     */
    protected updateContent(element: HTMLElement): void {
        if (typeof this.content === 'string') {
            element.textContent = this.content;
        }
    }

    /**
     * Add event listener
     */
    public addEventListener(event: string, handler: EventListener): void {
        const element = this.getElement();
        if (element) {
            element.addEventListener(event, handler);
        }
    }

    /**
     * Remove event listener
     */
    public removeEventListener(event: string, handler: EventListener): void {
        const element = this.getElement();
        if (element) {
            element.removeEventListener(event, handler);
        }
    }

    /**
     * Add CSS class
     */
    public addClass(className: string): void {
        const element = this.getElement();
        if (element) {
            element.classList.add(className);
        }
    }

    /**
     * Remove CSS class
     */
    public removeClass(className: string): void {
        const element = this.getElement();
        if (element) {
            element.classList.remove(className);
        }
    }

    /**
     * Toggle CSS class
     */
    public toggleClass(className: string): void {
        const element = this.getElement();
        if (element) {
            element.classList.toggle(className);
        }
    }

    /**
     * Destroy component and remove from DOM
     */
    public destroy(): void {
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
    public getId(): string {
        return this.id;
    }

    /**
     * Get class name
     */
    public getClassName(): string {
        return this.className;
    }
}
