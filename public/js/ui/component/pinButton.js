/**
 * Pin button component for adding location pins.
 * Extends BaseComponent with proper OOP principles.
 */
class PinButton extends BaseComponent {
    constructor(parentId, getCoordinates) {
        super(parentId, "pinButton primary-button");
        this.buttonContent = "Add a pin";
        this.onClickHandler = () => {
            const coords = getCoordinates();
            window.location.href = `/pin?lat=${coords.lat}&lng=${coords.lon}`;
        };
    }
    getElementTag() {
        return 'button';
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.buttonContent;
        return element;
    }
    afterInit() {
        this.addEventListener('click', this.onClickHandler);
    }
}
