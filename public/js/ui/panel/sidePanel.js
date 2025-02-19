
/*
    ------------------------------------------------------

    Category Side Panel and its elements

    ------------------------------------------------------

*/

class CategorySidePanel extends CElement {
    
    constructor(parent, category) {
        super(parent, category.id);
        this.id = category.name;
        this.name = CLASSNAMES.CATEGORY_SIDE_PANEL;
        this.parent = parent ? parent : "body";
        
        this.content = category;

        this.elements = [CloseButton,
            CategoryDescription,
            CategorySidePanelTagContainer
        ];
        
        this.args = [() => { CategorySidePanel.toggle(category); }]
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), this.content, e<this.args.length?this.args[e]:undefined);
            element.initiate();
            element.load();
        }

        this.getElement().style.display = DISPLAY.NONE;
    }

    static toggle(category) {
        console.log(category);
        
        let sidePanel = document.getElementById(`${CLASSNAMES.CATEGORY_SIDE_PANEL}_${category.name}`);
        let container = document.getElementById(`${CLASSNAMES.CATEGORY_CONTAINER}_${category.name}`);
        if (sidePanel.style.display === DISPLAY.NONE) {
            this.hideAll();
        }
        container.classList.toggle("simple-drop-shadow");
        sidePanel.style.display = sidePanel.style.display === DISPLAY.NONE ? DISPLAY.FLEX : DISPLAY.NONE;
        document.body.style.setProperty(`--side-panel-color`, `#${category.color}`);
    }

    static hideAll() {
        let panels = document.getElementsByClassName(CLASSNAMES.CATEGORY_SIDE_PANEL);
        let containers = document.getElementsByClassName(CLASSNAMES.CATEGORY_CONTAINER);
        Array.from(panels).forEach(panel => {
        })
        for (let i = 0; i < panels.length; i++) {
            panels[i].style.display = DISPLAY.NONE;
            containers[i].classList.remove("simple-drop-shadow");            
        }
    }
}

class CategorySidePanelTagContainer extends CElement {
    

    constructor(parent, category) {
        super(parent, category.id);
        this.name = CLASSNAMES.CATEGORY_SIDE_TAG_CONTAINER;
        this.content = category;
        // this.parent = parent; //CLASSNAMES.CATEGORY_CONTAINER;
        this.elements = [
            HorizontalDivider,
            CategorySidePanelTagTitle,
            CategorySidePanelTagContainerS];
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), this.content);
            element.initiate();
            element.load();
        }
    }
}

class CategoryDescription extends TextElement {
    
    constructor(parent, category) {
        super(parent, category.id);
        this.name = CLASSNAMES.CATEGORY_DESCRIPTION;
        this.content = category.description;
    }

    
}



class CategorySidePanelTagTitle extends CElement {
    
    constructor(parent, category) {
        super(parent, category.name);
        this.name = CLASSNAMES.CATEGORY_SIDE_TAG_CONTAINER_TITLE;
        this.category = category;
        this.content = "Filter by tags"; // U+022C1  // keyboard_arrow_down 
        // https://materialui.co/icon/keyboard-arrow-down
        // <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
    }

    initiate() {
        let element = document.createElement("button");
        element.setAttribute('class', this._name);
        element.setAttribute("id", this.make_id());
        element.onclick = () => { CategorySidePanel.toggle(this.category); };
        element.innerHTML = this.content;
        // element.style.display = "none";
        this.getParent().appendChild(element);
    }
}

class HorizontalDivider extends CElement {
    constructor(parent, category) {
        super(parent, category.id);
    }

    load() { }

    initiate() {
        let element = document.createElement("hr");
        this.getParent().appendChild(element);
    }
}

class CategorySidePanelTagContainerS extends CElement {
    
    constructor(parent, category) {
        super(parent, category.name);
        this.name = CLASSNAMES.CATEGORY_SIDE_TAG_CONTAINER_S;
        this.content = category;
        // this.parent = parent; //CLASSNAMES.CATEGORY_CONTAINER;
        this.elements = [CategoryLabel, CategorySwitch];
    }

    load() {
        this.content.subcategories.forEach(subcat => {
            let element = new SubcategoryTag(this.make_id(), subcat);
            element.initiate();
        });
    }
}


