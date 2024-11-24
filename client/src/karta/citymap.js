class Settings{
    static debug = false;
}

const MAP_CLASSNAMES = {
    MAP_PANEL: "mappanel",
    MAP: "map",
}

const GRIDS = {
    RECT: "rectangular",
    DIAGONAL: "diagonal",
}




class MapPanel{

    static toggleComment = (i, on)=>{console.log(i, on)};
    /*
        Object that holds the panel with the interactive map.
        Args:
            parent: HTMLElement         element to place the map onto, defaults to body

        How to use:

        let m = new MapPanel(parent);
        m.load();
    */

    constructor(parent){
        this.name = MAP_CLASSNAMES.MAP_PANEL;
        this.parent = parent ? parent : "body";
        this.id = "id";
        this.children = [];
    }

    load(categories, obs) {
        
        let citymap = new CityMap(this.make_id(), categories, obs);
        this.children.push(citymap);
    }

    reload(category, lower, upper) {
        this.children[0].reload(category, lower, upper);
    }

    reloadProject(project, active){
        
        project.config.categories.map(c=>
            this.reload(c, active)
        )
    }

    reloadMarkers(subcategory, on){
        this.children[0].toggleMarkers(subcategory, on);
    }

    activate(id, on){
        this.children[0].activateMarker(id, on);
    }
    getCoords(){

        return this.children[0].getCoords();
    }

    getElement(){
        let elements = document.getElementsByClassName(this.name);
        if (elements.length > 0){
            return elements[0];
        }
        return this.initiate();
    }

    getParent(){
        let elements = document.getElementsByClassName(this.parent);
        if (elements.length>0){
            return elements[0];
        }
    }

    initiate(){
        let panel = document.createElement("div");
        panel.setAttribute('class', this.name);
        panel.setAttribute("id", this.make_id());
        this.getParent().appendChild(panel);
        return panel;
    }

    make_id(){
        return `${this.name}_${this.id}`
    }

}

const TAG_ICONS = {
    NORMAL : 'images/tag_icon.png',
    SELECTED : 'images/tag_selected.svg'
}

class CityMap extends MapPanel{
    
    constructor(parent, categories, places){
        super(parent);
        this.name = MAP_CLASSNAMES.MAP;
        this.parent = parent;
        this.id = "id";
        this.places = places;
        this.coords = this.places.map(c=>c["pt"]);
        this.categories = categories;
        this._map = this.initiate();
        
        this._icon = this._makeIcon(TAG_ICONS.NORMAL);
        this._markers = new Array();
    }

    _filterObservations(category, lower, upper){
        if (category==undefined){
            return [];
        }
        return this.places.filter(c => c.grade.filter(g=>g["category_id"].toString()==category.toString()).length>0)
                    .filter(c=>c.grade.filter(g=>g["grade"]>lower && g["grade"] < upper).length>0 );
    }

    initiate(){
        
        let _map = L.map(this.parent);
        Positioner.make(_map);
        CityMap.setup(_map);
        CityMap.addOsmLayer(_map);
        
        // this.coords.forEach(coord => this.addMarker(mapObj, coord[0], coord[1]));
        // this.addDebugGrid(mapObj);
        // this.categories.forEach(category=> CityMap.addHatchLayer(_map, 
        //                 this._filterObservations(category.name, 0, 100).map(c=>c["pt"]), 
        //                 category.name));

        return _map
    }

    getCoords(){
        
        return this._map.getCenter();
    }

    reload(category, lower, upper){
        
        let _coords = this._filterObservations(category.id, lower, upper).map(c=>c["pt"]);
        this._map.eachLayer(function(layer){
            if (layer.options.name == category.name){
                layer.remove();
            }
        });
        CityMap.addHatchLayer(this._map, _coords, category);
        // _coords.forEach(c=> this.addMarker(category.name, c.lat, c.lng))
        // setTimeout(()=>{CityMap.addHatchLayer(this._map, _coords, category)}, 0);
        

    }

