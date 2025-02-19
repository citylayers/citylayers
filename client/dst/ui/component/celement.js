"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CElement = void 0;
var uuid_1 = require("uuid");
var classnames_1 = require("../../../classnames");
var CElement = (function () {
    function CElement(parent, id, content) {
        this.id = id ? id : (0, uuid_1.v4)();
        this.name = classnames_1.CLASSNAMES.CATEGORY_CONTAINER;
        this.content = content;
        this.parent = parent;
        this.elements = [];
    }
    CElement.prototype.getElement = function () {
        return document.getElementById("".concat(this.name, "_").concat(this.id));
    };
    CElement.getElements = function () {
        return document.getElementsByClassName(this.name);
    };
    CElement.prototype.getParent = function () {
        var element = document.getElementById(this.parent);
        return element;
    };
    CElement.prototype.initiate = function (a, n) {
        var panel = document.createElement("div");
        panel.setAttribute('class', this.name);
        panel.setAttribute("id", this.make_id());
        this.getParent().appendChild(panel);
    };
    CElement.prototype.load = function (elements, args) {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.make_id(), this.id, this.content);
            element.initiate();
            element.load();
        }
    };
    CElement.prototype.make_id = function () {
        return "".concat(this.name, "_").concat(this.id);
    };
    CElement.prototype.show = function (display) {
        this.getElement().style.display = display == false ? "none" : "flex";
    };
    return CElement;
}());
exports.CElement = CElement;
