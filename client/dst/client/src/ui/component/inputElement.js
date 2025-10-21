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
var INPUT_TYPES = {
    TEXT: "text",
    FILE: "file",
    RANGE: "range",
    CHECKBOX: "checkbox"
};
var InputElement = (function (_super) {
    __extends(InputElement, _super);
    function InputElement(parent, id, content) {
        var _this = _super.call(this, parent, "input", id, content) || this;
        _this.answerTree = null;
        _this.nextIds = null;
        _this.elementTag = "input";
        _this.inputType = INPUT_TYPES.TEXT;
        _this.changeHandler = function (ev) {
            console.log("=== changeHandler fired ===", ev.type, _this.id, "answerTree:", _this.answerTree, "nextIds:", _this.nextIds);
            if (_this.answerTree && _this.nextIds) {
                _this.action(ev, _this.answerTree, _this.nextIds);
            }
            else {
                console.log("Missing answerTree or nextIds - cannot activate next!");
            }
        };
        return _this;
    }
    InputElement.prototype.initiate = function (answerTree, nextid) {
        console.log("=== InputElement.initiate ===", this.id, "answerTree:", answerTree, "nextid:", nextid);
        if (answerTree && nextid) {
            this.answerTree = answerTree;
            this.nextIds = nextid;
            console.log("✓ Stored answerTree and nextIds");
        }
        else {
            console.log("⚠ answerTree or nextid missing!");
        }
        _super.prototype.initiate.call(this);
    };
    InputElement.prototype.getElementTag = function () {
        return this.elementTag;
    };
    InputElement.prototype.createElement = function () {
        var element = document.createElement(this.elementTag);
        element.setAttribute('type', this.inputType);
        element.setAttribute('name', this.className);
        element.setAttribute('class', this.className);
        element.setAttribute('id', this.makeId());
        var parent = this.getParent();
        if (parent) {
            parent.appendChild(element);
        }
        return element;
    };
    InputElement.prototype.afterInit = function () {
        console.log("=== InputElement.afterInit ===", this.id, "adding 'change' listener");
        this.addEventListener('change', this.changeHandler);
        var element = this.getElement();
        if (element) {
            this.initExtra(element);
        }
    };
    InputElement.prototype.initExtra = function (element) {
    };
    InputElement.prototype.activateNext = function (tree, nextids) {
        if (nextids === undefined) {
            return;
        }
        if (tree.get(this.id) !== undefined) {
            var nextid = nextids.get(this.id);
            if (nextid !== undefined) {
                nextid = "qa-container_".concat(nextid);
                var nextElement = document.getElementById(nextid);
                if (nextElement) {
                    nextElement.style.display = DISPLAY.FLEX;
                }
            }
        }
    };
    InputElement.prototype.action = function (ev, tree, next) {
        tree.add(this.id, ev.target.value);
        this.activateNext(tree, next);
    };
    return InputElement;
}(BaseComponent));
var TextInputElement = (function (_super) {
    __extends(TextInputElement, _super);
    function TextInputElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.className = CLASSNAMES.TEXT_INPUT;
        _this.elementTag = "textarea";
        _this.inputType = INPUT_TYPES.TEXT;
        return _this;
    }
    TextInputElement.prototype.initExtra = function (element) {
        element.setAttribute("placeholder", "Type your comment here");
    };
    return TextInputElement;
}(InputElement));
var ImageInputElement = (function (_super) {
    __extends(ImageInputElement, _super);
    function ImageInputElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.className = CLASSNAMES.IMG_INPUT;
        _this.inputType = INPUT_TYPES.FILE;
        return _this;
    }
    ImageInputElement.prototype.action = function (ev, tree, next) {
        this.activateNext(tree, next);
        tree.add(this.id, ev.target.files[0]);
    };
    ImageInputElement.prototype.initExtra = function (element) {
        element.setAttribute('accept', ".jpg, .png, .jpeg");
    };
    return ImageInputElement;
}(InputElement));
var InputContainer = (function (_super) {
    __extends(InputContainer, _super);
    function InputContainer(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = CLASSNAMES.IMGINPUT_CONTAINER;
        _this.content = content ? content : ["", "or skip"];
        _this.elements = [];
        return _this;
    }
    InputContainer.prototype.getElement = function () {
        return document.getElementById("".concat(this.name, "_").concat(this.id));
    };
    InputContainer.prototype.load = function (nextids, answerTree) {
        console.log("=== InputContainer.load ===", this.id, "nextids:", nextids, "answerTree:", answerTree);
        this.load_(answerTree, nextids);
    };
    InputContainer.prototype.load_ = function (answerTree, nextid) {
        var _this = this;
        console.log("=== InputContainer.load_ ===", this.id, "answerTree:", answerTree, "nextid:", nextid);
        this.elements.forEach(function (el, i) {
            var element = new el(_this.makeId(), _this.id, _this.content instanceof Array ? _this.content[i] : _this.content);
            if (element instanceof InputElement) {
                element.initiate(answerTree, nextid);
            }
            else {
                element.initiate();
            }
            if (element instanceof InputContainer) {
                element.load_(answerTree, nextid);
            }
            else {
                element.load();
            }
        });
    };
    return InputContainer;
}(ContentPanel));
var ImageInputContainer = (function (_super) {
    __extends(ImageInputContainer, _super);
    function ImageInputContainer(parent, id) {
        var _this = _super.call(this, parent, id) || this;
        _this.content = ["", "or skip"];
        _this.name = CLASSNAMES.IMGINPUT_CONTAINER;
        _this.elements = [ImageInputContainerElement, SpanElement];
        return _this;
    }
    return ImageInputContainer;
}(InputContainer));
var TextInputContainer = (function (_super) {
    __extends(TextInputContainer, _super);
    function TextInputContainer(parent, id, content) {
        var _this = _super.call(this, parent, id) || this;
        _this.name = CLASSNAMES.TEXTINPUT_CONTAINER;
        _this.content = content;
        _this.elements = [TextInputElement];
        return _this;
    }
    return TextInputContainer;
}(InputContainer));
var ImageInputContainerElement = (function (_super) {
    __extends(ImageInputContainerElement, _super);
    function ImageInputContainerElement(parent, id) {
        var _this = _super.call(this, parent, id) || this;
        _this.name = CLASSNAMES.IMGINPUT_CONTAINER;
        _this.elements = [ImageInputElement, ImagePreviewElement, TextElement];
        _this.content = ["", "", "Upload an image"];
        return _this;
    }
    return ImageInputContainerElement;
}(InputContainer));
var RangeInputElement = (function (_super) {
    __extends(RangeInputElement, _super);
    function RangeInputElement(parent, id, content) {
        var _a, _b;
        var _this = _super.call(this, parent, id, content) || this;
        _this.className = CLASSNAMES.RANGE_SLIDER;
        _this.values = new Map([
            [RANGE_LABELS.MIN, ((_a = _this.content) === null || _a === void 0 ? void 0 : _a.value) ? _this.content.value["min"] : 0],
            [RANGE_LABELS.MAX, ((_b = _this.content) === null || _b === void 0 ? void 0 : _b.value) ? _this.content.value["max"] : 100],
        ]);
        _this.inputType = INPUT_TYPES.RANGE;
        return _this;
    }
    RangeInputElement.prototype.initExtra = function (element) {
        var _a, _b;
        element.setAttribute('min', ((_a = this.values.get(RANGE_LABELS.MIN)) === null || _a === void 0 ? void 0 : _a.toString()) || '0');
        element.setAttribute('max', ((_b = this.values.get(RANGE_LABELS.MAX)) === null || _b === void 0 ? void 0 : _b.toString()) || '100');
    };
    RangeInputElement.prototype.afterInit = function () {
        console.log("=== RangeInputElement.afterInit ===", this.id, "adding 'input' listener");
        this.addEventListener('input', this.changeHandler);
        var element = this.getElement();
        if (element) {
            this.initExtra(element);
        }
    };
    return RangeInputElement;
}(InputElement));
var RangeLabelElement = (function (_super) {
    __extends(RangeLabelElement, _super);
    function RangeLabelElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = CLASSNAMES.RANGE_CONTAINER;
        _this.elements = [SpanElement, SpanElement];
        _this.content = (content && content.labels) ? [content.labels[RANGE_LABELS.MIN], content.labels[RANGE_LABELS.MAX]] : ["Less", "More"];
        return _this;
    }
    return RangeLabelElement;
}(InputContainer));
var RangeContainerElement = (function (_super) {
    __extends(RangeContainerElement, _super);
    function RangeContainerElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = CLASSNAMES.TAG_CONTAINER;
        _this.elements = [RangeInputElement, RangeLabelElement];
        return _this;
    }
    return RangeContainerElement;
}(InputContainer));
var CheckboxContainerElement = (function (_super) {
    __extends(CheckboxContainerElement, _super);
    function CheckboxContainerElement(parent, id, checks) {
        var _this = _super.call(this, parent, id, checks) || this;
        _this.name = CLASSNAMES.TAG_CONTAINER;
        _this.content = checks;
        _this.elements = checks.map(function (c) { return CheckboxElement; });
        return _this;
    }
    CheckboxContainerElement.prototype.load = function (nextids, answerTree) {
        var _this = this;
        this.content.forEach(function (checkData, index) {
            var element = new CheckboxElement(_this.makeId(), _this.id, checkData);
            element.initiate();
            element.load(nextids, answerTree);
        });
    };
    CheckboxContainerElement.prototype.activate = function (on) {
    };
    return CheckboxContainerElement;
}(InputContainer));
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
    CheckboxElement.prototype.load = function (nextids, answerTree) {
        var _this = this;
        this.elements.forEach(function (ElementClass) {
            var element = new ElementClass(_this.makeId(), _this.id, _this.content);
            element instanceof InputElement ? element.initiate(answerTree, nextids) : element.initiate();
            element.load();
        });
    };
    return CheckboxElement;
}(InputContainer));
var CheckboxInputElement = (function (_super) {
    __extends(CheckboxInputElement, _super);
    function CheckboxInputElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.className = CLASSNAMES.TAG_LABEL;
        _this.inputType = INPUT_TYPES.CHECKBOX;
        return _this;
    }
    CheckboxInputElement.prototype.initExtra = function (element) {
    };
    CheckboxInputElement.prototype.action = function (ev, tree, next) {
        var checked = ev.target.checked;
        console.log("Checkbox action: id=".concat(this.id, ", checked=").concat(checked));
        tree.add(this.id, checked);
        console.log("Tree after checkbox:", tree.out());
        this.activateNext(tree, next);
        var QPanel = window.QPanel;
        if (QPanel && QPanel.controller) {
            console.log("Reloading step ".concat(QPanel.currentStep, " to show followup questions"));
            QPanel.controller.load(QPanel.currentStep);
        }
    };
    return CheckboxInputElement;
}(InputElement));
var CheckboxLabelElement = (function (_super) {
    __extends(CheckboxLabelElement, _super);
    function CheckboxLabelElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.className = CLASSNAMES.TAG_LABEL;
        _this.content = (content === null || content === void 0 ? void 0 : content.name) ? content.name : content;
        _this.elementTag = "div";
        return _this;
    }
    CheckboxLabelElement.prototype.createElement = function () {
        var element = document.createElement(this.elementTag);
        element.setAttribute("class", this.className);
        element.setAttribute("id", this.makeId());
        var parent = this.getParent();
        if (parent) {
            parent.appendChild(element);
        }
        return element;
    };
    CheckboxLabelElement.prototype.afterInit = function () {
        var element = this.getElement();
        if (element) {
            var label = document.createElement("label");
            label.setAttribute("class", this.className);
            label.innerHTML = this.content;
            element.appendChild(label);
        }
    };
    return CheckboxLabelElement;
}(InputElement));
var SingleChoiceInputElement = (function (_super) {
    __extends(SingleChoiceInputElement, _super);
    function SingleChoiceInputElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.className = "input";
        _this.inputType = "radio";
        _this.changeHandler = content;
        return _this;
    }
    SingleChoiceInputElement.prototype.createElement = function () {
        var element = document.createElement("input");
        element.setAttribute('type', this.inputType);
        element.setAttribute('name', 'vis-choice');
        element.setAttribute('class', this.className);
        element.setAttribute('id', this.makeId());
        var parent = this.getParent();
        if (parent) {
            parent.appendChild(element);
        }
        return element;
    };
    SingleChoiceInputElement.prototype.afterInit = function () {
        var element = this.getElement();
        if (element && typeof this.changeHandler === 'function') {
            element.addEventListener('change', this.changeHandler);
        }
    };
    return SingleChoiceInputElement;
}(InputElement));
