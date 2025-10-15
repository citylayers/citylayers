"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = exports.Place = exports.Observation = void 0;
var Observation = (function () {
    function Observation(id, answers) {
        this.id = id;
        this.answers = answers;
    }
    return Observation;
}());
exports.Observation = Observation;
var Place = (function () {
    function Place(id, lat, lon) {
        this.id = id;
        this.lat = lat;
        this.lon = lon;
    }
    return Place;
}());
exports.Place = Place;
var Point = (function () {
    function Point(place, obs) {
        this.place = place;
        this.obs = obs;
    }
    return Point;
}());
exports.Point = Point;
