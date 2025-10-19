

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
        // Create anchor element
        const anchor = document.createElement("a");
        anchor.href = this.link;

        // Create div with content inside anchor
        const div = document.createElement("div");
        div.setAttribute('class', this.className);
        div.setAttribute('id', this.makeId());
        div.innerHTML = this.textContent;

        anchor.appendChild(div);

        // Append anchor to parent instead of div
        const parent = this.getParent();
        if (parent) {
            parent.appendChild(anchor);
        }

        return div; // Return div as the tracked element
    }
}

