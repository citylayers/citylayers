

/**
 * Text element component for displaying formatted text.
 * Extends BaseComponent with proper OOP principles.
 */
class TextElement extends BaseComponent {
    protected textContent: string;
    public name: string;

    constructor(parentId: string, id: string, content?: string) {
        super(parentId, ClassName.TEXT, id);
        this.textContent = content ? content.replace(/\\n/g, "<br>") : "";
    }

    protected createElement(): HTMLElement {
        const element = super.createElement();
        element.innerHTML = this.textContent;
        return element;
    }

    protected updateContent(element: HTMLElement): void {
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
    protected textContent: string;

    constructor(parentId: string, id: string, content?: string) {
        super(parentId, ClassName.HEADER, id);
        this.textContent = content ? content.replace(/\\n/g, "<br>") : "";
    }

    protected createElement(): HTMLElement {
        const element = super.createElement();
        element.innerHTML = this.textContent;
        return element;
    }

    protected updateContent(element: HTMLElement): void {
        if (typeof this.content === 'string') {
            element.innerHTML = this.content.replace(/\\n/g, "<br>");
        }
    }
}

