/**
 * Category Container Components
 * Migrated from container.js to TypeScript with BaseComponent pattern
 */
/**
 * Header for category panel with label and description
 */
class PanelHeader extends BaseComponent {
    constructor(parent, id) {
        super(parent, ClassName.CATEGORYPANEL_HEADER, id);
        this.elements = [CategoryPanelLabel, CategoryPanelDescr, ToProjects];
    }
    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.makeId(), this.id);
            element.initiate();
        }
    }
}
/**
 * Navigation button to return to projects view
 */
class ToProjects extends BaseComponent {
    constructor(parent, id) {
        super(parent, ClassName.CATEGORYPANEL_LABEL, id);
        this.content = ToProjects.content;
        this.clickHandler = () => {
            const CityLayersPanel = window.CityLayersPanel;
            if (CityLayersPanel) {
                CityLayersPanel.switch();
            }
        };
    }
    createElement() {
        const element = super.createElement();
        element.classList.add(ClassName.CLICK);
        element.innerHTML = this.content;
        return element;
    }
    afterInit() {
        this.addEventListener('click', this.clickHandler);
    }
    /**
     * Show or hide the "To Projects" button
     */
    static activate(on) {
        let elements = Array.from(document.getElementsByClassName(ClassName.CATEGORYPANEL_LABEL)).filter((e) => e.innerText == ToProjects.content);
        if (elements.length > 0) {
            elements[0].style.display = on === false ? DisplayStyle.NONE : DisplayStyle.FLEX;
        }
    }
    /**
     * Hide the "To Projects" button
     */
    static hide() {
        let elements = Array.from(document.getElementsByClassName(ClassName.CATEGORYPANEL_LABEL)).filter((e) => e.innerText == ToProjects.content);
        if (elements.length > 0) {
            elements[0].style.display = DisplayStyle.NONE;
        }
    }
}
ToProjects.content = "< To projects";
/**
 * Main label for category panel
 */
class CategoryPanelLabel extends BaseComponent {
    constructor(parent, id) {
        super(parent, ClassName.CATEGORYPANEL_LABEL, id);
        this.content = "Explore and compare layers";
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.content;
        return element;
    }
}
/**
 * Description text for category panel
 */
class CategoryPanelDescr extends BaseComponent {
    constructor(parent, id) {
        super(parent, ClassName.CATEGORYPANEL_DESCR, id);
        this.content = "Activate and adjust the ranges of \
                the various categories below in order to visualise \
                them in the space.";
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.content;
        return element;
    }
}
/**
 * Container for an entire category with header, slider, and tags
 */
class CategoryElement extends BaseComponent {
    constructor(parent, category) {
        super(parent || ClassName.CATEGORY_PANEL, ClassName.CATEGORY_CONTAINER, category.name);
        this.category = category;
        this.content = category;
        this.elements = [
            CategoryHeader,
            DoubleSlider,
            // SliderLabelContainer, // TODO: This class appears to be missing
            SubcategoryTagContainer,
            CategorySidePanel
        ];
    }
    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element;
            switch (this.elements[e]) {
                case (CategorySidePanel):
                    element = new this.elements[e](this.makeId(), this.content);
                    element.parent = "right-container";
                    break;
                case (CategoryHeader):
                    element = new this.elements[e](this.makeId(), this.content.name, this.content);
                    break;
                case (DoubleSlider):
                    element = new this.elements[e](this.makeId(), this.content.name, this.content);
                    break;
                // case (SliderLabelContainer):
                //     element = new this.elements[e](this.makeId(),
                //         this.content.name, this.content);
                //     break;
                default:
                    element = new this.elements[e](this.makeId(), this.content.name, this.content.subcategories);
            }
            element.initiate();
            element.load();
        }
    }
}
/**
 * Header for individual category with label, info, and switch
 */
class CategoryHeader extends BaseComponent {
    constructor(parent, id, category) {
        super(parent, ClassName.CATEGORY_HEADER, id);
        this.category = category;
        this.elements = [CategoryInfo, CategoryLabel, CategorySwitch];
    }
    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.makeId(), this.id, this.category);
            element.initiate();
        }
    }
}
/**
 * Label displaying category name
 */
