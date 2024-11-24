class TabPanel extends CElement{
    
    
        constructor(parent){
            super(parent, "id");
            this.name = CLASSNAMES.TAB_PANEL;
            this.parent = parent ? parent : "body";
            this.id = "id";
            this.elements = {
                0: [],
                1: [],
                2: [],
                3: [],
                4: []
            }
        }
    
        load(categories) {
            this.elements.forEach(el =>{
                let element = new el(this.make_id(), "main");
                element.initiate();
                element.load();
            });
            categories.forEach(category =>{
                this.addCategory(category);
            });
        }
    
        addCategory(category){
            let div = new CategoryElement(this.make_id(), category, 
                                          this.activation, 
                                          this.filtering
                                        );
            div.initiate();
            div.load();
        }
    
        getElement(){
            let elements = document.getElementsByClassName(this.name);
            if (elements.length > 0){
                return elements[0];
            }
            return this.initiate();
        }
    
        getParent(){
            let elements = document.getElementsByClassName(this.parent);
            if (elements.length>0){
                return elements[0];
            }
        }
    
        initiate(){
            let panel = document.createElement("div");
            panel.setAttribute('class', this.name);
            panel.setAttribute("id", this.make_id());
            this.getParent().appendChild(panel);
            return panel;
        }    
    }


