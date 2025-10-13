import { BaseComponent } from "./BaseComponent";

/**
 * Horizontal rule element component.
 * Extends BaseComponent with proper OOP principles.
 */
class HrElement extends BaseComponent {
    constructor(parentId: string) {
        super(parentId, "");
    }

    protected getElementTag(): string {
        return 'hr';
    }
}

export { HrElement };