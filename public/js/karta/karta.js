class Karta extends CElement{
    static name = CLASSNAMES.MAP;
    static content = undefined;
    static markers = undefined;
    static layers = {};
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
            pubsub.subscribe(this.update);
        }
    }

    make_id() {
        return CLASSNAMES.MAP;
    }
    load_map(vis) {
        let lat = Position.lat;
        let lon = Position.lon;
        Karta.content = L.map(CLASSNAMES.MAP)
        Karta.content.setView([lat, lon], 13);

        Karta.layers.osm = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            name: "osm",
            minZoom: 0,
            maxZoom: 19,
            crs: L.CRS.Simple,
            ext: 'png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(Karta.content);
        Karta.layers.osm.setZIndex(10);
        Karta.content.addLayer(Karta.layers.osm);
        
        Karta.layers.heat = HeatmapManager.init(vis)
        Karta.layers.heat.addTo(Karta.content);

    }

    load(obs){
        let markers = [];
        obs.forEach(o=>{
            markers.push(MarkerManager.addMarker(o.place.lat, 
                                                 o.place.lon, 
                                                 o.place.id,
                                                o.obs[0].answers
                                                ));
        });
        Karta.markers = L.layerGroup(markers);
    }

    static _checkOne(leaf, answer_leaf){
        if (answer_leaf==undefined || answer_leaf==null || answer_leaf.length==0){
            return false;
        }
        
        let a = answer_leaf[0];
        if (leaf.value instanceof Object){
            let v = parseInt(a.value);
            return parseInt(leaf.value.get('min')) <= v && v <= parseInt(leaf.value.get('max'));
        }
        else if (typeof leaf.value=='boolean'){
            if (leaf.value==true){
                return leaf.value == a.value;
            }
        }
        
        return false;
    }

    static _check(tree, values){
        
        if (values.map(v=>v.id).filter(v=>tree.map(t=>t.id).includes(v)).length==0){
            return false;
        };
        return tree.map(l =>  Karta._checkOne(l, values.filter(v=>v.id==l.id))).filter(l=>l==true).length>0;
        
    }

    update(payload){
        
        HeatmapManager.make(Karta.layers.heat, 
            Object.values(Karta.markers._layers).filter(l=>Karta._check(payload, l.options.values)));

    }
}

class GradientManager{

    

    static makeClassic(){
        
        return {0.5: document.getElementById("colorpicker_1").value, 
            // 0.75: '#65B89167', 
            // 0.9: '#93E5AB67',
            1: document.getElementById("colorpicker_2").value};
    }
    static makeElements(){
        return {
            1: '#4E878C'};
    }
    static makeFlat(){
        return {
            1: '#4E878C'};
    }

    
}


class HeatmapStyle{
    static makeClassic(){
        return {radius: 25, 
            blur:30,
            maxZoom: 10,
            ext: "png",
            minOpacity: 0,
            gradient: GradientManager.makeClassic(),
            name:"heat"};
    }
    static makeFlat(){
        return {radius: 25, 
            blur:1,
            maxZoom: 10,
            ext: "png",
            minOpacity: 0,
            gradient: GradientManager.makeFlat(),
            name:"heat"}
        }

    static mapping = new Map([
        [VIS.HIGHLIGHT, this.makeFlat],
        [VIS.GRADIENT, this.makeClassic],
        [VIS.ELEMENTS, this.makeElements]
        ]
    )
    static make(vis){
        return this.mapping.get(vis)();
    }
}

class HeatmapManager{
    
    static init(vis){
        if (vis==undefined){
            vis = VIS.GRADIENT;
        }
        return L.heatLayer([].map(e=>e*0.001).map(e=>
            {
                return [Position.lat +e, 
                        Position.lon , 
                        Math.min(1, 0.2 + e*10)]}), 
                // HeatmapStyle.makeClassic()
                HeatmapStyle.make(vis)
            )
    }

    static make(layer, markers){
        let m = markers.map(m=>[m._latlng.lat, m._latlng.lng, 1])
        layer.setLatLngs(m);
        layer.options = HeatmapStyle.makeClassic();
        console.log(layer);
        layer.setAttribute("options", HeatmapStyle.makeClassic());
        console.log(layer);

    }

}

class MarkerManager{

    static makeIcon(icon_path){
        
        icon_path = icon_path==undefined ? TAG_ICONS.NORMAL : icon_path;

        return L.icon({
            iconUrl: icon_path,
            // shadowUrl: 'leaf-shadow.png',
        
            iconSize:     [15, 15], // size of the icon
            // shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [7, 7], // point of the icon which will correspond to marker's location
            // shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
    }

    static addMarker(lat, lon, id, values){
        
        
            let m = L.marker([lat, lon], 
                            {icon: this.makeIcon(TAG_ICONS.NORMAL), 
                            id: id, 
                            values:values
            }).addTo(Karta.content).on('click', (e)=>{
                                                            
                let icon_path = e.target.options.icon.options.iconUrl == 
                                            TAG_ICONS.NORMAL ? TAG_ICONS.SELECTED : TAG_ICONS.NORMAL
                e.target.setIcon(this.makeIcon(icon_path));
                console.log(e.target.options);
    
                // MapPanel.toggleComment(id, _icon_path==TAG_ICONS.SELECTED);
            
            });
            // this._markers.push(m);
            return m;
    }

}

const TAG_ICONS = {
    NORMAL : '/images/tag_icon.png',
    SELECTED : '/images/tag_selected.svg'
}