class KartaPanel extends ContentPanel{
    static name = CLASSNAMES.LANDING_GENERAL;
    constructor(parent){
        super(parent, "");
        this.name = HomePanel.name;
        this.elements = [LocateButton, Karta, Scope]
    }
    
    load() {
        // Positioner.make();
        this.elements.forEach(el => {
            let element = new el(this.make_id(), "");
            element.initiate();
            element.load();
        });

    }
    show(display){
        this.getElement().style.display = display==false ? DISPLAY.NONE : DISPLAY.GRID;
    }
}
