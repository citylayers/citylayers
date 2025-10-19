var Position = (function () {
    function Position() {
    }
    Position.make = function () {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                Position.lat = pos.coords.latitude;
                Position.lon = pos.coords.longitude;
                console.log("Latitude: ".concat(pos.coords.latitude));
            }, function (error) {
                console.log(error);
                if (error.code === error.PERMISSION_DENIED) {
                    alert("You need to allow your location in order to continue");
                }
            });
        }
    };
    Position.update = function (lat, lon) {
        Position.lat = lat;
        Position.lon = lon;
        console.log("Updated to: Latitude: ".concat(lat, " Longitude: ").concat(lon));
    };
    Position.lat = 48.210033;
    Position.lon = 16.363449;
    return Position;
}());
