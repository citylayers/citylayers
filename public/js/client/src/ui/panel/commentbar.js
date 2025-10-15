"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSearch = exports.CommentCloseButton = exports.CommentText = exports.CommentPane = exports.CommentContainer = exports.CommentPanel = void 0;
var BaseComponent_1 = require("../component/BaseComponent");
var ClassNames_1 = require("../../constants/ClassNames");
var CommentPanel = (function (_super) {
    __extends(CommentPanel, _super);
    function CommentPanel(parent, comments) {
        var _this = _super.call(this, parent, ClassNames_1.ClassName.COMMENTPANEL, "id") || this;
        _this.comments = comments;
        _this.content = comments;
        _this.elements = [
            CommentCloseButton,
            CommentSearch,
            CommentContainer
        ];
        return _this;
    }
    CommentPanel.prototype.getParent = function () {
        var elements = document.getElementsByClassName(this.parentId);
        if (elements.length > 0) {
            return elements[0];
        }
        return _super.prototype.getParent.call(this);
    };
    CommentPanel.prototype.loadComments = function (comments) {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.makeId(), "id");
            element.initiate();
            element.load(comments);
        });
    };
    CommentPanel.search = function (value) {
        var panel = document.getElementById("".concat(ClassNames_1.ClassName.COMMENTPANEL, "_id"));
        var container = document.getElementById("".concat(ClassNames_1.ClassName.COMMENTCONTAINER, "_id"));
        if (panel && !panel.classList.contains("open")) {
            panel.classList.add("open");
        }
        var comments = Array.from(document.getElementsByClassName(ClassNames_1.ClassName.COMMENTTEXT));
        comments.forEach(function (c) {
            if (c.parentElement) {
                c.parentElement.setAttribute("style", "order: 8");
            }
        });
        comments.filter(function (c) {
            return c.innerHTML.toLowerCase().includes(value.toLowerCase());
        }).forEach(function (c) {
            if (c.parentElement) {
                c.parentElement.setAttribute("style", "order: 1");
            }
        });
        if (container) {
            container.scrollLeft = 0;
        }
    };
    CommentPanel.focusComment = function (id, on) {
        var _comment = document.getElementById("commentpane_".concat(id));
        if (_comment !== null && on === true) {
            _comment.scrollIntoView({
                behavior: 'smooth'
            });
            _comment.focus();
        }
    };
    CommentPanel.toggle = function () {
        var panel = document.getElementById("".concat(ClassNames_1.ClassName.COMMENTPANEL, "_id"));
        if (panel) {
            panel.classList.toggle("open");
        }
    };
    CommentPanel.hideAll = function () {
        var panels = document.getElementsByClassName(ClassNames_1.ClassName.CATEGORY_SIDE_PANEL);
        Array.from(panels).forEach(function (panel) {
            panel.style.display = "none";
        });
    };
    CommentPanel._name = ClassNames_1.ClassName.COMMENTPANEL;
    CommentPanel.toggleMarker = function (value, active) { console.log(value, active); };
    return CommentPanel;
}(BaseComponent_1.BaseComponent));
exports.CommentPanel = CommentPanel;
var CommentContainer = (function (_super) {
    __extends(CommentContainer, _super);
    function CommentContainer(parent, id) {
        var _this = _super.call(this, parent, ClassNames_1.ClassName.COMMENTCONTAINER, id) || this;
        _this.elements = [];
        return _this;
    }
    CommentContainer.prototype.addComment = function (comment, id) {
        var div = new CommentPane(this.makeId(), id, comment);
        div.initiate();
        div.load();
    };
    CommentContainer.prototype.load = function (comments) {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.makeId(), "main");
            element.initiate();
            element.load();
        });
        if (comments) {
            comments.forEach(function (c, i) {
                _this.addComment(c.comment, c.place_id.toString());
            });
        }
    };
    CommentContainer._name = ClassNames_1.ClassName.COMMENTCONTAINER;
    return CommentContainer;
}(BaseComponent_1.BaseComponent));
exports.CommentContainer = CommentContainer;
var CommentPane = (function (_super) {
    __extends(CommentPane, _super);
    function CommentPane(parent, id, comment) {
        var _this = _super.call(this, parent, ClassNames_1.ClassName.COMMENTPANE, id) || this;
        _this.comment = comment;
        _this.content = comment;
        _this.elements = [CommentText];
        _this.clickHandler = function () {
            var el = _this.getElement();
            CommentPanel.toggleMarker(_this.id, document.activeElement === el);
        };
        return _this;
    }
    CommentPane.prototype.createElement = function () {
        var el = _super.prototype.createElement.call(this);
        el.classList.add("simple-drop-shadow");
        el.setAttribute("tabindex", "0");
        return el;
    };
    CommentPane.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    CommentPane.prototype.load = function () {
        for (var e = 0; e < this.elements.length; e++) {
            var element = new this.elements[e](this.makeId(), this.id, this.content);
            element.initiate();
        }
    };
    CommentPane._name = ClassNames_1.ClassName.COMMENTPANE;
    return CommentPane;
}(BaseComponent_1.BaseComponent));
exports.CommentPane = CommentPane;
var CommentText = (function (_super) {
    __extends(CommentText, _super);
    function CommentText(parent, id, content) {
        var _this = _super.call(this, parent, ClassNames_1.ClassName.COMMENTTEXT, id) || this;
        _this.content = content;
        return _this;
    }
    CommentText.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    CommentText._name = ClassNames_1.ClassName.COMMENTTEXT;
    return CommentText;
}(BaseComponent_1.BaseComponent));
exports.CommentText = CommentText;
var CommentCloseButton = (function (_super) {
    __extends(CommentCloseButton, _super);
    function CommentCloseButton(parent) {
        var _this = _super.call(this, parent, ClassNames_1.ClassName.COMMENTPANEL_CLOSE, "id") || this;
        _this.content = "<div class='chevron'></div>";
        _this.clickHandler = function (e) {
            var element = _this.getElement();
            if (element) {
                element.classList.toggle("open");
            }
            CommentPanel.toggle();
        };
        return _this;
    }
    CommentCloseButton.prototype.getElementTag = function () {
        return 'button';
    };
    CommentCloseButton.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    CommentCloseButton.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    CommentCloseButton._name = ClassNames_1.ClassName.COMMENTPANEL_CLOSE;
    return CommentCloseButton;
}(BaseComponent_1.BaseComponent));
exports.CommentCloseButton = CommentCloseButton;
var CommentSearch = (function (_super) {
    __extends(CommentSearch, _super);
    function CommentSearch(parent) {
        var _this = _super.call(this, parent, ClassNames_1.ClassName.COMMENTSEARCH, "id") || this;
        _this.content = "Search through comments";
        _this.inputHandler = function (e) {
            var target = e.target;
            CommentPanel.search(target.value);
        };
        return _this;
    }
    CommentSearch.prototype.afterInit = function () {
        var element = this.getElement();
        if (!element)
            return;
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", this.content);
        input.oninput = this.inputHandler;
        element.appendChild(input);
    };
    CommentSearch._name = ClassNames_1.ClassName.COMMENTSEARCH;
    return CommentSearch;
}(BaseComponent_1.BaseComponent));
exports.CommentSearch = CommentSearch;
