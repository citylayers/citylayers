class DoubleRangeContainerElement extends InputContainer{
    static name = CLASSNAMES.CATEGORY_SLIDER_CONTAINER;


    static getParsed(currentFrom, currentTo) {
        const from = parseInt(currentFrom.value, 10);
        const to = parseInt(currentTo.value, 10);
        return [from, to];
    }

    constructor(parent, id, content){
        super(parent, id, content);
    }

    load(controlTree){

        this.elements = [SLIDER_IDS.LOW, SLIDER_IDS.HIGH].map(s=>{
            let slider = new Slider(this.make_id(), s, this.content);
            slider.initiate(controlTree);
            return slider;
        });

        this.elements.forEach((el, i)=>{
            el.limit(()=>{el.controlSlider(this.elements[1-i], i==0);
                // ??
                this.updateDashboard();
            }
        )
        });
        
        this.activate(false);

    }

    action(ev, tree, next){
        tree.add(this.id, this.getCurrentValue());
        // this.activateNext(tree, next);

    }

    

    getCurrentValue() {
        
        return new Map(
            [
                [ RANGE_LABELS.MIN, this.elements[0].getValue()], 
                [RANGE_LABELS.MAX, this.elements[1].getValue()] 
            ]);
    }

    updateDashboard(){
        ConfigPanel.activation(this.content, this.elements[0].getValue(),this.elements[1].getValue());

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

class Slider extends RangeInputElement {
    
    constructor(parent, border, content) {
        super(parent, "", content);
        this.border = border;
    }

    action(ev, tree, next){
        tree.add(this.id, [this.border, this.getValue()]); // check how to set map values
        // this.activateNext(tree, next);

    }

    init_extra(element){
        super.init_extra(element);
        element.setAttribute("value", this.id.includes(SLIDER_IDS.HIGH) ? "100" : "0");
        element.setAttribute("class", this.id.includes(SLIDER_IDS.HIGH) ? SLIDER_IDS.HIGH : SLIDER_IDS.LOW);
    }

    make_id() {
        return `${this.name}_${this.parent}_${this.id}`
    }

    activate(value){
        let res = value==undefined || value == true ? false : true;
        this.getElement().disabled = res;
    }

    controlSlider(other, is_start) {
        //   fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
        const [from, to] = is_start ? DoubleSlider.getParsed(this.getElement(), other.getElement()) :
            DoubleSlider.getParsed(other.getElement(), this.getElement());

        if (from>=to) {
            this.setValue(is_start == true ? to : from);
        }
    }

    limit(f) {
        this.getElement().oninput = f;
    }

    getValue() {
        return this.getElement().value;
    }

    setValue(value) {
        this.getElement().value = value;
    }

}

