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
exports.QuestionContainer = exports.QHeader = exports.QFooter = exports.QAContainer = exports.QContainer = void 0;
var contentPanel_1 = require("../panel/contentPanel");
var logo_1 = require("../component/logo");
var ClassNames_1 = require("../../constants/ClassNames");
var BaseComponent_1 = require("../component/BaseComponent");
var hrElement_1 = require("../component/hrElement");
var textElement_1 = require("../component/textElement");
var ClassNames_2 = require("../../constants/ClassNames");
var QHeader = (function (_super) {
    __extends(QHeader, _super);
    function QHeader(parent) {
        var _this = _super.call(this, parent, "") || this;
        _this.name = ClassNames_2.CLASSNAMES.Q_HEADER;
        _this.elements = [logo_1.LineLogo, ExitButton];
        return _this;
    }
    QHeader.prototype.load = function () {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.make_id(), _this.parent);
            element.initiate();
            element.load();
        });
    };
    return QHeader;
}(contentPanel_1.ContentPanel));
exports.QHeader = QHeader;
var ExitButton = (function (_super) {
    __extends(ExitButton, _super);
    function ExitButton(parentId, onClick) {
        var _this = _super.call(this, parentId, "exit-button") || this;
        _this.content = "Save and Exit";
        return _this;
    }
    ExitButton.prototype.getElementTag = function () {
        return 'button';
    };
    ExitButton.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    ExitButton.getElements = function () {
        return document.getElementsByClassName("exit-button");
    };
    return ExitButton;
}(BaseComponent_1.BaseComponent));
var QFooter = (function (_super) {
    __extends(QFooter, _super);
    function QFooter(parent, id, steps) {
        var _this = _super.call(this, parent, "qfooter") || this;
        _this.name = ClassNames_2.CLASSNAMES.Q_FOOTER;
        _this.elements = [Steps, hrElement_1.HrElement, NavButtons];
        _this.steps = steps;
        return _this;
    }
    QFooter.prototype.load = function (onclicks) {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.make_id(), "", el == NavButtons ? onclicks : _this.steps);
            element.initiate();
            element.load();
        });
        QFooter.reload(0, this.steps);
    };
    QFooter.reload = function (step, totalSteps) {
        NavButtons.reload(step, totalSteps);
    };
    return QFooter;
}(contentPanel_1.ContentPanel));
exports.QFooter = QFooter;
var BackButton = (function (_super) {
    __extends(BackButton, _super);
    function BackButton(parentId, id, onClick) {
        var _this = _super.call(this, parentId, ClassNames_1.ClassName.BACK) || this;
        _this.content = "Back";
        _this.clickHandler = onClick || (function () { });
        return _this;
    }
    BackButton.prototype.getElementTag = function () {
        return 'button';
    };
    BackButton.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    BackButton.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    BackButton.getElements = function () {
        return document.getElementsByClassName(ClassNames_1.ClassName.BACK);
    };
    BackButton.name = ClassNames_1.ClassName.BACK;
    return BackButton;
}(BaseComponent_1.BaseComponent));
var NextButton = (function (_super) {
    __extends(NextButton, _super);
    function NextButton(parentId, id, onClick) {
        var _this = _super.call(this, parentId, ClassNames_1.ClassName.NEXT) || this;
        _this.content = "Next";
        _this.clickHandler = onClick || (function () { });
        return _this;
    }
    NextButton.prototype.getElementTag = function () {
        return 'button';
    };
    NextButton.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    NextButton.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    NextButton.getElements = function () {
        return document.getElementsByClassName(ClassNames_1.ClassName.NEXT);
    };
    NextButton.name = ClassNames_1.ClassName.NEXT;
    return NextButton;
}(BaseComponent_1.BaseComponent));
var SubmitButton = (function (_super) {
    __extends(SubmitButton, _super);
    function SubmitButton(parentId, id, onClick) {
        var _this = _super.call(this, parentId, ClassNames_1.ClassName.SUBMIT) || this;
        _this.content = "Submit";
        _this.clickHandler = onClick || (function () { });
        return _this;
    }
    SubmitButton.prototype.getElementTag = function () {
        return 'button';
    };
    SubmitButton.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    SubmitButton.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    SubmitButton.getElements = function () {
        return document.getElementsByClassName(ClassNames_1.ClassName.SUBMIT);
    };
    SubmitButton.name = ClassNames_1.ClassName.SUBMIT;
    return SubmitButton;
}(BaseComponent_1.BaseComponent));
var NavButtons = (function (_super) {
    __extends(NavButtons, _super);
    function NavButtons(parent, id, onclicks) {
        if (id === void 0) { id = ""; }
        if (onclicks === void 0) { onclicks = []; }
        var _this = _super.call(this, parent, id) || this;
        _this.elements = [BackButton, NextButton, SubmitButton];
        _this.name = ClassNames_2.CLASSNAMES.NAV;
        _this.args = onclicks;
        return _this;
    }
    NavButtons.prototype.load = function () {
        var _this = this;
        this.elements.forEach(function (el, i) {
            var element = new el(_this.make_id(), "", _this.args[i]);
            element.initiate();
            element.load();
        });
    };
    NavButtons.getButton = function (name) {
        var el = document.getElementsByClassName(name);
        if (el.length > 0) {
            return el[0];
        }
    };
    NavButtons.reload = function (step, steps) {
        var _this = this;
        [BackButton, NextButton, SubmitButton].forEach(function (b) {
            var bb = b.getElements();
            if (bb.length > 0) {
                var cond = _this.buttonConditions.get(b.name);
                var ba = bb[0];
                ba.style.display = cond(step, steps) ? ClassNames_2.DISPLAY.NONE : ClassNames_2.DISPLAY.BLOCKINLINE;
            }
        });
    };
    NavButtons.buttonConditions = new Map([
        [BackButton.name, function (step, steps) { return step == 0; }],
        [NextButton.name, function (step, steps) { return step == steps; }],
        [SubmitButton.name, function (step, steps) { return step != steps; }]
    ]);
    return NavButtons;
}(contentPanel_1.ContentPanel));
var Steps = (function (_super) {
    __extends(Steps, _super);
    function Steps(parentId) {
        return _super.call(this, parentId, "steps") || this;
    }
    return Steps;
}(BaseComponent_1.BaseComponent));
var QContainer = (function (_super) {
    __extends(QContainer, _super);
    function QContainer(parent, id, content) {
        var _this = _super.call(this, parent, ClassNames_2.CLASSNAMES.Q_CONTAINER) || this;
        _this.name = ClassNames_2.CLASSNAMES.Q_CONTAINER;
        _this.content = content[0];
        _this.elements = [QContainer];
        _this.tree = content[1];
        return _this;
    }
    QContainer.prototype.load = function (c, a) {
        this.load_(c, a);
    };
    QContainer.prototype.load_ = function (step, display) {
        var _this = this;
        this.content.forEach(function (qs, i) {
            qs.content.forEach(function (qa, j) { return qa.make(_this.make_id(), (i == step - 1 && (j == 0 || _this.tree.get(qa.prev_id) != undefined)), _this.tree); });
        });
    };
    return QContainer;
}(contentPanel_1.ContentPanel));
exports.QContainer = QContainer;
var QuestionContainer = (function (_super) {
    __extends(QuestionContainer, _super);
    function QuestionContainer(parent, id, content) {
        var _this = _super.call(this, parent, id) || this;
        _this.name = ClassNames_2.CLASSNAMES.QUESTION_CONTAINER;
        _this.content = content;
        _this.elements = [textElement_1.TextElement, textElement_1.TextElement];
        return _this;
    }
    QuestionContainer.prototype.makeHelp = function (parent_id) {
        var el = new textElement_1.TextElement(parent_id, this.id, this.content[1]);
        el.initiate();
        el.load();
        return el;
    };
    QuestionContainer.prototype.makeQuestion = function (parent_id) {
        var el = new textElement_1.TextElement(parent_id, this.id, this.content[0]);
        el.initiate();
        el.load();
        return el;
    };
    QuestionContainer.prototype.load = function () {
        this.makeQuestion(this.make_id());
        this.makeHelp(this.make_id());
    };
    QuestionContainer.prototype.show = function (display) {
        this.getElement().style.display = display == false ? "none" : "flex";
    };
    return QuestionContainer;
}(contentPanel_1.ContentPanel));
exports.QuestionContainer = QuestionContainer;
var QAContainer = (function (_super) {
    __extends(QAContainer, _super);
    function QAContainer(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = ClassNames_2.CLASSNAMES.QA_CONTAINER;
        _this.elements = [];
        return _this;
    }
    QAContainer.prototype.load_ = function (tree, next_ids, display) {
        this.content.question.make(this.make_id());
        this.content.answer.make(this.make_id(), tree, next_ids);
        this.show(display);
    };
    QAContainer.prototype.show = function (display) {
        this.getElement().style.display = display == false ? ClassNames_2.DISPLAY.NONE : ClassNames_2.DISPLAY.FLEX;
    };
    return QAContainer;
}(contentPanel_1.ContentPanel));
exports.QAContainer = QAContainer;
var QContainer_ = (function (_super) {
    __extends(QContainer_, _super);
    function QContainer_(parent, content) {
        var _this = _super.call(this, parent, "") || this;
        _this.name = ClassNames_2.CLASSNAMES.Q_PAGE;
        _this.content = content;
        return _this;
    }
    QContainer_.prototype.load_ = function (step) {
        var _this = this;
        this.content.forEach(function (qa, i) { return qa.make(_this.make_id(), i == step - 1); });
    };
    return QContainer_;
}(contentPanel_1.ContentPanel));
