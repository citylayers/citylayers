/**
 * Horizontal rule element component.
 * Extends BaseComponent with proper OOP principles.
 */
class HrElement extends BaseComponent {
    constructor(parentId) {
        super(parentId, "");
    }
    getElementTag() {
        return 'hr';
    }
    /**
     * Static method to update gradient colors on hr element
     * Used by gradient color pickers
     */
    static updateColor(ev, gradientEnd) {
        const hrElements = document.getElementsByTagName("hr");
        if (hrElements.length > 0) {
            hrElements[0].style.setProperty(gradientEnd, ev.target.value);
        }
    }
}
