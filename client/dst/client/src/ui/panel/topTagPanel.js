var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TopTagPanel = (function (_super) {
    __extends(TopTagPanel, _super);
    function TopTagPanel(parent) {
        var _this = _super.call(this, parent || "body", ClassName.GEOCODING_PANEL, "geocodingpanelid") || this;
        _this.content = "";
        _this.elements = [];
        return _this;
    }
    TopTagPanel.prototype.getParent = function () {
        var elements = document.getElementsByClassName(this.parentId);
        if (elements.length > 0) {
            return elements[0];
        }
        return _super.prototype.getParent.call(this);
    };
    TopTagPanel.getUrl = function (lat, lon) {
        return "https://nominatim.openstreetmap.org/reverse?lat=".concat(lat, "&lon=").concat(lon, "&format=jsonv2&zoom=12");
    };
    TopTagPanel.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    TopTagPanel.prototype.load = function () {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._call.bind(this), this._error.bind(this));
        }
        else {
            console.log("Geoposition undefined");
        }
    };
    TopTagPanel.prototype._error = function (geo) {
        console.log(geo);
        console.log("Failed to get position");
    };
    TopTagPanel.prototype._call = function (geo) {
        var _this = this;
        var GeocodeParser = window.GeocodeParser;
        var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
        var url = TopTagPanel.getUrl(geo.coords.latitude, geo.coords.longitude);
        return fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then(function (result) {
            if (result.status === 200) {
                return result.json().then(function (res) {
                    var panels = document.getElementsByClassName(ClassName.GEOCODING_PANEL);
                    if (panels.length > 0 && GeocodeParser) {
                        panels[0].innerHTML = GeocodeParser.run(res);
                    }
                    return res;
                });
            }
            else if (result.status === 429) {
                return sleep(1000).then(function () { return _this._call(geo); });
            }
            else if (result.status === 504) {
                return _this._call(geo);
            }
            else {
                console.log("CODE: ".concat(result.status));
            }
            return result;
        });
    };
    return TopTagPanel;
}(BaseComponent));
