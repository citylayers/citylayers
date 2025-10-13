import { ClassName } from "../../constants/ClassNames";
import { BaseComponent } from "./BaseComponent";

/**
 * Close button component.
 * Extends BaseComponent with proper OOP principles.
 */
class CloseButton extends BaseComponent {
    private content: string;
    private clickHandler: () => void;

    constructor(parentId: string, id: string, onClick?: () => void) {
        super(parentId, ClassName.CLOSE, id);
        this.content = "✕"; // U+02715
        this.clickHandler = onClick || (() => {});
    }

    protected getElementTag(): string {
        return 'button';
    }

    protected createElement(): HTMLElement {
        const element = super.createElement();
        element.innerHTML = this.content;
        return element;
    }

    protected afterInit(): void {
        this.addEventListener('click', this.clickHandler);
    }
}

export { CloseButton };