    _makeIcon(icon_path){
        
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


    addMarker(lat, lon, id, subcategory){
        
        if (!this._markers.map(c=>c.options.id).includes(id)){
            let m = L.marker([lat, lon], {icon: this._icon, id: id, subcat:subcategory}).addTo(this._map).on('click', (e)=>{
                                                            
                let _icon_path = e.target.options.icon.options.iconUrl == 
                                            TAG_ICONS.NORMAL ? TAG_ICONS.SELECTED : TAG_ICONS.NORMAL
                e.target.setIcon(this._makeIcon(_icon_path));
    
                MapPanel.toggleComment(id, _icon_path==TAG_ICONS.SELECTED);
            });
            this._markers.push(m);
            return m;
        }
        return this.getMarker(id)[0];
    }

    getMarker(id){
        return this._markers.filter(m => m.options.id==id);
    }

    activateMarker(id, on){
        let _places = this.places.filter(c=>c.pt.id.toString()==id.toString());
        if (_places.length==0) {return;}
        let m = this.addMarker(_places[0].pt.lat, _places[0].pt.lng, _places[0].pt.id, _places[0].subcat); 
        let _icon_path = on == true ? TAG_ICONS.SELECTED : TAG_ICONS.NORMAL
        m.setIcon(this._makeIcon(_icon_path));
        
        this._markers.filter(m=> m.options.id!=id).forEach(m=>m.setIcon(this._makeIcon(TAG_ICONS.NORMAL)));
        this._map.setView([_places[0].pt.lat, _places[0].pt.lng]);
        return;
    }

    toggleMarkers(subcategory, on){
        return on==true? this.addMarkers(subcategory) : this.clearMarkers(subcategory);
    }

    addMarkers(subcategory){
        
        let _places = this.places.filter(c=>c["subcat"].filter(s=>s.subcategory_id==subcategory).length>0);
        _places.forEach(place =>{
            this.addMarker(place.pt.lat, place.pt.lng, place.pt.id, subcategory);
        })
    }

    clearMarkers(subcategory){
        this._markers.filter(m => m.options.subcat==subcategory).forEach(m=>this._map.removeLayer(m));
        
        this._markers = this._markers.filter(m => m.options.subcat!=subcategory);
    }

    static setup(map){
        map.zoomControl.remove();
        map.touchZoom.enable();
        map.scrollWheelZoom.enable();

    }

    static addOsmLayer(map){
        let osmLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            name: "osm",
            minZoom: 0,
            maxZoom: 19,
            crs: L.CRS.Simple,
            ext: 'png'
        }).addTo(map);
        osmLayer.setZIndex(100);
        map.addLayer(osmLayer);
    }

    static addHatchLayer(map, pts, category){
        
        L.GridLayer.CanvasCircles = L.GridLayer.extend({
            createTile: function (coords) {
                let el = TileManager.init(category.name);
                
                el = TileManager.update(el, map, coords, 
                                        pts, `#${category.color}`); //, randomShift, module);
                return el;
            }
        }
    );
        let hatchLayer = new L.GridLayer.CanvasCircles({crs: L.CRS.Simple, 
                                                        name: `${category.name}`});
        map.addLayer(hatchLayer);
        hatchLayer.setZIndex(101);
        map.on("zoomend", function(ev){
            hatchLayer.redraw();
        });
    }

    static addDebugGrid(map){
        /*
            Function that draws a tile grid with tile coordinates written in 
            grid angles. To be used for debugging.
        */
        
        L.GridLayer.DebugCoords = L.GridLayer.extend({
            createTile: function (coords) {
                var tile = document.createElement('div');
                let tcoords = MapTransformer.tile2coords(coords.x, coords.y, coords.z);
                
                let zeroCoords = MapTransformer.px2coords(map, coords, 0,0);
                
                let dst = MapTransformer.calcDistance(map, 
                    [zeroCoords.lat, zeroCoords.lng], 
                    [59.312152351483135, 18.079562224248082]);
                tile.innerHTML = [
                    tcoords.lat, tcoords.lng, // dst 
                    coords.x, coords.y, coords.z
                ].join(', ');
                tile.style.outline = '1px solid red';
                return tile;
            }
        });
        
        L.GridLayer.debugCoords = function(opts) {
            return new L.GridLayer.DebugCoords(opts);
        };
        
        map.addLayer( L.GridLayer.debugCoords() );
    }
}

