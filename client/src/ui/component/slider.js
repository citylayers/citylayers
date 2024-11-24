class DoubleSlider extends CElement{
    
    constructor(parent, id, category){

        super(parent, id);
        this.parent = parent; //CLASSNAMES.CATEGORY_CONTAINER;
        this.category = category;
        this.name = CLASSNAMES.CATEGORY_SLIDER_CONTAINER;
        this.id = id;
        
    }


    static activate(category, value){
        let id = `${Slider._name}_categoryslider_${category}`;
        Slider.activate(`${id}_${SLIDER_IDS.LOW}` ,value);
        Slider.activate(`${id}_${SLIDER_IDS.HIGH}` ,value);

    }

    load(){

        let s1 = new Slider(this.make_id(), SLIDER_IDS.LOW);
        s1.initiate();

        let s2 = new Slider(this.make_id(), SLIDER_IDS.HIGH);
        s2.initiate();


        s1.limit(() => {s1.controlSlider(s2, true); 
            ConfigPanel.activation(this.category, 
                CategorySwitch.isActive(this.id) ? s1.getValue(): 0, 
                CategorySwitch.isActive(this.id) ? s2.getValue() : 0);
        });
        s2.limit(() => {s2.controlSlider(s1, false); 
            ConfigPanel.activation(this.category, 
                CategorySwitch.isActive(this.id) ? s1.getValue(): 0, 
                CategorySwitch.isActive(this.id) ? s2.getValue() : 0);
        });
        DoubleSlider.activate(this.id, false);

    }

    initiate() {
        let panel = document.createElement("div");
        panel.setAttribute('class', this.name);
        panel.setAttribute("id", this.make_id());
        this.getParent().appendChild(panel);
    }

    static getParsed(currentFrom, currentTo) {
        const from = parseInt(currentFrom.value, 10);
        const to = parseInt(currentTo.value, 10);
        return [from, to];
    }

    static getCurrentValue(category) {
        let d = document.getElementById(`categoryslider_${category}`)
        return { "min": d.children[0].value, "max": d.children[1].value };
    }

    fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
        const rangeDistance = to.max - to.min;
        const fromPosition = from.value - to.min;
        const toPosition = to.value - to.min;
        controlSlider.style.background = `linear-gradient(
          to right,
          ${sliderColor} 0%,
          ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
          ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
          ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
          ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
          ${sliderColor} 100%)`;
    }

    setToggleAccessible(currentTarget) {
        const toSlider = document.querySelector('#toSlider');
        if (Number(currentTarget.value) <= 0) {
            toSlider.style.zIndex = 2;
        } else {
            toSlider.style.zIndex = 0;
        }
    }
}

class Slider extends CElement {
    static _name = CLASSNAMES.SLIDER;
    
    constructor(parent, id) {
        super(parent);
        this.parent = parent; //CLASSNAMES.CATEGORY_SLIDER_CONTAINER;
        this.name = CLASSNAMES.SLIDER;
        this.id = id;
    }

    checkLimit(from, to) {
        if (from > to) {
            return false;
        }
        return true;
    }

    getElement() {
        return document.getElementById(this.make_id());
    }

    static activate(id, value){
        
        let res = value==undefined || value == true ? false : true;
        
        document.getElementById(`${id}`).disabled = res;
    }

    controlSlider(other, is_start) {
        const [from, to] = is_start ? DoubleSlider.getParsed(this.getElement(), other.getElement()) :
            DoubleSlider.getParsed(other.getElement(), this.getElement());

        //   fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);

        if (!this.checkLimit(from, to)) {
            if (is_start == true) {
                this.setValue(to);
            }
            else {
                this.setValue(from);
            }
        }
    }

    initiate() {
        let slider = document.createElement("input");
        slider.setAttribute("type", "range");
        slider.setAttribute("min", "0");
        slider.setAttribute("max", "100");
        slider.setAttribute("class", this.id.includes(SLIDER_IDS.HIGH) ? SLIDER_IDS.HIGH : SLIDER_IDS.LOW);
        slider.setAttribute("value", this.id.includes(SLIDER_IDS.HIGH) ? "100" : "0");
        slider.setAttribute("id", this.make_id());
        this.getParent().appendChild(slider);
    }

    limit(f) {

        this.getElement().oninput = f;
    }

    make_id() {
        return `${this.name}_${this.parent}_${this.id}`
    }

    getValue() {
        return this.getElement().value;
    }

    setValue(value) {
        this.getElement().value = value;
    }

}

class SliderLabelContainer extends CElement {
    
    constructor(parent, id, category) {
        super(parent);
        this.id = id;
        this.name = CLASSNAMES.SLIDER_LABEL_CONTAINER;
        this.parent = parent; //CLASSNAMES.CATEGORY_CONTAINER;
        this.elements = [SliderLabel, SliderLabel];
        this.labels = [category.low, category.high];
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), this.labels[e]);
            element.initiate();
        }
    }
}

class SliderLabel extends CElement {
    
    constructor(parent, id) {
        super(parent);
        this.name = CLASSNAMES.SLIDER_LABEL;
        this.id = id;
        this.parent = parent; //CLASSNAMES.SLIDER_LABEL_CONTAINER;
    }
    initiate() {
        let element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.id;
        this.getParent().appendChild(element);
    }
}
