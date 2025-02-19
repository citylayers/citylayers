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
exports.CheckboxContainerElement = exports.RangeContainerElement = exports.ImageInputContainer = exports.ImageInputContainerElement = exports.TextInputContainer = exports.InputContainer = void 0;
var classnames_1 = require("../../../classnames");
var contentPanel_1 = require("../panel/contentPanel");
var celement_1 = require("./celement");
var imageElement_1 = require("./imageElement");
var spanElement_1 = require("./spanElement");
var textElement_1 = require("./textElement");
var INPUT_TYPES = {
    TEXT: "text",
    FILE: "file",
    RANGE: "range",
    CHECKBOX: "checkbox"
};
var InputElement = (function (_super) {
    __extends(InputElement, _super);
    function InputElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.id = id;
        _this.name = "input";
        _this.content = content;
        _this.t = "input";
        _this.input_type = INPUT_TYPES.TEXT;
        return _this;
    }
    InputElement.prototype.load = function () { };
    InputElement.prototype.activateNext = function (tree, nextids) {
        if (nextids == undefined) {
            return;
        }
        if (tree.get(this.id) != undefined) {
            var nextid = nextids.get(this.id);
            if (nextid != undefined) {
                nextid = "qa-container_".concat(nextid);
                document.getElementById(nextid).style.display = classnames_1.DISPLAY.FLEX;
            }
        }
    };
    InputElement.prototype.action = function (ev, tree, next) {
        tree.add(this.id, ev.target.value);
        this.activateNext(tree, next);
    };
    InputElement.prototype.initiate = function (answerTree, nextid) {
        var element = this.init_input(answerTree, nextid);
        this.init_extra(element);
    };
    InputElement.prototype.init_input = function (answerTree, nextid) {
        var _this = this;
        var element = document.createElement(this.t);
        element.setAttribute('type', this.input_type);
        element.setAttribute('name', this.name);
        element.setAttribute("class", this.name);
        element.setAttribute("id", this.make_id());
        element.onchange = function (ev) {
            _this.action(ev, answerTree, nextid);
        };
        this.getParent().appendChild(element);
        return element;
    };
    InputElement.prototype.init_extra = function (element) { };
    return InputElement;
}(celement_1.CElement));
var TextInputElement = (function (_super) {
    __extends(TextInputElement, _super);
    function TextInputElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = classnames_1.CLASSNAMES.TEXT_INPUT;
        _this.t = "textarea";
        _this.input_type = INPUT_TYPES.TEXT;
        return _this;
    }
    TextInputElement.prototype.init_extra = function (element) {
        element.setAttribute("placeholder", "Type your comment here");
    };
    return TextInputElement;
}(InputElement));
var ImageInputElement = (function (_super) {
    __extends(ImageInputElement, _super);
    function ImageInputElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = classnames_1.CLASSNAMES.IMG_INPUT;
        _this.input_type = INPUT_TYPES.FILE;
        return _this;
    }
    ImageInputElement.prototype.action = function (ev, tree, next) {
        this.activateNext(tree, next);
        tree.add(this.id, ev.target.files[0]);
    };
    ImageInputElement.prototype.init_extra = function (element) {
        element.setAttribute('accept', ".jpg, .png, .jpeg");
    };
    return ImageInputElement;
}(InputElement));
var InputContainer = (function (_super) {
    __extends(InputContainer, _super);
    function InputContainer(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = classnames_1.CLASSNAMES.IMGINPUT_CONTAINER;
        _this.content = content ? content : ["", "or skip"];
        _this.elements = [];
        return _this;
    }
    InputContainer.prototype.getElement = function () {
        return document.getElementById("".concat(this.name, "_").concat(this.id));
    };
    InputContainer.prototype.load_ = function (answerTree, nextid) {
        var _this = this;
        this.elements.forEach(function (el, i) {
            var element = new el(_this.make_id(), _this.id, _this.content instanceof Array ? _this.content[i] : _this.content);
            element instanceof InputElement ? element.initiate(answerTree, nextid) : element.initiate();
            element instanceof InputContainer ? element.load_(answerTree, nextid) : element.load();
        });
    };
    return InputContainer;
}(contentPanel_1.ContentPanel));
exports.InputContainer = InputContainer;
var ImageInputContainer = (function (_super) {
    __extends(ImageInputContainer, _super);
    function ImageInputContainer(parent, id) {
        var _this = _super.call(this, parent, id) || this;
        _this.content = ["", "or skip"];
        _this.name = classnames_1.CLASSNAMES.IMGINPUT_CONTAINER;
        _this.elements = [ImageInputContainerElement, spanElement_1.SpanElement];
        return _this;
    }
    return ImageInputContainer;
}(InputContainer));
exports.ImageInputContainer = ImageInputContainer;
var TextInputContainer = (function (_super) {
    __extends(TextInputContainer, _super);
    function TextInputContainer(parent, id, content) {
        var _this = _super.call(this, parent, id) || this;
        _this.name = classnames_1.CLASSNAMES.TEXTINPUT_CONTAINER;
        _this.content = content;
        _this.elements = [TextInputElement];
        return _this;
    }
    return TextInputContainer;
}(InputContainer));
exports.TextInputContainer = TextInputContainer;
var ImageInputContainerElement = (function (_super) {
    __extends(ImageInputContainerElement, _super);
    function ImageInputContainerElement(parent, id) {
        var _this = _super.call(this, parent, id) || this;
        _this.name = classnames_1.CLASSNAMES.IMGINPUT_CONTAINER;
        _this.elements = [ImageInputElement, imageElement_1.ImagePreviewElement, textElement_1.TextElement];
        _this.content = ["", "", "Upload an image"];
        return _this;
    }
    return ImageInputContainerElement;
}(InputContainer));
exports.ImageInputContainerElement = ImageInputContainerElement;
var RangeInputElement = (function (_super) {
    __extends(RangeInputElement, _super);
    function RangeInputElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = classnames_1.CLASSNAMES.RANGE_SLIDER;
        _this.content = content;
        _this.values = new Map([
            [classnames_1.RANGE_LABELS.MIN, _this.content.value ? _this.content.value["min"] : 0],
            [classnames_1.RANGE_LABELS.MAX, _this.content.value ? _this.content.value["max"] : 100],
        ]);
        _this.input_type = INPUT_TYPES.RANGE;
        return _this;
    }
    RangeInputElement.prototype.init_extra = function (element) {
        element.setAttribute('min', this.values.get(classnames_1.RANGE_LABELS.MIN).toString());
        element.setAttribute('max', this.values.get(classnames_1.RANGE_LABELS.MAX).toString());
    };
    return RangeInputElement;
}(InputElement));
var RangeLabelElement = (function (_super) {
    __extends(RangeLabelElement, _super);
    function RangeLabelElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = classnames_1.CLASSNAMES.RANGE_CONTAINER;
        _this.elements = [spanElement_1.SpanElement, spanElement_1.SpanElement];
        _this.content = content.label ? [content.label[classnames_1.RANGE_LABELS.MIN], content.label[classnames_1.RANGE_LABELS.MAX]] : ["Less", "More"];
        return _this;
    }
    return RangeLabelElement;
}(InputContainer));
var RangeContainerElement = (function (_super) {
    __extends(RangeContainerElement, _super);
    function RangeContainerElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = classnames_1.CLASSNAMES.TAG_CONTAINER;
        _this.elements = [RangeInputElement, RangeLabelElement];
        return _this;
    }
    return RangeContainerElement;
}(InputContainer));
exports.RangeContainerElement = RangeContainerElement;
var CheckboxContainerElement = (function (_super) {
    __extends(CheckboxContainerElement, _super);
    function CheckboxContainerElement(parent, id, checks) {
        var _this = _super.call(this, parent, id, checks) || this;
        _this.name = classnames_1.CLASSNAMES.TAG_CONTAINER;
        _this.content = checks;
        _this.elements = checks.map(function (c) { return CheckboxElement; });
        return _this;
    }
    return CheckboxContainerElement;
}(InputContainer));
exports.CheckboxContainerElement = CheckboxContainerElement;
var CheckboxElement = (function (_super) {
    __extends(CheckboxElement, _super);
    function CheckboxElement(parent, id, content) {
        var _this = _super.call(this, parent, content.id, content) || this;
        _this.name = "tag selectable";
        _this.content = content;
        _this.elements = [CheckboxInputElement, CheckboxLabelElement];
        return _this;
    }
    CheckboxElement.prototype.make_id = function () {
        return "".concat(this.name, "_").concat(this.id, "_").concat(this.content.name);
    };
    return CheckboxElement;
}(InputContainer));
var CheckboxInputElement = (function (_super) {
    __extends(CheckboxInputElement, _super);
    function CheckboxInputElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = classnames_1.CLASSNAMES.TAG_LABEL;
        _this.input_type = INPUT_TYPES.CHECKBOX;
        return _this;
    }
    CheckboxInputElement.prototype.init_extra = function (element) {
    };
    ;
    return CheckboxInputElement;
}(InputElement));
var CheckboxLabelElement = (function (_super) {
    __extends(CheckboxLabelElement, _super);
    function CheckboxLabelElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = classnames_1.CLASSNAMES.TAG_LABEL;
        _this.content = content.name ? content.name : content;
        _this.t = "div";
        return _this;
    }
    CheckboxLabelElement.prototype.initiate = function () {
        var element = document.createElement(this.t);
        element.setAttribute("class", this.name);
        this.getParent().appendChild(element);
        var element1 = document.createElement("label");
        element1.setAttribute("class", this.name);
        element1.innerHTML = this.content;
        element.appendChild(element1);
    };
    return CheckboxLabelElement;
}(InputElement));
