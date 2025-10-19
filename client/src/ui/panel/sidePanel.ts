




/**
 * Category Side Panel Components
 * Migrated from sidePanel.js to TypeScript with BaseComponent pattern
 */

/**
 * Side panel for displaying category details and filtering options
 */
class CategorySidePanel extends BaseComponent {
    protected elements: any[];
    protected args: any[];
    private category: any;

    constructor(parent: string, category: any) {
        super(parent || "body", ClassName.CATEGORY_SIDE_PANEL, category.name);
        this.category = category;
        this.content = category;
        this.elements = [
            CloseButton,
            CategoryDescription,
            CategorySidePanelTagContainer
        ];
        this.args = [() => { CategorySidePanel.toggle(category); }];
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
     * Load child elements and hide panel initially
     */
    load(): void {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](
                this.makeId(),
                this.content,
                e < this.args.length ? this.args[e] : undefined
            );
            element.initiate();
            element.load();
        }

        const el = this.getElement();
        if (el) {
            el.style.display = DisplayStyle.NONE;
        }
    }

    /**
     * Toggle side panel visibility for a category
     */
    static toggle(category: any): void {
        const sidePanel = document.getElementById(
            `${ClassName.CATEGORY_SIDE_PANEL}_${category.name}`
        );
        const container = document.getElementById(
            `${ClassName.CATEGORY_CONTAINER}_${category.name}`
        );

        if (!sidePanel || !container) return;

        if (sidePanel.style.display === DisplayStyle.NONE) {
            this.hideAll();
        }

        container.classList.toggle("simple-drop-shadow");
        sidePanel.style.display = sidePanel.style.display === DisplayStyle.NONE
            ? DisplayStyle.FLEX
            : DisplayStyle.NONE;

        document.body.style.setProperty(`--side-panel-color`, `#${category.color}`);
    }

    /**
     * Hide all category side panels
     */
    static hideAll(): void {
        const panels = document.getElementsByClassName(ClassName.CATEGORY_SIDE_PANEL);
        const containers = document.getElementsByClassName(ClassName.CATEGORY_CONTAINER);

        for (let i = 0; i < panels.length; i++) {
            (panels[i] as HTMLElement).style.display = DisplayStyle.NONE;
            containers[i]?.classList.remove("simple-drop-shadow");
        }
    }
}

/**
 * Container for category side panel tags and filters
 */
class CategorySidePanelTagContainer extends BaseComponent {
    protected elements: any[];
    private category: any;

    constructor(parent: string, category: any) {
        super(parent, ClassName.CATEGORY_SIDE_TAG_CONTAINER, category.id);
        this.category = category;
        this.content = category;
        this.elements = [
            HorizontalDivider,
            CategorySidePanelTagTitle,
            CategorySidePanelTagContainerS
        ];
    }

    load(): void {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.makeId(), this.content);
            element.initiate();
            element.load();
        }
    }
}

/**
 * Description text for category in side panel
 */
class CategoryDescription extends TextElement {
    constructor(parent: string, category: any) {
        super(parent, category.id);
        this.className = ClassName.CATEGORY_DESCRIPTION;
        this.content = category.description;
    }
}

/**
 * Title button for tag filtering section
 */
class CategorySidePanelTagTitle extends BaseComponent {
    private category: any;
    private clickHandler: () => void;

    constructor(parent: string, category: any) {
        super(parent, ClassName.CATEGORY_SIDE_TAG_CONTAINER_TITLE, category.name);
        this.category = category;
        this.content = "Filter by tags";
        this.clickHandler = () => {
            CategorySidePanel.toggle(this.category);
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
 * Horizontal divider line
 */
class HorizontalDivider extends BaseComponent {
    constructor(parent: string, category: any) {
        super(parent, '', category.id);
    }

    protected getElementTag(): string {
        return 'hr';
    }

    load(): void {
        // No children to load
    }
}

/**
 * Small container for subcategory tags
 */
class CategorySidePanelTagContainerS extends BaseComponent {
    private category: any;

    constructor(parent: string, category: any) {
        super(parent, ClassName.CATEGORY_SIDE_TAG_CONTAINER_S, category.name);
        this.category = category;
        this.content = category;
    }

    load(): void {
        if (!this.content.subcategories) return;

        this.content.subcategories.forEach((subcat: any) => {
            let element = new SubcategoryTag(this.makeId(), subcat);
            element.initiate();
        });
    }
}
