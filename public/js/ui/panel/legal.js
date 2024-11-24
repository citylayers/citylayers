

class LegalPanel extends ContentPanel{
    constructor(parent, content){
        super(parent);
        this.name = LEGAL_CLASSNAMES.PANEL;
        this.elements = [LegalHeader, LegalBody];
        this.content = content;
    }

    getParent(){
        let els = document.getElementsByClassName(this.parent);
        return els.length>0 ? els[0] : document.body;
    }

    initiate() {
        var element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), undefined, this.content);
            element.initiate();
            element.load();
        }
    }
}

class LegalHeader extends ContentPanel{
    constructor(parent, name, content){
        super(parent);
        this.name = name? name : LEGAL_CLASSNAMES.HEADER;
        this.content = content;
        this.elements = [Logo, CloseButton];
        this.args = [CLASSNAMES.LOGO , ()=>{location.href = "/"}, content[0].name]
    }

    initiate() {
        var element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), this.id, this.args[e]);
            element.initiate();
        }
    }
}

class LegalBody extends ContentPanel{
    constructor(parent, name, content){
        super(parent);
        this.name = name? name : LEGAL_CLASSNAMES.BODY;
        this.content = content;
        this.elements = [LegalText, LegalBodyContent]; 
        this.classes = [LEGAL_CLASSNAMES.TITLE, LEGAL_CLASSNAMES.LEGALBODYCONTENT]
        this.args = [content[0].title, content];
    }

    initiate() {
        var element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {

            
            let element = new this.elements[e](this.make_id(), 
                                    this.classes[e], 
                                    e < this.args.length ? this.args[e] : undefined
                                );
            element.initiate();
            element.load();
        }
    }
}

class LegalBodyContent extends ContentPanel{
    constructor(parent, name, content){
        super(parent);
        this.name = name? name : LEGAL_CLASSNAMES.BODY;
        this.content = content;
        
        this.elements = [...content.map(e=> (e.link!=undefined && e.link!=null && e.link!="") ? LegalLinkText : LegalText)]; 
        this.classes = [ ...content.map(e=> e.formatting==1 ? LEGAL_CLASSNAMES.TEXT_F : LEGAL_CLASSNAMES.TEXT)]
        this.args = [...content.map(e=> e.content)];
    }

    initiate() {
        let suffix = location.href.endsWith("dataprivacyandprotection") || location.href.endsWith("accessibility") ? " onecol" : ""
        let element = document.createElement("div");
        element.setAttribute('class', this.name + suffix);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), 
                                    this.classes[e], e < this.args.length ? this.args[e] : undefined,
                                    this.content[e]!=undefined ? this.content[e].link : undefined
                                );
            element.initiate();
        }
    }
}

class LegalText extends CElement {
    constructor(parent, name, content) {
        super(parent);
        this.name = name ? name : LEGAL_CLASSNAMES.TEXT;
        this.content = content ? content.replaceAll("\\n", "<br>") : "";
    }
    load() { }

    initiate() {
        let element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content; //emoji.emojify(this.content);
        this.getParent().appendChild(element);
    }
}

class LegalLinkText extends CElement {
    constructor(parent, name, content, link) {
        super(parent);
        
        this.name = name ? name : LEGAL_CLASSNAMES.TEXT;
        this.content = content ? content.replaceAll("\\n", "<br>") : "";
        this.link = link ? link : "/";
    }
    load() { }

    initiate() {
        let el = document.createElement("a");
        el.href = this.link;
        this.getParent().appendChild(el);
        
        let element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content;
        el.appendChild(element);
        
    }
}