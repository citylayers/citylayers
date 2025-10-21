

/**
 * Link element component for clickable links.
 * Extends BaseComponent with proper OOP principles.
 */
class LinkElement extends BaseComponent {
    private link: string;
    private textContent: string;

    constructor(parentId: string, id: string, content: string[]) {
        super(parentId, ClassName.TEXT, id);
        this.textContent = content[0];
        this.link = content[1];
    }

    protected createElement(): HTMLElement {
        // Create anchor element with text directly inside
        const anchor = document.createElement("a");
        anchor.href = this.link;
        anchor.setAttribute('class', this.className);
        anchor.setAttribute('id', this.makeId());
        anchor.innerHTML = this.textContent;

        // Append anchor to parent
        const parent = this.getParent();
        if (parent) {
            parent.appendChild(anchor);
        }

        return anchor; // Return anchor as the tracked element
    }
}

