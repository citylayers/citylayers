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
        }
    

    make_id() {
        return CLASSNAMES.MAP;
    }
    load(config) {
        let obs = undefined;
        let controls = undefined;
        if (config!=undefined){
            obs = config.obs;
            controls = config.qas;
        }
            
        if (Karta.content===undefined){
            let lat = Position.lat;
            let lon = Position.lon;
            Karta.content = L.map(CLASSNAMES.MAP)
            Karta.content.setView([lat, lon], 13);
            Karta.layers = LayerInitializer.make(controls, obs)  //.addTo(Karta.content);
            Karta.layers.osm.setZIndex(10);
            Karta.content.addLayer(Karta.layers.osm);

            // Karta.layers.heat = VisualizationManager.init();
            Karta.layers.heat.forEach(l=>l.addTo(Karta.content));
            Karta.layers.flat.forEach(l=>l.addTo(Karta.content));

            // Add markers to map but hide them initially (default mode is gradient)
            Karta.layers.markers.forEach(l=>l.addTo(Karta.content));
            const markerPane = document.getElementsByClassName("leaflet-marker-pane")[0];
            if (markerPane) {
                markerPane.style.display = DISPLAY.NONE;
            }

            // VisualizationManager.managed_layer = Karta.layers.heat;
            try {
                pubsub.subscribe(this.update);
                colorpubsub.subscribe(this.update);
                vischoicepubsub.subscribe(this.update);

            } catch (error) { }
            Karta.updatePositionOnMapMove();
            
        }
    }
    static getMapCenterCoordinates() {
        if (Karta.content) {
            const center = Karta.content.getCenter();
            return { lat: center.lat, lon: center.lng };
        }
        return null; // Return null if the map is not initialized
    }

    static updatePositionOnMapMove() {
        if (Karta.content) {
            Karta.content.on('moveend', () => {
                const center = Karta.content.getCenter();
                Position.update(center.lat, center.lng);
            });
        }
        const centerCoordinates = Karta.getMapCenterCoordinates();
        if (centerCoordinates) {
            console.log(`Center Latitude: ${centerCoordinates.lat}, Longitude: ${centerCoordinates.lon}`);
        } else {
            console.log("Map is not initialized.");
        }
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
        if (values.map(v=>v.id).filter(v=>tree.filter(t=>t.value!=false).map(t=>t.id).includes(v)).length==0){
            return false;
        };
        return tree.map(l =>  Karta._checkOne(l, values.filter(v=>v.id==l.id))).filter(l=>l==true).length>0;
    }

    update(payload){
        // If no payload provided, use the current tree state
        const treePayload = window.tree ? window.tree.out() : [];
        const currentPayload = payload !== undefined ? payload : treePayload;

        // Filter markers and call VisualizationManager
        const filteredMarkers = Object.values(Karta.layers.markers[0]._layers)
        

        VisualizationManager.make(filteredMarkers, currentPayload);
    }    
}

class LayerInitializer{
    // static colors = ["#FF5733", "#FFBD33", "#75FF33", "#33FFBD", "#3375FF", "#9B33FF" ]

    static osm(){
        return L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            name: "osm",
            minZoom: 0,
            maxZoom: 19,
            crs: L.CRS.Simple,
            ext: 'png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
    }

    static markers(obs){
        let markers = [];
        obs.forEach(o=>{
            markers.push(MarkerManager.addMarker(o.place.lat, 
                                                 o.place.lon, 
                                                 o.place.id,
                                                o.obs[0].answers
                                                ));
        });
        return L.layerGroup(markers, {name: "elements"});
    }

    static heat(controls){

        let vis = VisualizationManager.getGlobalVis();

        return L.heatLayer([].map(e=>e*0.001).map(e=>
            {
                return [Position.lat +e, 
                        Position.lon , 
                        Math.min(1, 0.2 + e*10)]}), 
                HeatmapStyle.make(vis, "", controls)
            );
    }

