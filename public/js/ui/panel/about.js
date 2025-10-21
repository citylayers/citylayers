/**
 * About Panel Components
 * Migrated from about.js to TypeScript with BaseComponent pattern
 */
/**
 * Label/button to open the about panel
 */
class AboutLabel extends BaseComponent {
    constructor(parent) {
        super(parent || "body", ClassName.ABOUT_LABEL, "aboutlabelid");
        this.content = "about";
        this.elements = [];
        this.clickHandler = (e) => {
            AboutPanel.toggle();
        };
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
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.content;
        return element;
    }
    afterInit() {
        this.addEventListener('click', this.clickHandler);
    }
    load() {
        // No children to load
    }
    /**
     * Legacy geocoding call method (unused in current implementation)
     */
    _call(geo) {
        const TopTagPanel = window.TopTagPanel;
        const GeocodeParser = window.GeocodeParser;
        if (!TopTagPanel) {
            return Promise.reject('TopTagPanel not available');
        }
        let url = TopTagPanel.getUrl(geo.coords.latitude, geo.coords.longitude);
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        return fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then(result => {
            if (result.status == 200) {
                return result.json().then(res => {
                    const geocodingPanels = document.getElementsByClassName(CLASSNAMES.GEOCODONG_PANEL);
                    if (geocodingPanels.length > 0 && GeocodeParser) {
                        geocodingPanels[0].innerHTML = GeocodeParser.run(res);
                    }
                    return res;
                });
            }
            else if (result.status == 429) {
                return sleep(1000).then(() => this._call(geo));
            }
            else if (result.status == 504) {
                return this._call(geo);
            }
            else {
                console.log(`CODE: ${result.status}`);
            }
            return result;
        });
    }
}
/**
 * About panel showing project information
 */
class AboutPanel extends BaseComponent {
    constructor(parent) {
        super(parent || "body", ClassName.ABOUT_PANEL, "id");
        this.elements = [
            CloseButton,
            AboutDescription,
            AboutLogo,
            AboutText
        ];
        this.args = [() => { AboutPanel.toggle(); }];
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
     * Load child elements and hide panel initially
     */
    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.makeId(), undefined, e < this.args.length ? this.args[e] : undefined);
            element.initiate();
            element.load();
        }
        const el = this.getElement();
        if (el) {
            el.style.display = DisplayStyle.NONE;
        }
    }
    /**
     * Toggle about panel visibility
     */
    static toggle() {
        const panel = document.getElementById(`${ClassName.ABOUT_PANEL}_id`);
        if (panel) {
            panel.style.display = panel.style.display === DisplayStyle.NONE
                ? DisplayStyle.FLEX
                : DisplayStyle.NONE;
        }
    }
}
/**
 * Description text for about panel
 */
class AboutDescription extends BaseComponent {
    constructor(parent) {
        super(parent, ClassName.ABOUT_DESCRIPTION);
        this.content = `City layers is a city-making app that empowers citizens to shape the changes they want to see in their cities!`;
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.content;
        return element;
    }
    load() {
        // No children to load
    }
}
/**
 * Detailed text content for about panel
 */
class AboutText extends BaseComponent {
    constructor(parent) {
        super(parent, ClassName.ABOUT_TEXT);
        this.content = `City Layers embody the motto "act local to go global"
        by relying on citizen mapping as a holistic and inclusive city-making
        practice that aims to tackle the contemporary spatial, social and
        environmental challenges our cities are facing. <br><br>

        This powerful city mapping app serves as a means of
        communication between cities and their citizens,
        generating a new type of data that is
        collectively generated, managed and cared for. `;
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.content;
        return element;
    }
    load() {
        // No children to load
    }
}
AboutText._name = ClassName.ABOUT_TEXT;
/**
 * Logo image for about panel
 */
class AboutLogo extends BaseComponent {
    constructor(parent, category) {
        super(parent, "aboutlogo", category);
        this.content = "/images/about.svg";
    }
    getElementTag() {
        return 'img';
    }
    createElement() {
        const element = document.createElement('img');
        element.src = this.content;
        element.setAttribute('class', this.className);
        element.setAttribute('id', this.makeId());
        const parent = this.getParent();
        if (parent) {
            parent.appendChild(element);
        }
        return element;
    }
}
