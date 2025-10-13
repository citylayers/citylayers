import { BaseComponent } from "./BaseComponent";

/**
 * Scope image component.
 * Extends BaseComponent with proper OOP principles.
 */
class Scope extends BaseComponent {
    private imageSrc: string;

    constructor(parentId: string) {
        super(parentId, "scope");
        this.imageSrc = "/images/scope.svg";
    }

    protected getElementTag(): string {
        return 'img';
    }

    protected createElement(): HTMLElement {
        const element = super.createElement() as HTMLImageElement;
        element.src = this.imageSrc;
        return element;
    }
}

export { Scope };