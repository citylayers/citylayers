// QPanel is a global variable (defined in qPanel.ts)
// See client/src/types/global.d.ts for type declarations

/**
 * Double range slider component for category filtering
 * Extends InputContainer to manage two Slider instances
 */
class DoubleRangeContainerElement extends InputContainer {
    static readonly componentName = ClassName.CATEGORY_SLIDER_CONTAINER;
    public elements: Slider[];

    /**
     * Parse values from two slider elements
     */
    static getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement): [number, number] {
        const from = parseInt(currentFrom.value, 10);
        const to = parseInt(currentTo.value, 10);
        return [from, to];
    }

    constructor(parent: string, id: string, content?: any) {
        super(parent, id, content);
        this.name = ClassName.CATEGORY_SLIDER_CONTAINER;
        this.elements = [];
    }

    /**
     * Load and initialize both low and high sliders
     */
    load(controlTree?: any): void {
        this.elements = [SLIDER_IDS.LOW, SLIDER_IDS.HIGH].map(s => {
            let slider = new Slider(this.makeId(), s, this.content);
            slider.initiate(controlTree);
            return slider;
        });

        this.elements.forEach((el, i) => {
            el.limit(() => {
                el.controlSlider(this.elements[1 - i], i == 0);
                this.action();
            });
        });

        this.activate(false);
    }

    /**
     * Handle action when slider value changes
     */
    action(ev?: Event, tree?: any, next?: Map<string, string>): void {
        // Map page uses window.tree (ControlTree)
        // Pin page uses QPanel.tree (AnswerTree)
        const controlTree = (window as any).tree || (window as any).QPanel?.tree;

        if (controlTree) {
            controlTree.add(this.id, this.getCurrentValue());
        } else {
            console.warn("No tree available for slider update!");
        }
    }

    /**
     * Get current values of both sliders as a Map
     */
    getCurrentValue(): Map<string, number> {
        return new Map([
            [RANGE_LABELS.MIN, parseInt(this.elements[0].getValue())],
            [RANGE_LABELS.MAX, parseInt(this.elements[1].getValue())]
        ]);
    }

    /**
     * Update the dashboard/config panel with current values
     */
    updateDashboard(): void {
        // ConfigPanel.activation is called from external code
        const ConfigPanel = (window as any).ConfigPanel;
        if (ConfigPanel) {
            ConfigPanel.activation(
                this.content,
                this.elements[0].getValue(),
                this.elements[1].getValue()
            );
        }
    }

    /**
     * Activate or deactivate both sliders (called by Controller)
     */
    activate(on: boolean): void {
        this.elements.forEach(el => el.activate(on));
    }

    /**
     * Fill slider track with gradient colors
     */
    fillSlider(
        from: HTMLInputElement,
        to: HTMLInputElement,
        sliderColor: string,
        rangeColor: string,
        controlSlider: HTMLElement
    ): void {
        const rangeDistance = parseInt(to.max) - parseInt(to.min);
        const fromPosition = parseInt(from.value) - parseInt(to.min);
        const toPosition = parseInt(to.value) - parseInt(to.min);

        controlSlider.style.background = `linear-gradient(
          to right,
          ${sliderColor} 0%,
          ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
          ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
          ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%,
          ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%,
          ${sliderColor} 100%)`;
    }

    /**
     * Set z-index for proper slider overlay behavior
     */
    setToggleAccessible(currentTarget: HTMLInputElement): void {
        const toSlider = document.querySelector('#toSlider') as HTMLElement;
        if (toSlider) {
            if (Number(currentTarget.value) <= 0) {
                toSlider.style.zIndex = '2';
            } else {
                toSlider.style.zIndex = '0';
            }
        }
    }
}

/**
 * Individual slider component (low or high boundary)
 * Extends RangeInputElement with additional control logic
 */
class Slider extends RangeInputElement {
    protected border: string;

    constructor(parent: string, border: string, content?: any) {
        super(parent, (window as any).uuidv4(), content);
        this.border = border;
    }

    /**
     * Handle slider value change action
     */
    protected action(ev: Event, tree: any, next?: Map<string, string>): void {
        tree.add(this.id, [this.border, this.getValue()]);
    }

    /**
     * Initialize extra attributes for the slider element
     */
    protected initExtra(element: HTMLElement): void {
        super.initExtra(element);
        const inputElement = element as HTMLInputElement;

        const isHigh = this.border === SLIDER_IDS.HIGH;
        inputElement.setAttribute("value", isHigh ? "100" : "0");
        inputElement.setAttribute("class", isHigh ? SLIDER_IDS.HIGH : SLIDER_IDS.LOW);
    }

    /**
     * Generate unique ID for slider
     */
    makeId(): string {
        return `${this.className}_${this.parentId}_${this.id}`;
    }

    /**
     * Enable or disable slider
     */
    activate(value?: boolean): void {
        const res = value === undefined || value === true ? false : true;
        const element = this.getElement() as HTMLInputElement;
        if (element) {
            element.disabled = res;
        }
    }

    /**
     * Control slider bounds relative to other slider
     */
    controlSlider(other: Slider, is_start: boolean): void {
        const thisElement = this.getElement() as HTMLInputElement;
        const otherElement = other.getElement() as HTMLInputElement;

        if (!thisElement || !otherElement) return;

        const [from, to] = is_start
            ? DoubleRangeContainerElement.getParsed(thisElement, otherElement)
            : DoubleRangeContainerElement.getParsed(otherElement, thisElement);

        if (from >= to) {
            this.setValue(is_start ? to : from);
        }
    }

    /**
     * Attach input event listener
     */
    limit(f: () => void): void {
        const element = this.getElement() as HTMLInputElement;
        if (element) {
            element.oninput = f;
        }
    }

    /**
     * Get current slider value
     */
    getValue(): string {
        const element = this.getElement() as HTMLInputElement;
        return element ? element.value : '0';
    }

    /**
     * Set slider value
     */
    setValue(value: number): void {
        const element = this.getElement() as HTMLInputElement;
        if (element) {
            element.value = value.toString();
        }
    }
}

// Export for backward compatibility
const DoubleSlider = DoubleRangeContainerElement;