    static flat(controls){
        
        return controls.filter(c=>c.content.map(a=>a.answer)
                                           .filter(a=>a.type==ANSWERS.RANGE).length>0)
                       .map((c,i)=>{
            let id = c.content.map(a=>a.answer)
                              .filter(a=>a.type==ANSWERS.RANGE)[0].id;
            let color = document.getElementById(`color picker_${id}`).value;
            
            return L.heatLayer([].map(e=>e*0.001).map(e=>
                {
                    
                    return [Position.lat +e, 
                            Position.lon , 
                            Math.min(1, 0.2 + e*10)]}), 
                    HeatmapStyle.make("highlight", id, color)
                )
            })
        }
    

    static make(controls, obs){
        return controls!=undefined? 
             {
                osm: this.osm(),
                heat: [this.heat(controls)],
                flat: this.flat(controls),
                markers: [this.markers(obs)]
            } :
            {
                osm: this.osm(),
                heat: [],
                flat: [],
                markers: []
            }

        
        
    }
}

class GradientManager{

    static makeClassic(){
        const picker1 = document.getElementById("gradpicker_1");
        const picker2 = document.getElementById("gradpicker_2");

        return {0: picker1 ? picker1.value : '#014751',
            // 0.75: '#65B89167',
            // 0.9: '#93E5AB67',
            1: picker2 ? picker2.value : '#014751'};
    }
    static makeElements(){
        return {
            1: '#4E878C'};
    }
    static makeFlat(color){
        return {
            1: color};
    }
}

class OpacityController{

    static run(opacity){
        document.documentElement.style.setProperty("--vis-opacity", `${opacity}%`);
    }
}

class HeatmapStyle{
    static makeClassic(){
        return {radius: 25, 
            blur:30,
            maxZoom: 10,
            ext: "png",
            minOpacity: 50,
            gradient: GradientManager.makeClassic(),
            name:"heat"};
    }
    static makeFlat(id, color){
        return {
            radius: 25, 
            blur: 5,
            maxZoom: 10,
            ext: "png",
            minOpacity: 100,
            gradient: GradientManager.makeFlat(color),
            name:`flat_${id}`}
        }
    static makeElements(){
        return {
            name: "elements"
        }
    }

    static getMapping() {
        // Lazy initialization to avoid VIS being undefined at class load time
        if (!this._mapping) {
            this._mapping = new Map([
                [VIS.HIGHLIGHT, this.makeFlat],
                [VIS.GRADIENT, this.makeClassic],
                [VIS.ELEMENTS, this.makeElements]
            ]);
        }
        return this._mapping;
    }

    static make(vis, id, color){
        return this.getMapping().get(vis)(id, color);
    }
}

class GlobalVisualization{
    constructor(vis){
        this.active = vis;
    }

}

class VisualizationManager{


    static mapping(){
        return new Map([
        [VIS.GRADIENT, Karta.layers.heat],
        [VIS.HIGHLIGHT, Karta.layers.flat],
        [VIS.ELEMENTS, Karta.layers.markers],
    ]);
    }
    static calc_mapping(){
        return new Map([
        [VIS.GRADIENT, GradValueCalculator],
        [VIS.HIGHLIGHT, ValueCalculator],
        [VIS.ELEMENTS, ValueCalculator],
    ]);
    }
    static opacity_mapping(){
         return new Map([
        [VIS.GRADIENT, 100],
        [VIS.HIGHLIGHT, 50],
        [VIS.ELEMENTS, 100],
    ]);
    }


    static init(){

        let vis = this.getGlobalVis();

        return L.heatLayer([].map(e=>e*0.001).map(e=>
            {
                return [Position.lat +e, 
                        Position.lon , 
                        Math.min(1, 0.2 + e*10)]}), 
                HeatmapStyle.make(vis)
            )
    }   

    static clear(){
        document.getElementsByClassName("leaflet-heatmap-layer").forEach(canvas=>{
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            }
        )
        
    }

    static getAllLayers(){
        return [...Karta.layers.heat, ...Karta.layers.flat, ...Karta.layers.markers]
    }

