import { ClassName, DisplayStyle } from "../../constants/ClassNames";
import { BaseComponent } from "../component/BaseComponent";

/**
 * Content panel base class for panels with dynamic content.
 * Extends BaseComponent with panel-specific functionality.
 *
 * Design Pattern: Template Method Pattern
 */
class ContentPanel extends BaseComponent {
    protected elements: any[];
    public name: string;
    public parent: string;

    constructor(parentId: string, id: string, content?: any) {
        super(parentId || "body", ClassName.CATEGORY_PANEL, id, content);
        this.elements = [];
        this.name = "";
        this.parent = parentId;
    }

    /**
     * Override getParent to handle body element
     */
    public getParent(): HTMLElement | null {
        if (this.parentId === "body") {
            return document.body;
        }
        return document.getElementById(this.parentId);
    }

    /**
     * Load child elements (legacy pattern support)
     */
    public load(categories?: any[], args?: any): void {
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
    public add(element: any, args: any): void {
        // To be implemented by subclasses
    }

    /**
     * Static method to activate/deactivate panels by class name
     */
    public static activate(on: boolean): void {
        const mode = on ? DisplayStyle.FLEX : DisplayStyle.NONE;
        const elements = document.getElementsByClassName(ClassName.CATEGORY_PANEL);
        if (elements.length > 0) {
            const el = elements[0] as HTMLElement;
            el.style.display = mode;
        }
    }
}

export { ContentPanel };