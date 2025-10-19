// QPanel is a global variable (defined in qPanel.ts)
// See client/src/types/global.d.ts for type declarations
/**
 * Double range slider component for category filtering
 * Extends InputContainer to manage two Slider instances
 */
class DoubleRangeContainerElement extends InputContainer {
    /**
     * Parse values from two slider elements
     */
    static getParsed(currentFrom, currentTo) {
        const from = parseInt(currentFrom.value, 10);
        const to = parseInt(currentTo.value, 10);
        return [from, to];
    }
    constructor(parent, id, content) {
        super(parent, id, content);
        this.elements = [];
    }
    /**
     * Load and initialize both low and high sliders
     */
    load(controlTree) {
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
    action(ev, tree, next) {
        // Use QPanel.tree directly (set globally on map page)
        const QPanel = window.QPanel;
        if (QPanel && QPanel.tree) {
            QPanel.tree.add(this.id, this.getCurrentValue());
        }
    }
    /**
     * Get current values of both sliders as a Map
     */
    getCurrentValue() {
        return new Map([
            [RANGE_LABELS.MIN, parseInt(this.elements[0].getValue())],
            [RANGE_LABELS.MAX, parseInt(this.elements[1].getValue())]
        ]);
    }
    /**
     * Update the dashboard/config panel with current values
     */
    updateDashboard() {
        // ConfigPanel.activation is called from external code
        const ConfigPanel = window.ConfigPanel;
        if (ConfigPanel) {
            ConfigPanel.activation(this.content, this.elements[0].getValue(), this.elements[1].getValue());
        }
    }
    /**
     * Activate or deactivate both sliders (called by Controller)
     */
    activate(on) {
        this.elements.forEach(el => el.activate(on));
    }
    /**
     * Fill slider track with gradient colors
     */
    fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
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
    setToggleAccessible(currentTarget) {
        const toSlider = document.querySelector('#toSlider');
        if (toSlider) {
            if (Number(currentTarget.value) <= 0) {
                toSlider.style.zIndex = '2';
            }
            else {
                toSlider.style.zIndex = '0';
            }
        }
    }
}
DoubleRangeContainerElement.componentName = ClassName.CATEGORY_SLIDER_CONTAINER;
/**
 * Individual slider component (low or high boundary)
 * Extends RangeInputElement with additional control logic
 */
class Slider extends RangeInputElement {
    constructor(parent, border, content) {
        super(parent, window.uuidv4(), content);
        this.border = border;
    }
    /**
     * Handle slider value change action
     */
    action(ev, tree, next) {
        tree.add(this.id, [this.border, this.getValue()]);
    }
    /**
     * Initialize extra attributes for the slider element
     */
    initExtra(element) {
        super.initExtra(element);
        const inputElement = element;
        const isHigh = this.id.includes(SLIDER_IDS.HIGH);
        inputElement.setAttribute("value", isHigh ? "100" : "0");
        inputElement.setAttribute("class", isHigh ? SLIDER_IDS.HIGH : SLIDER_IDS.LOW);
    }
    /**
     * Generate unique ID for slider
     */
    makeId() {
        return `${this.className}_${this.parentId}_${this.id}`;
    }
    /**
     * Enable or disable slider
     */
    activate(value) {
        const res = value === undefined || value === true ? false : true;
        const element = this.getElement();
        if (element) {
            element.disabled = res;
        }
    }
    /**
     * Control slider bounds relative to other slider
     */
    controlSlider(other, is_start) {
        const thisElement = this.getElement();
        const otherElement = other.getElement();
        if (!thisElement || !otherElement)
            return;
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
    limit(f) {
        const element = this.getElement();
        if (element) {
            element.oninput = f;
        }
    }
    /**
     * Get current slider value
     */
    getValue() {
        const element = this.getElement();
        return element ? element.value : '0';
    }
    /**
     * Set slider value
     */
    setValue(value) {
        const element = this.getElement();
        if (element) {
            element.value = value.toString();
        }
    }
}
// Export for backward compatibility
const DoubleSlider = DoubleRangeContainerElement;
