
class TopTagPanel extends CElement {
    
    constructor(parent) {
        super(parent);
        this.id = "geocodingpanelid";
        this.name = CLASSNAMES.GEOCODONG_PANEL;
        this.parent = parent ? parent : "body";
        this.content = "";
        this.elements = [];
    }

    getParent() {
        let elements = document.getElementsByClassName(this.parent);
        if (elements.length > 0) {
            return elements[0];
        }
    }

    static getUrl(lat, lon) {
        return `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2&zoom=12`
    }

    initiate() {
        let element = document.createElement("div");
        element.setAttribute('class', this.name);
        element.setAttribute("id", this.make_id());
        element.innerHTML = this.content; //emoji.emojify(this.content);
        this.getParent().appendChild(element);
    }

    load() {
        if (navigator) {
            
            if (navigator.geolocation) {
                return navigator.geolocation.getCurrentPosition(this._call, this._error);
            }
        }
        console.log("Geoposition undefined");
    }

    _error(geo){
        console.log("failed to get position");
    }

    _call(geo) {
        let url = TopTagPanel.getUrl(geo.coords.latitude, geo.coords.longitude);
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