class InfoElement extends CElement{
    
    constructor(parent, id, exec){
        super(parent, id);
        this.content = "info"; 
        this.id = id;
        this.name = "material-symbols-outlined";
        this.exec = exec;  // ()=>{}
    }

    initiate() {
        var element = document.createElement("span");
        element.innerHTML = this.content;
        element.setAttribute('class', this.name);
        element.onclick = this.exec;
        this.getParent().appendChild(element);
    }
}