function deg2rad(angle){
    return Math.PI * angle / 180;
}

class Place{
    constructor(lat, lon, grade){
        this.lat = lat;
        this.lon = lon;
        this.grade = grade;
    }
}

class MapTransformer{
    static calcDistance(map, coords1, coords2){
        return map.distance(coords1, coords2);
    }

    static px2coords(map, tileCoords, x,y){
        let tcoords = MapTransformer.tile2coords(tileCoords.x, tileCoords.y, tileCoords.z);
        x = Math.abs(x);
        y = Math.abs(y);
        let north = map.getBounds().getNorth();
        let south = map.getBounds().getSouth();
        let east = map.getBounds().getEast();
        let west = map.getBounds().getWest();
        let mapSize = map.getSize();
        let lon = tcoords.lng + ((east - west) * x / mapSize.x);
        let lat = tcoords.lat - ((north - south) * y / mapSize.y);
        return L.latLng(lat, lon)
    }
    static coords2px(map, lat,lon){
        return map.latLngToLayerPoint(L.latLng(lat, lon));
    }

    static tile2coords(xtile, ytile, zoom) {
        let n = Math.pow(2.0, zoom);
        let lng = xtile / n * 360.0 - 180.0;
        let lat_rad = Math.atan(Math.sinh(Math.PI * (1 - 2.0 * ytile / n)));
        let lat = 180.0 * lat_rad / Math.PI;
        return {lat, lng};
    }

}

class MapGraphics{
    static refDist = 1000; // distance at which a grade has influence on the hatch pattern
    static minRad = 1; // minimal radius of a hatch pattern
    static gridDensity = 16;  // grid scarcity:) the amount of points in each direction that would be squeezed into 256. So
                              // if gridDensity is 4, there will be 4 points with distance 64 between them (4 x 64 = 256)
    static tile = 256; // tile size
    
    static getGrid(category){
        return GRIDS.DIAGONAL;
    }
}

class Positioner{
    static initZoom = 15

    static async make(map){
        if (Settings.debug){
            return this.debugGeo(map);
        }
        return this.setFromGeo(map);
    }
    static debugGeo(map){
        map.setView([59.315906, 18.0739635], this.initZoom)
    }
    static setFromGeo(map){
        map.locate({setView: true, maxZoom: this.initZoom});
    }
}

class Grid{
    /*
    Object responsible for constructing different grids.
    Currently available grids:
        * simple rectangular
        * diagonal 45 degrees

    */
    static controlDims(width, height){
        /*
            Function that controls input dimensions and sets them to default in case they are missing
            or invalid.
            Args:
                width       width of the grid, int, defaults to MapGraphics.tile if undefined
                height      height of the grid, int, defaults to MapGraphics.tile if undefined
        */
        width = width? width : MapGraphics.tile;
        height = height? height : MapGraphics.tile;
        return [width, height];

    }
    static rect(width, height){
        /*
            Function that calculates intersection points for a regular rectangular grid. Returns
            a set of coordinates that represent these intersections as [[x,y],[x,y]]
            Args:
                width       width of the grid, int, defaults to MapGraphics.tile if undefined
                height      height of the grid, int, defaults to MapGraphics.tile if undefined
        */

        [width, height] = this.controlDims(width, height);
        
        let xArray = Array.from({length: width + 1}, 
            (x, i) => i % MapGraphics.gridDensity==0 ? i : undefined).
            filter(e=>e!=undefined);
        let yArray = Array.from({length: height + 1}, 
            (x, i) => i % MapGraphics.gridDensity==0 ? i : undefined).
            filter(e=>e!=undefined);

        let coords = new Array();
        xArray.forEach(x => {
            yArray.forEach(y =>{
                coords.push([x, y]);
            });
        });
        return coords;
    }