    static clearLayer(layer){
        if (!layer.options.name.includes("elements")){
            layer.setLatLngs([]);
        }
        else{
            document.getElementsByClassName("leaflet-marker-pane")[0].style.display = DISPLAY.NONE;
        }
        
    }

    static make(markers, tree){
        
        let vis = this.getGlobalVis();
        let calc = this.calc_mapping().get(vis);
        let opacity = this.opacity_mapping().get(vis);

        markers.forEach((marker, i) => {
                    const markerElement = marker._icon;
                    if (markerElement) {
                        markerElement.style.display = 'none';
                    }
                });

        // clear all
        this.getAllLayers().forEach(l=>this.clearLayer(l));
        

        tree.forEach((tt, i)=>{
            let id = tt.id;
            let _markers = markers.filter(m=>MarkerFilterer.run(tree, m, id).length>0)
                .map(
                    m=>[m._latlng.lat, m._latlng.lng, calc.make(tree, m, id)]
            );

            if (vis!="elements"){
                // Find the specific layer for this ID (e.g., flat_<id>)
                let layer = this.mapping().get(vis).find(l => l.options.name === `flat_${id}` || l.options.name === "heat");
                if (layer) {
                    layer.setLatLngs(_markers);
                }
            }
            else{
                document.getElementsByClassName("leaflet-marker-pane")[0].style.display = DISPLAY.FLEX;

                markers.forEach((marker, i) => {
                    const markerElement = marker._icon;
                    if (markerElement) {
                        markerElement.style.display = 'none';
                    }
                });

                markers.forEach((marker, i) => {
                    const shouldShow = MarkerFilterer.runWithTags(tree, marker, id);
                    const markerElement = marker._icon;
                    if (markerElement) {
                        markerElement.style.display = shouldShow ? '' : 'none';
                    }
                });
            }

        });
        
        VisualizationManager.updateColors();
        OpacityController.run(opacity);
    }

    static getGlobalVis(){
        return globalvisualization.active;
    }

    static getColor(id){
        let cp = document.getElementById(`color picker_${id}`);
        return cp ==undefined ? undefined : cp.value;
    }

    static updateColors(){
        let vis = this.getGlobalVis();
        if (vis!="elements"){
            this.mapping().get(vis).forEach((l, i)=>{
                let id = l.options.name.split("_")[1];
                let color = VisualizationManager.getColor(id);
                let options = HeatmapStyle.make(vis, id, color);
                l.setOptions(options);
            })

        }



    }
}

class MarkerFilterer {

    static getRelevantStats(tree){
        // filter only active categories
        return tree.filter(t=>t.value!=false).filter(t=>t.value!=true);
    }

    static oneCategory(marker_values, id){
        
        if (id==undefined){
            return marker_values;
        }
        return marker_values.filter(v=>v.id==id)
    }

    static run(tree, marker, id){
        let relevantStats = this.getRelevantStats(tree);
        
        let res= marker.options.values
            .filter(v=>relevantStats.map(t=>t.id)
                                    .includes(v.id))  // get only those marker values that have ids from relevant stats
            .filter(v=>typeof v.value =="string")  // filter only range
            .filter(v=>relevantStats.filter(s=>s.id==v.id)[0].value.get(RANGE_LABELS.MIN) < parseInt(v.value))
            .filter(v=>relevantStats.filter(s=>s.id==v.id)[0].value.get(RANGE_LABELS.MAX) > parseInt(v.value))
            ;
        return this.oneCategory(res, id);
    }
    
    static runWithTags(tree, marker, id){
        let relevantStats = this.getRelevantStats(tree);
        console.log(tree);
        let rangeFilters = tree.filter(t => t.value instanceof Map);
        let tagFilters = tree.filter(t => typeof t.value === 'boolean' && t.value === true);
        if (rangeFilters.length === 0 && tagFilters.length === 0) {
            
            return false;
        }
        
        return this.passesRange(marker, rangeFilters); // && this.passesTag(marker, tagFilters);
        // if (res.length>0){
        //     console.log(marker.options.id);
        // }
        
        //return this.oneCategory(res, id);
    }


