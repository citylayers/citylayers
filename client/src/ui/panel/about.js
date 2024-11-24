
class AboutLabel extends CElement {
    
    constructor(parent) {
        super(parent);
        this.id = "aboutlabelid";
        this.name = CLASSNAMES.ABOUT_LABEL;
        this.parent = parent ? parent : "body";
        this.content = "about";

        this.elements = [];
    }

    getParent() {
        let elements = document.getElementsByClassName(this.parent);
        if (elements.length > 0) {
            return elements[0];
        }
    }

    initiate() {
        let element = document.createElement("div");
        element.setAttribute('class', this._name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content; //emoji.emojify(this.content);
        element.onclick = (e) => {
            AboutPanel.toggle();


        };
        this.getParent().appendChild(element);
    }

    load() {
    }

    _call(geo) {

        let url = TopTagPanel.getUrl(geo.coords.latitude, geo.coords.longitude);
        // fetch(url, )

        return fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then(result => {
            if (result.status == 200) {
                return result.json().then(res => {
                    document.getElementsByClassName(CLASSNAMES.GEOCODONG_PANEL)[0].innerHTML = GeocodeParser.run(res);
                    return res;
                });
            }
            else if (result.status == 429) {
                return sleep(1000).then(r => { return this.request() });
            }
            else if (result.status == 504) {
                return this.request();
            }
            else {
                console.log(`CODE: ${result.status}`);
            }
            return result;
        });
    }
}

class AboutPanel extends CElement {
    
    constructor(parent) {
        super(parent);
        this.id = "id";
        this.name = CLASSNAMES.ABOUT_PANEL;
        this.parent = parent ? parent : "body";

        this.elements = [CloseButton,
            AboutDescription,
            AboutLogo,
            AboutText
        ];
        this.args = [() => { AboutPanel.toggle(); }]
    }

    getParent() {
        let elements = document.getElementsByClassName(this.parent);
        if (elements.length > 0) {
            return elements[0];
        }
    }

    load() {
        for (let e = 0; e < this.elements.length; e++) {
            let element = new this.elements[e](this.make_id(), undefined, e<this.args.length?this.args[e]:undefined);
            element.initiate();
            element.load();
        }

        this.getElement().style.display = "none";
    }

    static toggle() {
        let panel = document.getElementById(`${CLASSNAMES.ABOUT_PANEL}_id`);
        panel.style.display = panel.style.display === "none" ? "flex" : "none";
    }
}


class AboutDescription extends CElement {
    
    constructor(parent) {
        super(parent);
        this.name = CLASSNAMES.ABOUT_DESCRIPTION;
        this.content = `City layers is a city-making app that empowers citizens to shape the changes they want to see in their cities!`;
    }

    load() { }

    initiate() {
        let element = document.createElement("div");
        element.setAttribute('class', this._name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content; //emoji.emojify(this.content);
        this.getParent().appendChild(element);
    }
}

class AboutText extends CElement {
    static _name = CLASSNAMES.ABOUT_TEXT;
    constructor(parent) {
        super(parent);
        this.content = `City Layers embody the motto “act local to go global” 
        by relying on citizen mapping as a holistic and inclusive city-making 
        practice that aims to tackle the contemporary spatial, social and 
        environmental challenges our cities are facing. <br><br>

        This powerful city mapping app serves as a means of 
        communication between cities and their citizens, 
        generating a new type of data that is 
        collectively generated, managed and cared for. `
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

class AboutLogo extends CElement {
    
    constructor(parent, category) {
        super(parent, category);
        this.name = "aboutlogo";
        this.content = "/images/about.svg"; // U+02715
    }

    initiate() {
        var element = document.createElement("img");
        element.src = this.content;
        element.setAttribute('class', this._name);
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
    }
}

