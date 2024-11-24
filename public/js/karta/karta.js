

class Karta extends CElement{
    static name = CLASSNAMES.MAP;
    static content = undefined;
    constructor(parent, id){
        super(parent, id);
    }

    static update(lat, lon){
        Karta.content.setView([lat, lon], 13);
    }

    initiate() {
        let panel = document.createElement("div");
        panel.setAttribute('class', this.name);
        panel.setAttribute("id", this.make_id());
        this.getParent().appendChild(panel);
        if (Karta.content===undefined){
            this.load_map();
        }
    }

    make_id() {
        return CLASSNAMES.MAP;
    }
    load_map() {
        let lat = Position.lat;
        let lon = Position.lon;
        Karta.content = L.map(CLASSNAMES.MAP)
        Karta.content.setView([lat, lon], 13);

        let osmLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            name: "osm",
            minZoom: 0,
            maxZoom: 19,
            crs: L.CRS.Simple,
            ext: 'png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(Karta.content);
        osmLayer.setZIndex(10);
        Karta.content.addLayer(osmLayer);
    }

    load(){}
}