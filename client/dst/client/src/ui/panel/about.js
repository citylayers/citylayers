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
var AboutLabel = (function (_super) {
    __extends(AboutLabel, _super);
    function AboutLabel(parent) {
        var _this = _super.call(this, parent || "body", ClassName.ABOUT_LABEL, "aboutlabelid") || this;
        _this.content = "about";
        _this.elements = [];
        _this.clickHandler = function (e) {
            AboutPanel.toggle();
        };
        return _this;
    }
    AboutLabel.prototype.getParent = function () {
        var elements = document.getElementsByClassName(this.parentId);
        if (elements.length > 0) {
            return elements[0];
        }
        return _super.prototype.getParent.call(this);
    };
    AboutLabel.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    AboutLabel.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    AboutLabel.prototype.load = function () {
    };
    AboutLabel.prototype._call = function (geo) {
        var _this = this;
        var TopTagPanel = window.TopTagPanel;
        var GeocodeParser = window.GeocodeParser;
        if (!TopTagPanel) {
            return Promise.reject('TopTagPanel not available');
        }
        var url = TopTagPanel.getUrl(geo.coords.latitude, geo.coords.longitude);
        var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
        return fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then(function (result) {
            if (result.status == 200) {
                return result.json().then(function (res) {
                    var geocodingPanels = document.getElementsByClassName(CLASSNAMES.GEOCODONG_PANEL);
                    if (geocodingPanels.length > 0 && GeocodeParser) {
                        geocodingPanels[0].innerHTML = GeocodeParser.run(res);
                    }
                    return res;
                });
            }
            else if (result.status == 429) {
                return sleep(1000).then(function () { return _this._call(geo); });
            }
            else if (result.status == 504) {
                return _this._call(geo);
            }
            else {
                console.log("CODE: ".concat(result.status));
            }
            return result;
        });
    };
    return AboutLabel;
}(BaseComponent));
var AboutPanel = (function (_super) {
    __extends(AboutPanel, _super);
    function AboutPanel(parent) {
        var _this = _super.call(this, parent || "body", ClassName.ABOUT_PANEL, "id") || this;
        _this.elements = [
            CloseButton,
            AboutDescription,
            AboutLogo,
            AboutText
        ];
        _this.args = [function () { AboutPanel.toggle(); }];
        return _this;
    }
    AboutPanel.prototype.getParent = function () {
        var elements = document.getElementsByClassName(this.parentId);
        if (elements.length > 0) {
            return elements[0];
        }
        return _super.prototype.getParent.call(this);
    };
    AboutPanel.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.makeId(), undefined, e < this.args.length ? this.args[e] : undefined);
            element.initiate();
            element.load();
        }
        var el = this.getElement();
        if (el) {
            el.style.display = DisplayStyle.NONE;
        }
    };
    AboutPanel.toggle = function () {
        var panel = document.getElementById("".concat(ClassName.ABOUT_PANEL, "_id"));
        if (panel) {
            panel.style.display = panel.style.display === DisplayStyle.NONE
                ? DisplayStyle.FLEX
                : DisplayStyle.NONE;
        }
    };
    return AboutPanel;
}(BaseComponent));
var AboutDescription = (function (_super) {
    __extends(AboutDescription, _super);
    function AboutDescription(parent) {
        var _this = _super.call(this, parent, ClassName.ABOUT_DESCRIPTION) || this;
        _this.content = "City layers is a city-making app that empowers citizens to shape the changes they want to see in their cities!";
        return _this;
    }
    AboutDescription.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    AboutDescription.prototype.load = function () {
    };
    return AboutDescription;
}(BaseComponent));
var AboutText = (function (_super) {
    __extends(AboutText, _super);
    function AboutText(parent) {
        var _this = _super.call(this, parent, ClassName.ABOUT_TEXT) || this;
        _this.content = "City Layers embody the motto \"act local to go global\"\n        by relying on citizen mapping as a holistic and inclusive city-making\n        practice that aims to tackle the contemporary spatial, social and\n        environmental challenges our cities are facing. <br><br>\n\n        This powerful city mapping app serves as a means of\n        communication between cities and their citizens,\n        generating a new type of data that is\n        collectively generated, managed and cared for. ";
        return _this;
    }
    AboutText.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    AboutText.prototype.load = function () {
    };
    AboutText._name = ClassName.ABOUT_TEXT;
    return AboutText;
}(BaseComponent));
var AboutLogo = (function (_super) {
    __extends(AboutLogo, _super);
    function AboutLogo(parent, category) {
        var _this = _super.call(this, parent, "aboutlogo", category) || this;
        _this.content = "/images/about.svg";
        return _this;
    }
    AboutLogo.prototype.getElementTag = function () {
        return 'img';
    };
    AboutLogo.prototype.createElement = function () {
        var element = document.createElement('img');
        element.src = this.content;
        element.setAttribute('class', this.className);
        element.setAttribute('id', this.makeId());
        var parent = this.getParent();
        if (parent) {
            parent.appendChild(element);
        }
        return element;
    };
    return AboutLogo;
}(BaseComponent));