    static passesRange(marker, rangeFilters){
        
        let passesRange = false;
        if (rangeFilters.length > 0) {
            let rangeMatches = marker.options.values
                .filter(v=>rangeFilters.map(t=>t.id).includes(v.id))
                .filter(v=>typeof v.value =="string")
                .filter(v=>{
                    let filter = rangeFilters.filter(s=>s.id==v.id)[0];
                    if (!filter) return false;
                    let min = filter.value.get(RANGE_LABELS.MIN);
                    let max = filter.value.get(RANGE_LABELS.MAX);
                    let val = parseInt(v.value);
                    return min < val && val < max;
                });
            passesRange = rangeMatches.length > 0;
        }
        return passesRange;
    }

    static passesTag(marker, tagFilters){
        let passesTags = false;
        if (tagFilters.length > 0) {
            let tagMatches = marker.options.values
                .filter(v=>tagFilters.map(t=>t.id).includes(v.id))
                .filter(v=>v.value === true);
            passesTags = tagMatches.length > 0;
        }
        return passesTags;

    }
}

class ValueCalculator{

    static make(tree, marker){
        return 1;
    }
}

class GradValueCalculator extends ValueCalculator{

    static scale(value, min, max){
        /*scales to 0..1*/
        
        return (max-value) / (max-min);
    }

    static make(tree, marker){
        let relevantStats = MarkerFilterer.getRelevantStats(tree);
        let marker_values = MarkerFilterer.run(tree, marker).map(v=>GradValueCalculator.scale(parseInt(v.value), 
        parseInt(relevantStats.filter(s=>s.id==v.id)[0].value.get(RANGE_LABELS.MIN)),
        parseInt(relevantStats.filter(s=>s.id==v.id)[0].value.get(RANGE_LABELS.MAX))
    ));

        let res = marker_values.reduce((partialSum, a) => partialSum + a, 0) / (relevantStats.length);
        
        return res;
    
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

                // Debug popup showing marker values and tags
                let popupContent = '<div style="font-family: monospace; font-size: 11px;"><strong>Marker Debug Info</strong><br/>';
                popupContent += '<strong>ID:</strong> '+ id + '<br/><br/>';

                // Separate range values and tags
                let rangeValues = values.filter(v => typeof v.value === "string");
                let tagValues = values.filter(v => typeof v.value === "boolean");

                if (rangeValues.length > 0) {
                    popupContent += '<strong>Range Values:</strong><br/>';
                    rangeValues.forEach(v => {
                        popupContent += '  • ' + v.id + ': ' + v.value + '<br/>';
                    });
                }

                if (tagValues.length > 0) {
                    popupContent += '<br/><strong>Tags:</strong><br/>';
                    tagValues.forEach(v => {
                        popupContent += '  • ' + v.id + ': ' + (v.value ? '✓' : '✗') + '<br/>';
                    });
                }

                popupContent += '</div>';

                e.target.bindPopup(popupContent).openPopup();
    
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
class LocateButton extends CButton {
    constructor(parent, id) {
        super(parent, "locatebutton");
        this.name = "locatebutton";
        this.buttonText = "Use My Location";
    }
    
    initiate() {
        super.initiate();
        this.getElement().innerHTML = this.buttonText;
    }
    
    load() {
        this.getElement().addEventListener('click', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        console.log('Location:', lat, lng);
                        // Store location in answer tree
                        if (QPanel && QPanel.tree) {
                            QPanel.tree.add('location', { lat, lng });
                        }
                        // Center map on location
                        if (window.map) {
                            window.map.setView([lat, lng], 15);
                        }
                    },
                    (error) => {
                        console.error('Geolocation error:', error);
                        alert('Could not get your location. Please select manually on the map.');
                    }
                );
            } else {
                alert('Geolocation is not supported by your browser.');
            }
        });
    }
}
