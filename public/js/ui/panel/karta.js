class KartaPanel extends ContentPanel{
    constructor(parent){
        super(parent, "");
        this.name = CLASSNAMES.LANDING_GENERAL;
        this.elements = [LocateButton, Karta, Scope]
    }

    load() {
        // Positioner.make();
        this.elements.forEach(el => {
            let element = new el(this.makeId(), "");
            element.initiate();
            element.load();
        });

    }
    show(display){
        this.getElement().style.display = display==false ? DISPLAY.NONE : DISPLAY.GRID;
    }
}
