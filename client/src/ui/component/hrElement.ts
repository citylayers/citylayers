
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

    /**
     * Static method to update gradient colors on hr element
     * Used by gradient color pickers
     */
    static updateColor(ev: Event, gradientEnd: string): void {
        const hrElements = document.getElementsByTagName("hr");
        if (hrElements.length > 0) {
            (hrElements[0] as HTMLElement).style.setProperty(gradientEnd, (ev.target as HTMLInputElement).value);
        }
    }
}

