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

    load(){
        
        this.elements = [SLIDER_IDS.LOW, SLIDER_IDS.HIGH].map(s=>{
            let slider = new Slider(this.make_id(), s, this.content);
            slider.initiate();
            return slider;
        });

        this.elements.forEach((el, i)=>{
            el.limit((ev)=>{
                el.controlSlider(this.elements[1-i], i==0);
                // ??
                this.action(ev);
                // this.updateDashboard();
            }
        )
        });
        
        this.activate(false);

    }

    action(ev, next){
        QPanel.tree.add(this.id, this.getCurrentValue());
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
        ConfigPanel.activation(this.content, this.elements[0].getValue(), 
            this.elements[1].getValue());

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
        super(parent, uuidv4(), content);
        this.border = border;
    }

    action(ev, next){
        // tree.add(this.id, [this.border, this.getValue()]); // check how to set map values
        // this.activateNext(tree, next);

    }

    isUpperLimit(){
        return this.border == SLIDER_IDS.HIGH;
    }

    init_extra(element){
        
        super.init_extra(element);
        element.setAttribute("value", this.isUpperLimit() ? "100" : "0");
        element.setAttribute("class", this.isUpperLimit() ? SLIDER_IDS.HIGH : SLIDER_IDS.LOW);
    }


    activate(value){
        let res = value==undefined || value == true ? false : true;
        this.getElement().disabled = res;
    }

    controlSlider(other, is_start) {
        //   fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
        const [from, to] = is_start ? DoubleRangeContainerElement.getParsed(this.getElement(), other.getElement()) :
        DoubleRangeContainerElement.getParsed(other.getElement(), this.getElement());

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

