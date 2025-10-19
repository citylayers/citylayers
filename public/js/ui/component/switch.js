
class Switch extends CElement{
    
    static activate = ()=>{};
    static _name = CLASSNAMES.SWITCH;
    constructor(parent, id, category){

        super(parent, id);
        this.name = CLASSNAMES.SWITCH;
        // this.id = `${id}`;
        
        this.category = category;
        this.parent = parent; //CLASSNAMES.CATEGORY_HEADER;
    }

    static isActive(label) {
        let d = document.getElementById(`${label}`);
        return d.children[0].checked;
    }

    initiate() {
        let element = document.createElement("label");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);

        let e1 = document.createElement("input");
        e1.setAttribute("type", "checkbox");

        e1.onchange = ()=>{
            this.activate();

        }
        let e2 = document.createElement("span");
        element.appendChild(e1);
        element.appendChild(e2);

    }
}