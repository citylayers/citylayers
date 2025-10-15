"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = void 0;
var uuid_1 = require("uuid");
var ClassNames_1 = require("../../constants/ClassNames");
var BaseComponent = (function () {
    function BaseComponent(parentId, className, id, content) {
        this.id = id || (0, uuid_1.v4)();
        this.className = className;
        this.parentId = parentId;
        this.content = content;
        this.children = [];
        this.element = null;
    }
    BaseComponent.prototype.getElement = function () {
        if (!this.element) {
            this.element = document.getElementById(this.makeId());
        }
        return this.element;
    };
    BaseComponent.prototype.getParent = function () {
        return document.getElementById(this.parentId);
    };
    BaseComponent.prototype.initiate = function () {
        var parent = this.getParent();
        if (!parent) {
            console.error("Parent element not found: ".concat(this.parentId));
            return;
        }
        var element = this.createElement();
        parent.appendChild(element);
        this.element = element;
        this.afterInit();
    };
    BaseComponent.prototype.createElement = function () {
        var element = document.createElement(this.getElementTag());
        element.setAttribute('class', this.className);
        element.setAttribute('id', this.makeId());
        return element;
    };
    BaseComponent.prototype.getElementTag = function () {
        return 'div';
    };
    BaseComponent.prototype.afterInit = function () {
    };
    BaseComponent.prototype.load = function () {
        this.children.forEach(function (child) {
            child.initiate();
            child.load();
        });
        this.afterLoad();
    };
    BaseComponent.prototype.afterLoad = function () {
    };
    BaseComponent.prototype.addChild = function (child) {
        this.children.push(child);
    };
    BaseComponent.prototype.removeChild = function (child) {
        var index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    };
    BaseComponent.prototype.makeId = function () {
        return "".concat(this.className, "_").concat(this.id);
    };
    BaseComponent.prototype.show = function (visible, displayStyle) {
        if (displayStyle === void 0) { displayStyle = ClassNames_1.DisplayStyle.FLEX; }
        var element = this.getElement();
        if (element) {
            element.style.display = visible ? displayStyle : ClassNames_1.DisplayStyle.NONE;
        }
    };
    BaseComponent.prototype.setContent = function (content) {
        this.content = content;
        var element = this.getElement();
        if (element) {
            this.updateContent(element);
        }
    };
    BaseComponent.prototype.updateContent = function (element) {
        if (typeof this.content === 'string') {
            element.textContent = this.content;
        }
    };
    BaseComponent.prototype.addEventListener = function (event, handler) {
        var element = this.getElement();
        if (element) {
            element.addEventListener(event, handler);
        }
    };
    BaseComponent.prototype.removeEventListener = function (event, handler) {
        var element = this.getElement();
        if (element) {
            element.removeEventListener(event, handler);
        }
    };
    BaseComponent.prototype.addClass = function (className) {
        var element = this.getElement();
        if (element) {
            element.classList.add(className);
        }
    };
    BaseComponent.prototype.removeClass = function (className) {
        var element = this.getElement();
        if (element) {
            element.classList.remove(className);
        }
    };
    BaseComponent.prototype.toggleClass = function (className) {
        var element = this.getElement();
        if (element) {
            element.classList.toggle(className);
        }
    };
    BaseComponent.prototype.destroy = function () {
        this.children.forEach(function (child) { return child.destroy(); });
        this.children = [];
        var element = this.getElement();
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
        this.element = null;
    };
    BaseComponent.prototype.getId = function () {
        return this.id;
    };
    BaseComponent.prototype.getClassName = function () {
        return this.className;
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
