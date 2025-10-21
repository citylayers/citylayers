
/**
 * Content element component for generic content containers.
 * Extends BaseComponent with proper OOP principles.
 */
class ContentElement extends BaseComponent {
    private htmlContent: string;

    constructor(parentId: string, id: string, content: string) {
        super(parentId || "main", "contentelement", id);
        this.htmlContent = content;
    }

    protected createElement(): HTMLElement {
        const element = super.createElement();
        // Content is set via children, not innerHTML
        return element;
    }
}

