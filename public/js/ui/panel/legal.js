// Legacy imports
class LegalPanel extends ContentPanel {
    constructor(parent, id, content) {
        super(parent, id, content);
        this.name = LEGAL_CLASSNAMES.PANEL;
        this.elements = [LegalHeader, LegalBody];
        this.content = content;
    }
    load(args) {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.makeId(), this.id, this.content);
            element.initiate();
            element.load();
        }
    }
}
class LegalHeader extends ContentPanel {
    constructor(parent, id, content) {
        super(parent, id, content);
        this.name = LEGAL_CLASSNAMES.HEADER;
        this.content = content;
        this.elements = [Logo, CloseButton];
        this.args = [CLASSNAMES.LOGO, () => { location.href = "/"; }, content[0].name];
    }
    initiate() {
        var element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.makeId());
        this.getParent().appendChild(element);
    }
    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.makeId(), this.id, this.args[e]);
            element.initiate();
        }
    }
}
class LegalBody extends ContentPanel {
    constructor(parent, id, content) {
        super(parent, id, content);
        this.name = LEGAL_CLASSNAMES.BODY;
        this.content = content;
        this.elements = [TextElement, LegalBodyContent];
        this.classes = [LEGAL_CLASSNAMES.TITLE, LEGAL_CLASSNAMES.LEGALBODYCONTENT];
        this.args = [content[0].title, content];
    }
    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.makeId(), this.classes[e], e < this.args.length ? this.args[e] : undefined);
            element.initiate();
            element.load();
        }
    }
}
class LegalBodyContent extends ContentPanel {
    constructor(parent, id, content) {
        super(parent, id, content);
        this.name = LEGAL_CLASSNAMES.BODY;
        this.content = content;
        this.elements = [...content.map(e => (e.link != undefined && e.link != null && e.link != "") ? LegalLinkText : TextElement)];
        this.classes = [...content.map(e => e.formatting == 1 ? LEGAL_CLASSNAMES.TEXT_F : LEGAL_CLASSNAMES.TEXT)];
        this.args = [...content.map(e => e.content)];
    }
    initiate() {
        let suffix = location.href.endsWith("dataprivacyandprotection") || location.href.endsWith("accessibility") ? " onecol" : "";
        let element = document.createElement("div");
        element.setAttribute('class', this.name + suffix);
        element.setAttribute("id", this.makeId());
        this.getParent().appendChild(element);
    }
    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = undefined;
            if (this.elements[e] == TextElement) {
                element = new this.elements[e](this.makeId(), this.id, e < this.args.length ? this.args[e] : undefined
                // this.content[e]!=undefined ? this.content[e].link : undefined
                );
            }
            else {
                element = new this.elements[e](this.makeId(), this.id, [e < this.args.length ? this.args[e] : undefined,
                    this.content[e] != undefined ? this.content[e].link : undefined]);
            }
            element.initiate();
        }
    }
}
/**
 * Legal link text component.
 * Extends BaseComponent with proper OOP principles.
 */
class LegalLinkText extends BaseComponent {
    constructor(parentId, id, content) {
        super(parentId, LEGAL_CLASSNAMES.TEXT, id);
        this.textContent = content ? content[0].replaceAll("\\n", "<br>") : "";
        this.link = content ? content[1] : "/";
    }
    createElement() {
        // Create anchor element
        const anchor = document.createElement("a");
        anchor.href = this.link;
        // Create div with content inside anchor
        const div = document.createElement("div");
        div.setAttribute('class', this.className);
        div.setAttribute('id', this.makeId());
        div.innerHTML = this.textContent;
        anchor.appendChild(div);
        // Append anchor to parent instead of div
        const parent = this.getParent();
        if (parent) {
            parent.appendChild(anchor);
        }
        return div; // Return div as the tracked element
    }
}
