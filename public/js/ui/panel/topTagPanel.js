/**
 * Top Tag Panel / Geocoding Panel
 * Migrated from topTagPanel.js to TypeScript with BaseComponent pattern
 */
/**
 * Panel for displaying geocoding information based on user location
 */
class TopTagPanel extends BaseComponent {
    constructor(parent) {
        super(parent || "body", ClassName.GEOCODING_PANEL, "geocodingpanelid");
        this.content = "";
        this.elements = [];
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
     * Generate OpenStreetMap Nominatim reverse geocoding URL
     */
    static getUrl(lat, lon) {
        return `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2&zoom=12`;
    }
    createElement() {
        const element = super.createElement();
        element.innerHTML = this.content;
        return element;
    }
    /**
     * Load geocoding data using browser geolocation API
     */
    load() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._call.bind(this), this._error.bind(this));
        }
        else {
            console.log("Geoposition undefined");
        }
    }
    /**
     * Error handler for geolocation failure
     */
    _error(geo) {
        console.log(geo);
        console.log("Failed to get position");
    }
    /**
     * Success handler for geolocation - fetch reverse geocoding data
     */
    _call(geo) {
        const GeocodeParser = window.GeocodeParser;
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        let url = TopTagPanel.getUrl(geo.coords.latitude, geo.coords.longitude);
        return fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then(result => {
            if (result.status === 200) {
                return result.json().then(res => {
                    const panels = document.getElementsByClassName(ClassName.GEOCODING_PANEL);
                    if (panels.length > 0 && GeocodeParser) {
                        panels[0].innerHTML = GeocodeParser.run(res);
                    }
                    return res;
                });
            }
            else if (result.status === 429) {
                return sleep(1000).then(() => this._call(geo));
            }
            else if (result.status === 504) {
                return this._call(geo);
            }
            else {
                console.log(`CODE: ${result.status}`);
            }
            return result;
        });
    }
}