    static diagonal(width, height, gridDensity){
        /*
            Function that calculates intersection points for a diagonal grid, 45 degrees. Returns
            a set of coordinates that represent these intersections as [[x,y],[x,y]]
            Args:
                width       width of the grid, int, defaults to MapGraphics.tile if undefined
                height      height of the grid, int, defaults to MapGraphics.tile if undefined
        */
       let gd = gridDensity==undefined?MapGraphics.gridDensity : gridDensity;
        [width, height] = this.controlDims(width, height);
        let xArray = Array.from({length: width + 1}, 
            (x, i) => i % gd==0 ? i : undefined).
            filter(e=>e!=undefined);
        let yArray = Array.from({length: height + 1}, 
            (x, i) => i % gd==0 ? i : undefined).
            filter(e=>e!=undefined);

        let coords = new Array();
            xArray.forEach(x => {
                yArray.forEach(y =>{
                    if (x % ( 2 * gd ) == y % (2 * gd)){
                        coords.push([x, y]);
                    }
                    
                });
            });
            return coords;

    }
}

class HatchDrawer{
    /*
    Object responsible for drawing hatch patterns.

    */

    static makeRadius(refDist, ptDist){
        /*
            Function that calculates radius based on the distance from the nearest 
            mark.
            Args:
                refDist     distance that counts as mark's influence radius
                ptDist      actual distance from the given point to the nearest mark
        */
        let rad = MapGraphics.minRad;
        
        if (Math.abs(ptDist) < refDist){
            // if the given point is inside the influence area
            ptDist = ptDist==0 ? 1 : ptDist;  // avoid division by zero
            rad = refDist / Math.abs(ptDist); // radius is inversely proportional to the distance to the 
                                              // closest influence point
        }
        // radius can't be more than 8

        return Math.min(rad, 8);
    }

    static drawCircle(ctx, radius, x ,y){
        /*
            Function that draws a circle on the map given x, y, radius.

            Args:
                ctx         context to draw the circle in, Context
                radius      circle's radius
                x           x coordinate of the center of the circle, in pixels from top left angle of the tile
                y           y coordinate of the center of the circle, in pixels from top left angle of the tile
        */
        ctx.moveTo( x + radius, y );
        ctx.arc( x , y , radius, 0, Math.PI * 2 );
    }

    static make(map, ctx, tileCoords, pts){
        /*
            Function that draws circles hatch pattern on the map given tile coordinates and points
            to compare the hatch with. Closer to the points the hatch will have a denser pattern.

            Args:
                map         map the points belong to
                ctx         context to draw the circle in, Context
                tileCoords  coordinates of the tile to draw the hatch on, calculated in leaflet units from the pixelorigin
                            {x: 9046, y: 596, z: 16}
                pts         reference points for drawing the hatch pattern
        */
        let grid = Grid.diagonal(MapGraphics.tile, MapGraphics.tile);
        grid.forEach(coords =>{
            let [x, y] = coords;
            let crds = MapTransformer.px2coords(map, tileCoords, x, y);
            let dst = Math.min(...pts.map(pt=>MapTransformer.calcDistance(map, [crds.lat, crds.lng], [pt["lat"], pt["lng"]])));                
            let radius =  this.makeRadius(MapGraphics.refDist, dst);
            this.drawCircle(ctx, radius, x, y);
            })
        }
}

class TileManager{
    /*
    Object responsible for management of a single tile.
    Performs init, draw, clean, update operations.
    */

    static clear(el){
        // let el = document.getElementsByTagName("canvas");
        let ctx = el.getContext("2d");
        ctx.clearRect(0, 0, MapGraphics.tile, MapGraphics.tile)
    }

    static draw(el, map, tileCoords, pts, color){
        var ctx = el.getContext('2d');

        this.setContext(ctx, color);
        // ctx.rotate(30 * Math.PI / 180);
        ctx.beginPath();
        
        HatchDrawer.make(map, ctx, tileCoords, pts);
        
        ctx.stroke();
        ctx.fill();
        return el;
    }

    static init(category){
        var el = document.createElement('canvas');
        el.setAttribute("className", category)
        el.setAttribute('width', MapGraphics.tile);
        el.setAttribute('height', MapGraphics.tile);
        return el;
    }

    static setContext(ctx, color){
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.7;
        ctx.strokeStyle = "rgb(255 0 0 / 0%)";
    }

    static update(el, map, tileCoords, pts, color){
        this.clear(el);
        return this.draw(el, map, tileCoords, pts, color);
    }


}