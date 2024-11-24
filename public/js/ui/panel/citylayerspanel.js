
class CityLayersPanel extends CElement{
    static name = CLASSNAMES.MAIN_PANEL;
    markertoggle = ()=>{console.log("No action assigned")}; // callback to toggle markers
    activation = ()=>{}; // callback to activate observations' categories or to filter observations
    getCoords = ()=>{}; // callback to get current coordinates
    activateProject = ()=>{};  // callback to activate a project

    constructor(parent){
        super(parent, "id");
        this.name = CLASSNAMES.MAIN_PANEL;
        this.parent = parent ? parent : "body";
        this.id = "id";
        this.elements = [
            LineLogo, 
            PanelHeader, 
            // ConfigPanel,
            //ProjectContentPanel, 
            PinButton];
    }

    static getId(){
        return document.getElementsByClassName(CLASSNAMES.MAIN_PANEL)[0].id;
    }

    static switch(config, enableToProjects){
        
        this._configPanel(config);
        ProjectContentPanel.activate(config==undefined);
        if (enableToProjects==true){
            ToProjects.activate(config!=undefined);
        }
        else{
            ToProjects.hide();
        }
        
        return;
    }

    static _configPanel(config){
        if (config==undefined){
            ConfigPanel.remove();
            return;
        }
        let element = new ConfigPanel(this.getId(), "main");
        element.initiate();
        element.load(config);
        return;
    }

    load(projects) {
        this.elements.forEach(el => {
            let element = new el(this.make_id(), "main");
            element.initiate();
            if (el==ConfigPanel){
                //element.activate(false);
            }
            else{
                element.load(projects);
            }
        });

    }

    getElement() {
        let elements = document.getElementsByClassName(this.name);
        if (elements.length > 0) {
            return elements[0];
        }
        return this.initiate();
    }

    getParent() {
        let elements = document.getElementsByClassName(this.parent);
        if (elements.length > 0) {
            return elements[0];
        }
    }

    initiate() {
        let panel = document.createElement("div");
        panel.setAttribute('class', this.name);
        panel.setAttribute("id", this.make_id());
        this.getParent().appendChild(panel);
        return panel;
    }
}
