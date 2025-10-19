

/**
 * Comment Bar Components
 * Migrated from commentbar.js to TypeScript with BaseComponent pattern
 */

/**
 * Main comment panel containing search and comment container
 */
class CommentPanel extends BaseComponent {
    static _name = ClassName.COMMENTPANEL;
    static toggleMarker = (value: string, active?: boolean) => { console.log(value, active); };

    protected elements: any[];
    private comments: any[];

    constructor(parent: string, comments: any[]) {
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
    public getParent(): HTMLElement | null {
        const elements = document.getElementsByClassName(this.parentId);
        if (elements.length > 0) {
            return elements[0] as HTMLElement;
        }
        return super.getParent();
    }

    /**
     * Load comment panel elements
     * Overrides base load to accept comments parameter
     */
    loadComments(comments: any[]): void {
        this.elements.forEach(el => {
            let element = new el(this.makeId(), "id");
            element.initiate();
            element.load(comments);
        });
    }

    /**
     * Search through comments and reorder by relevance
     */
    static search(value: string): void {
        const panel = document.getElementById(`${ClassName.COMMENTPANEL}_id`);
        const container = document.getElementById(`${ClassName.COMMENTCONTAINER}_id`);

        if (panel && !panel.classList.contains("open")) {
            panel.classList.add("open");
        }

        let comments = Array.from(document.getElementsByClassName(ClassName.COMMENTTEXT));
        comments.forEach((c: Element) => {
            if (c.parentElement) {
                c.parentElement.setAttribute("style", "order: 8");
            }
        });

        comments.filter((c: Element) =>
            c.innerHTML.toLowerCase().includes(value.toLowerCase())
        ).forEach((c: Element) => {
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
    static focusComment(id: string, on: boolean): void {
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
    static toggle(): void {
        let panel = document.getElementById(`${ClassName.COMMENTPANEL}_id`);
        if (panel) {
            panel.classList.toggle("open");
        }
    }

    /**
     * Hide all comment panels
     */
    static hideAll(): void {
        let panels = document.getElementsByClassName(ClassName.CATEGORY_SIDE_PANEL);
        Array.from(panels).forEach((panel: Element) => {
            (panel as HTMLElement).style.display = "none";
        });
    }
}

/**
 * Container for all comment panes
 */
class CommentContainer extends BaseComponent {
    static _name = ClassName.COMMENTCONTAINER;
    protected elements: any[];

    constructor(parent: string, id: string) {
        super(parent, ClassName.COMMENTCONTAINER, id);
        this.elements = [];
    }

    /**
     * Add a single comment to the container
     */
    addComment(comment: string, id: string): void {
        let div = new CommentPane(this.makeId(), id, comment);
        div.initiate();
        div.load();
    }

    /**
     * Load all comments
     */
    load(comments?: any[]): void {
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

/**
 * Individual comment pane with text content
 */
class CommentPane extends BaseComponent {
    static _name = ClassName.COMMENTPANE;
    protected elements: any[];
    private comment: string;
    private clickHandler: () => void;

    constructor(parent: string, id: string, comment: string) {
        super(parent, ClassName.COMMENTPANE, id);
        this.comment = comment;
        this.content = comment;
        this.elements = [CommentText];
        this.clickHandler = () => {
            const el = this.getElement();
            CommentPanel.toggleMarker(this.id, document.activeElement === el);
        };
    }

    protected createElement(): HTMLElement {
        const el = super.createElement();
        el.classList.add("simple-drop-shadow");
        el.setAttribute("tabindex", "0");
        return el;
    }

    protected afterInit(): void {
        this.addEventListener('click', this.clickHandler);
    }

    load(): void {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.makeId(), this.id, this.content);
            element.initiate();
        }
    }
}

/**
 * Text content of a comment
 */
class CommentText extends BaseComponent {
    static _name = ClassName.COMMENTTEXT;

    constructor(parent: string, id: string, content: string) {
        super(parent, ClassName.COMMENTTEXT, id);
        this.content = content;
    }

    protected createElement(): HTMLElement {
        const element = super.createElement();
        element.innerHTML = this.content;
        return element;
    }
}

/**
 * Close/toggle button for comment panel
 */
class CommentCloseButton extends BaseComponent {
    static _name = ClassName.COMMENTPANEL_CLOSE;
    private clickHandler: (e: Event) => void;

    constructor(parent: string) {
        super(parent, ClassName.COMMENTPANEL_CLOSE, "id");
        this.content = "<div class='chevron'></div>";
        this.clickHandler = (e: Event) => {
            const element = this.getElement();
            if (element) {
                element.classList.toggle("open");
            }
            CommentPanel.toggle();
        };
    }

    protected getElementTag(): string {
        return 'button';
    }

    protected createElement(): HTMLElement {
        const element = super.createElement();
        element.innerHTML = this.content;
        return element;
    }

    protected afterInit(): void {
        this.addEventListener('click', this.clickHandler);
    }
}

/**
 * Search input for filtering comments
 */
class CommentSearch extends BaseComponent {
    static _name = ClassName.COMMENTSEARCH;
    private inputHandler: (e: Event) => void;

    constructor(parent: string) {
        super(parent, ClassName.COMMENTSEARCH, "id");
        this.content = "Search through comments";
        this.inputHandler = (e: Event) => {
            const target = e.target as HTMLInputElement;
            CommentPanel.search(target.value);
        };
    }

    protected afterInit(): void {
        const element = this.getElement();
        if (!element) return;

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", this.content);
        input.oninput = this.inputHandler;

        element.appendChild(input);
    }
}
