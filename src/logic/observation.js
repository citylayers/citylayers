"use strict";
exports.__esModule = true;
exports.Point = exports.Place = exports.Observation = void 0;
var Observation = /** @class */ (function () {
    function Observation(id, answers) {
        this.id = id;
        this.answers = answers;
    }
    return Observation;
}());
exports.Observation = Observation;
var Place = /** @class */ (function () {
    function Place(id, lat, lon) {
        this.id = id;
        this.lat = lat;
        this.lon = lon;
    }
    return Place;
}());
exports.Place = Place;
var Point = /** @class */ (function () {
    function Point(place, obs) {
        this.place = place;
        this.obs = obs;
    }
    return Point;
}());
exports.Point = Point;
