/**
 * Comment Bar Components
 * Migrated from commentbar.js to TypeScript with BaseComponent pattern
 */
/**
 * Main comment panel containing search and comment container
 */
class CommentPanel extends BaseComponent {
    constructor(parent, comments) {
        super(parent, ClassName.COMMENTPANEL, "id");
        this.comments = comments;
        this.content = comments;
        this.elements = [
            CommentCloseButton,
            CommentSearch,
            CommentContainer
        ];
    }
    /**
     * Get parent element (handles class name parent selector)
     */
    getParent() {
        const elements = document.getElementsByClassName(this.parentId);
        if (elements.length > 0) {
            return elements[0];
        }
        return super.getParent();
    }
    /**
     * Load comment panel elements
     * Overrides base load to accept comments parameter
     */
    loadComments(comments) {
        this.elements.forEach(el => {
            let element = new el(this.makeId(), "id");
            element.initiate();
            element.load(comments);
        });
    }
    /**
     * Search through comments and reorder by relevance
     */
    static search(value) {
        const panel = document.getElementById(`${ClassName.COMMENTPANEL}_id`);
        const container = document.getElementById(`${ClassName.COMMENTCONTAINER}_id`);
        if (panel && !panel.classList.contains("open")) {
            panel.classList.add("open");
        }
        let comments = Array.from(document.getElementsByClassName(ClassName.COMMENTTEXT));
        comments.forEach((c) => {
            if (c.parentElement) {
                c.parentElement.setAttribute("style", "order: 8");
            }
        });
        comments.filter((c) => c.innerHTML.toLowerCase().includes(value.toLowerCase())).forEach((c) => {
            if (c.parentElement) {
                c.parentElement.setAttribute("style", "order: 1");
            }
        });
        // Scroll container to the left to have the searched comment in view
        if (container) {
            container.scrollLeft = 0;
        }
    }
    /**
     * Focus on a specific comment by ID
     */
    static focusComment(id, on) {
        let _comment = document.getElementById(`commentpane_${id}`);
        if (_comment !== null && on === true) {
            _comment.scrollIntoView({
                behavior: 'smooth'
            });
            _comment.focus();
        }
    }
    /**
     * Toggle comment panel visibility
     */
    static toggle() {
        let panel = document.getElementById(`${ClassName.COMMENTPANEL}_id`);
        if (panel) {
            panel.classList.toggle("open");
        }
    }
    /**
     * Hide all comment panels
     */
    static hideAll() {
        let panels = document.getElementsByClassName(ClassName.CATEGORY_SIDE_PANEL);
        Array.from(panels).forEach((panel) => {
            panel.style.display = "none";
        });
    }
}
CommentPanel._name = ClassName.COMMENTPANEL;
CommentPanel.toggleMarker = (value, active) => { console.log(value, active); };
/**
 * Container for all comment panes
 */
class CommentContainer extends BaseComponent {
    constructor(parent, id) {
        super(parent, ClassName.COMMENTCONTAINER, id);
        this.elements = [];
    }
    /**
     * Add a single comment to the container
     */
    addComment(comment, id) {
        let div = new CommentPane(this.makeId(), id, comment);
        div.initiate();
        div.load();
    }
    /**
     * Load all comments
     */
    load(comments) {
        this.elements.forEach(el => {
            let element = new el(this.makeId(), "main");
            element.initiate();
            element.load();
        });
        if (comments) {
            comments.forEach((c, i) => {
                this.addComment(c.comment, c.place_id.toString());
            });
        }
    }
}
CommentContainer._name = ClassName.COMMENTCONTAINER;
/**
 * Individual comment pane with text content
 */
class CommentPane extends BaseComponent {
    constructor(parent, id, comment) {
        super(parent, ClassName.COMMENTPANE, id);
        this.comment = comment;
        this.content = comment;
        this.elements = [CommentText];
        this.clickHandler = () => {
            const el = this.getElement();
            CommentPanel.toggleMarker(this.id, document.activeElement === el);
        };
    }
    createElement() {
        const el = super.createElement();
        el.classList.add("simple-drop-shadow");
        el.setAttribute("tabindex", "0");
        return el;
    }
    afterInit() {
        this.addEventListener('click', this.clickHandler);
    }
    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.makeId(), this.id, this.content);
            element.initiate();
        }
    }
}
CommentPane._name = ClassName.COMMENTPANE;
/**
 * Text content of a comment
 */
class CommentText extends BaseComponent {
    constructor(parent, id, content) {
        super(parent, ClassName.COMMENTTEXT, id);
        this.content = content;
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.content;
        return element;
    }
}
CommentText._name = ClassName.COMMENTTEXT;
/**
 * Close/toggle button for comment panel
 */
class CommentCloseButton extends BaseComponent {
    constructor(parent) {
        super(parent, ClassName.COMMENTPANEL_CLOSE, "id");
        this.content = "<div class='chevron'></div>";
        this.clickHandler = (e) => {
            const element = this.getElement();
            if (element) {
                element.classList.toggle("open");
            }
            CommentPanel.toggle();
        };
    }
    getElementTag() {
        return 'button';
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.content;
        return element;
    }
    afterInit() {
        this.addEventListener('click', this.clickHandler);
    }
}
CommentCloseButton._name = ClassName.COMMENTPANEL_CLOSE;
/**
 * Search input for filtering comments
 */
class CommentSearch extends BaseComponent {
    constructor(parent) {
        super(parent, ClassName.COMMENTSEARCH, "id");
        this.content = "Search through comments";
        this.inputHandler = (e) => {
            const target = e.target;
            CommentPanel.search(target.value);
        };
    }
    afterInit() {
        const element = this.getElement();
        if (!element)
            return;
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", this.content);
        input.oninput = this.inputHandler;
        element.appendChild(input);
    }
}
CommentSearch._name = ClassName.COMMENTSEARCH;
