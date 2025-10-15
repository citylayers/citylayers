import { BaseComponent } from "./BaseComponent";

/**
 * Pin button component for adding location pins.
 * Extends BaseComponent with proper OOP principles.
 */
class PinButton extends BaseComponent {
    private buttonContent: string;
    private onClickHandler: () => void;

    constructor(parentId: string, getCoordinates: () => { lat: number; lon: number }) {
        super(parentId, "pinButton primary-button");
        this.buttonContent = "Add a pin";
        this.onClickHandler = () => {
            const coords = getCoordinates();
            window.location.href = `/pin?lat=${coords.lat}&lng=${coords.lon}`;
        };
    }

    protected getElementTag(): string {
        return 'button';
    }

    protected createElement(): HTMLElement {
        const element = super.createElement();
        element.innerHTML = this.buttonContent;
        return element;
    }

    protected afterInit(): void {
        this.addEventListener('click', this.onClickHandler);
    }
}

export { PinButton };