class Dashboard extends ContentPanel{
    static name = CLASSNAMES.DASHBOARD;
    constructor(parent){
        super(parent, "");
        this.name = Dashboard.name;
        this.elements = [ConfigPanel, Karta];
    }
    
    load(config) {
        // Positioner.make();
        
        this.elements.forEach(el => {
            let element = new el(this.make_id(), "");
            element.initiate();
            
            if (el==ConfigPanel){
                element.load(config.qas);
            }
            else{
                element.load(config);
            }
            
        });

    }
    show(display){
        this.getElement().style.display = display==false ? DISPLAY.NONE : DISPLAY.GRID;
    }
}
