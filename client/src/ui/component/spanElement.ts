import { BaseComponent } from "./BaseComponent";

/**
 * Span element component for inline text.
 * Extends BaseComponent with proper OOP principles.
 */
class SpanElement extends BaseComponent {
    private htmlContent: string;

    constructor(parentId: string, id: string, content?: string) {
        super(parentId, "", id);
        this.htmlContent = content || "";
    }

    protected getElementTag(): string {
        return 'span';
    }

    protected createElement(): HTMLElement {
        const element = super.createElement();
        element.innerHTML = this.htmlContent;
        return element;
    }
}

export { SpanElement };