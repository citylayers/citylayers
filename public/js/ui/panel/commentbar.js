class CommentPanel extends CElement {
    static _name = CLASSNAMES.COMMENTPANEL;
    toggleMarker = (value) => { console.log(value) };

    constructor(parent, comments) {
        super(parent, "id");
        this.content = comments;

        this.elements = [
            CommentCloseButton,
            CommentSearch,
            CommentContainer
        ];
    }

    getParent() {
        let elements = document.getElementsByClassName(this.parent);
        if (elements.length > 0) {
            return elements[0];
        }
    }


    load(comments) {
        this.elements.forEach(el => {
            let element = new el(this.make_id(), "id");
            element.initiate();
            element.load(comments);
        });
    }

    static search(value) {
        const panel = document.getElementById(`${CLASSNAMES.COMMENTPANEL}_id`);
        const container = document.getElementById(`${CLASSNAMES.COMMENTCONTAINER}_id`);
        if(!panel.classList.contains("open")) panel.classList.add("open");

        let comments = Array.from(document.getElementsByClassName(CLASSNAMES.COMMENTTEXT));
        comments.forEach(c => c.parentElement.setAttribute("style", "order: 8"));
        comments.filter(c => c.innerHTML.toLowerCase().includes(value.toLowerCase())).forEach(
            c => c.parentElement.setAttribute("style", "order: 1")
        );
        //scroll container to the left to have the searched comment in view.
        container.scrollLeft= 0;
    }

    static focusComment(id, on) {
        let _comment = document.getElementById(`commentpane_${id}`);
        if (_comment != undefined) {
            if (on == true) {
                _comment.scrollIntoView({
                    behavior: 'smooth'
                });
                _comment.focus();
            }

        }
    }


    static toggle() {
        let panel = document.getElementById(`${CLASSNAMES.COMMENTPANEL}_id`);
        panel.classList.toggle("open");
    }

    static hideAll() {
        let panels = document.getElementsByClassName(CLASSNAMES.CATEGORY_SIDE_PANEL);
        Array.from(panels).forEach(panel => {
            panel.style.display = "none";
        })
    }
}

class CommentContainer extends CElement {
    static _name = CLASSNAMES.COMMENTCONTAINER;
    constructor(parent, id) {
        super(parent);
        this.id = id;
        this.elements = [];
    }

    addComment(comment, id) {
        let div = new CommentPane(this.make_id(), id, comment);
        div.initiate();
        div.load();
    }

    load(comments) {
        this.elements.forEach(el => {
            let element = new el(this.make_id(), "main");
            element.initiate();
            element.load();
        });

        comments.forEach((c, i) => {
            this.addComment(c.comment, c.place_id.toString());

        });
    }
}

class CommentPane extends CElement {
    static _name = CLASSNAMES.COMMENTPANE;
    constructor(parent, id, comment) {
        super(parent);
        this.id = id;
        this.content = comment;
        this.elements = [CommentText];
    }

    initiate() {
        let el = document.createElement("div");
        el.setAttribute('class', this._name + " simple-drop-shadow");
        el.setAttribute("id", this.make_id());
        this.getParent().appendChild(el);
        el.setAttribute("tabindex", "0");
        el.onclick = () => {
            
            CommentPanel.toggleMarker(this.id, document.activeElement == el);
        }
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), this.id, this.content);
            element.initiate();
        }
    }
}

class CommentText extends CElement {
    static _name = CLASSNAMES.COMMENTTEXT;
    constructor(parent, id, content) {
        super(parent);
        this.id = id;
        this.content = content
        
        this.parent = parent; //CLASSNAMES.CATEGORY_HEADER;
    }
    initiate() {
        let element = document.createElement("div");
        element.setAttribute('class', this._name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content;
        this.getParent().appendChild(element);
    }
}

class CommentCloseButton extends CElement {
    static _name = CLASSNAMES.COMMENTPANEL_CLOSE;
    constructor(parent) {
        super(parent, "id");
        this.content = "<div class='chevron'></div>";
    }

    initiate() {
        let element = document.createElement("button");
        element.setAttribute('class', this._name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content;
        element.onclick = (e) => {
            element.classList.toggle("open");
            CommentPanel.toggle();
        };
        this.getParent().appendChild(element);
    }

}

class CommentSearch extends CElement {
    // <input type="text" placeholder="Search..">
    static _name = CLASSNAMES.COMMENTSEARCH;
    constructor(parent) {
        super(parent, "id");
        this.content = "Search through comments" // Search through comments 
    }

    initiate() {
        let element = document.createElement("div");
        element.setAttribute('class', this._name);
        element.setAttribute("id", this.make_id());
        // element.innerHTML = "🔎︎";
        this.getParent().appendChild(element);
        let e1 = document.createElement("input");
        e1.setAttribute("type", "text");
        e1.setAttribute("placeholder", this.content);
        e1.oninput = (e) => {
            CommentPanel.search(e.target.value);
        }
        element.appendChild(e1);
    }
}