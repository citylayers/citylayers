

class Position{
    static lat = 48.210033;
    static lon = 16.363449;

    static make(){
        if (navigator && navigator.geolocation) {
            
            navigator.geolocation.getCurrentPosition(
                function success(pos) {
                    Position.lat = pos.coords.latitude;
                    Position.lon = pos.coords.longitude;
                },
                
                function (error) {
                    console.log(error);
                    if (error.code == error.PERMISSION_DENIED) {
                        alert("you need to allow your location in order to contiue");
                    }
                }
            );
        }
    }
    // static load() {
    //     if (navigator) {
            
    //         if (navigator.geolocation) {
    //             console.log(navigator.geolocation);
    //             return navigator.geolocation.getCurrentPosition(this._call, this._error);
    //         }
    //     }
    //     console.log("Geoposition undefined");
    // }

    // _error(geo){
    //     console.log(geo);
    //     console.log("failed to get position");
    // }

    // _call(geo) {
    //     console.log(geo);
    //     let url = TopTagPanel.getUrl(geo.coords.latitude, geo.coords.longitude);
    //     console.log(url);
    //     return fetch(url, {
    //         method: "GET",
    //         headers: { 'Content-Type': 'application/json' },
    //     }).then(result => {
    //         if (result.status == 200) {
    //             return result.json().then(res => {
    //                 document.getElementsByClassName(CLASSNAMES.GEOCODONG_PANEL)[0].innerHTML = GeocodeParser.run(res);
    //                 return res;
    //             });
    //         }
    //         else if (result.status == 429) {
    //             return sleep(1000).then(r => { return this.request() });
    //         }
    //         else if (result.status == 504) {
    //             return this.request();
    //         }
    //         else {
    //             console.log(`CODE: ${result.status}`);
    //         }
    //         return result;
    //     });
    // }
}