

class CategoryController extends ContentPanel{
    static name = CLASSNAMES.CATEGORY_CONTAINER;
    
    constructor(parent, category){
        super(parent, category.name);
        this.content = category;
        this.parent = parent ? parent : CLASSNAMES.CATEGORY_PANEL;
        this.elements = [
            ControllerHeader,
            ControllerBody
            // CategorySidePanel
        ];
        this.parts = [];
    }

    activate(on){
        this.parts.forEach(p=>p.activate(on));
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = 0;
            element = new this.elements[e](this.make_id(), this.content);

            // switch (this.elements[e]) {
            //     case (CategorySidePanel):
            //         element = new this.elements[e](this.make_id(),
            //             this.content);
            //         element.parent = "right-container";
            //         break;

            //     case (CategoryHeader): 
            //         element = new this.elements[e](this.make_id(), 
            //                         this.content.name, this.content);
            //         break;
            //     
            //     default:
            //         element = new this.elements[e](this.make_id(),
            //         this.content.name, this.content.subcategories);
            // }

            element.initiate();
            element.load((on)=>{this.activate(on)});
            this.parts.push(element);
        }
    }
}


class ControllerHeader extends CElement{
    
    constructor(parent, category){

        super(parent);
        // this.id = id;
        this.name = CLASSNAMES.CATEGORY_HEADER;
        this.category = category;
        // this.parent = parent; //CLASSNAMES.CATEGORY_CONTAINER;
        this.elements = [CategoryInfo, 
                        CategoryLabel, 
                        CategorySwitch,
                        ColorPickerElement,
                        ];
        this.args = [[this.category], 
                     [this.category], 
                     [this.category], 
                     ["color picker", (ev)=>{
                        colorpubsub.publish();
                     }]
                    ]
    }


    load(activation){
        let id = this.category.content.map(c=>c.answer)
            .filter(a=>a.type==ANSWERS.RANGE)[0].id;
        for (let e=0; e<this.elements.length; e++){
            let element = new this.elements[e](this.make_id(), id, ...this.args[e]);

            element.initiate(activation);
        }
    }

    activate(on){

    }
}

class ControllerBody extends CElement{
    
    constructor(parent, category){
        super(parent);
        // this.id = id;
        this.name = CLASSNAMES.CONTROLLER_BODY;
        this.category = category;
        this.questions = [];
        
        // this.parent = parent; //CLASSNAMES.CATEGORY_CONTAINER;
        // this.elements = [ControlQuestion];
    }

    load(){
        this.category.content.forEach(
            qa=>{

                let element = new ControlQuestion(this.make_id(), qa);
                element.initiate();
                element.load();
                element.activate(false);
                this.questions.push(element);
            }
        );
    }

    activate(on){
        this.questions.forEach(q=>q.activate(on));
    }
}

class ControlQuestion extends CElement{
    
    constructor(parent, qa){
        super(parent);
        // this.id = id;
        this.name = CLASSNAMES.CONTROLLER_Q;
        this.content = ControllerParser.fromNode(qa.answer);
        this.elements = [];
    }

    activate(on){
        
        this.content.activate(on);
    }


    load(){
        this.content.make(this.make_id());
        // for (let e=0; e<this.elements.length; e++){
        //     let element = new this.elements[e](this.make_id(), this.id, this.category);
        //     element.initiate();
        // }
    }
}


class CategoryLabel extends CElement{
    

    constructor(parent, id, content){

        super(parent);
        // this.id = id;
        this.content = content;
        this.name = CLASSNAMES.CATEGORY_HEADER_TITLE;
        this.parent = parent; //CLASSNAMES.CATEGORY_HEADER;
    }
    initiate() {
        let element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content.name;
        this.getParent().appendChild(element);
    }
}

class CategorySwitch extends Switch{
    static _name = CLASSNAMES.CATEGORY_SWITCH;

    constructor(parent, id, category){
        super(parent, id, category);
        this.name = CLASSNAMES.CATEGORY_SWITCH;
        
    }

    initiate(activation) {
        let element = document.createElement("label");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);

        let e1 = document.createElement("input");
        e1.setAttribute("type", "checkbox");

        e1.onchange = (ev)=>{

            // update map observations
            // activate sliders and tags
            
            activation(CategorySwitch.isActive(this.make_id()));
            let id = this.category.content.map(c=>c.answer)
            .filter(a=>a.type==ANSWERS.RANGE)[0].id;
            let slider = document.getElementById(`categoryslider_${id}`);

            CategorySwitch.isActive(this.make_id()) ?
            tree.add(id, new Map(
            [
                [RANGE_LABELS.MIN, slider.children[0].value],
                [RANGE_LABELS.MAX, slider.children[1].value],
            ]
        )) : tree.remove(id);

            // CityLayersPanel.activation(this.category, 
            //                 CategorySwitch.isActive(this.id) ? DoubleSlider.getCurrentValue(this.id).min : 0, 
            //                 CategorySwitch.isActive(this.id) ? DoubleSlider.getCurrentValue(this.id).max : 0);
            // DoubleSlider.activate(this.id, CategorySwitch.isActive(this.id));

        }
        let e2 = document.createElement("span");
        element.appendChild(e1);
        element.appendChild(e2);

    }
}


class CategoryInfo extends CElement{
    
    constructor(parent, id, category){
        super(parent, id);
        this.content = "info"; 
        this.id = id;
        this.name = "material-symbols-outlined";
        this.category = category;
    }

    initiate() {
        var element = document.createElement("span");
        element.innerHTML = this.content;
        element.setAttribute('class', this.name);
        element.onclick = ()=>{
             CategorySidePanel.toggle(this.category);            
        };
        this.getParent().appendChild(element);
    }
}