class CategoryLabel extends BaseComponent {
    constructor(parent, id) {
        super(parent, ClassName.CATEGORY_HEADER_TITLE, id);
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.id;
        return element;
    }
}
/**
 * Base class for switch/toggle components
 */
class Switch extends BaseComponent {
    constructor(parent, id, category) {
        super(parent, ClassName.SWITCH, id);
        this.category = category;
    }
}
/**
 * Toggle switch for activating/deactivating categories
 */
class CategorySwitch extends Switch {
    constructor(parent, id, category) {
        super(parent, id, category);
        this.className = ClassName.CATEGORY_SWITCH;
        this.changeHandler = () => {
            // Category activation logic
        };
    }
    getElementTag() {
        return 'label';
    }
    afterInit() {
        const element = this.getElement();
        if (!element)
            return;
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.onchange = this.changeHandler;
        const span = document.createElement("span");
        element.appendChild(checkbox);
        element.appendChild(span);
    }
}
CategorySwitch._name = ClassName.CATEGORY_SWITCH;
/**
 * Info icon button to show category details
 */
class CategoryInfo extends BaseComponent {
    constructor(parent, id, category) {
        super(parent, "material-symbols-outlined", id);
        this.category = category;
        this.content = "info";
        this.clickHandler = () => {
            CategorySidePanel.toggle(this.category);
        };
    }
    getElementTag() {
        return 'span';
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
/**
 * Container for subcategory tags
 */
class SubcategoryTagContainer extends BaseComponent {
    constructor(parent, id) {
        super(parent, ClassName.TAG_CONTAINER, id);
    }
    load(labels) {
        if (labels === undefined) {
            labels = [];
        }
        labels.forEach(label => {
            let element = new SubcategoryTag(this.makeId(), label);
            element.initiate();
        });
    }
    /**
     * Get tag container by category name
     */
    static getByCategory(category) {
        return document.getElementById(`${this.cname}_${category}`);
    }
    /**
     * Add a new tag to the container
     */
    static addLabel(category, label, togglable = false) {
        togglable = false;
        let element = new SubcategoryTag(`${this.cname}_${category}`, label);
        element.initiate(togglable);
    }
}
SubcategoryTagContainer.cname = ClassName.TAG_CONTAINER;
/**
 * Individual subcategory tag with checkbox
 */
class SubcategoryTag extends BaseComponent {
    constructor(parent, tag) {
        const tagName = tag.name !== undefined ? tag.name : tag;
        super(parent, ClassName.SUBCATEGORY_TAG, tagName);
        this.tag = tag;
        this.subcat_id = tag.id;
    }
    /**
     * Toggle tag selection
     */
    toggle() {
        const parentElement = this.getParent();
        if (!parentElement || !parentElement.parentElement || !parentElement.parentElement.parentElement)
            return;
        let _cname = parentElement.parentElement.parentElement.className;
        let _id = parentElement.parentElement.parentElement.id;
        let category = _id.replace(`${_cname}_`, "");
        let new_id = `${this.className}_${this.id}`;
        const ControllerMultiCategorical = window.ControllerMultiCategorical;
        const ConfigPanel = window.ConfigPanel;
        if (!ControllerMultiCategorical || !ConfigPanel)
            return;
        let container = ControllerMultiCategorical.getByCategory(category);
        let existing_ids = Array.from(container.children).map((el) => el.id);
        if (existing_ids.includes(new_id)) {
            document.getElementById(new_id)?.remove();
        }
        else {
            ControllerMultiCategorical.addLabel(category, this.id, true);
        }
        ConfigPanel.markertoggle(this.subcat_id, !existing_ids.includes(new_id));
    }
    /**
     * Initialize tag with checkbox and label
     */
    initiate(togglable = true) {
        super.initiate();
        const element = this.getElement();
        if (!element)
            return;
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        const labelContainer = document.createElement("div");
        labelContainer.setAttribute("class", "tag-element");
        const label = document.createElement("label");
        label.innerHTML = this.id;
        labelContainer.appendChild(label);
        element.appendChild(checkbox);
        element.appendChild(labelContainer);
        if (togglable) {
            checkbox.onclick = () => { this.toggle(); };
        }
        else {
            checkbox.setAttribute("disabled", "true");
        }
    }
}
