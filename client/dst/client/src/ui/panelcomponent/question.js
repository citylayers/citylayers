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
var QHeader = (function (_super) {
    __extends(QHeader, _super);
    function QHeader(parent) {
        var _this = _super.call(this, parent, "") || this;
        _this.name = CLASSNAMES.Q_HEADER;
        _this.elements = [LineLogo, ExitButton];
        return _this;
    }
    QHeader.prototype.load = function () {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.makeId(), _this.parent);
            element.initiate();
            element.load();
        });
    };
    return QHeader;
}(ContentPanel));
var ExitButton = (function (_super) {
    __extends(ExitButton, _super);
    function ExitButton(parentId, onClick) {
        var _this = _super.call(this, parentId, "exit-button") || this;
        _this.buttonContent = "Save and Exit";
        return _this;
    }
    ExitButton.prototype.getElementTag = function () {
        return 'button';
    };
    ExitButton.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.buttonContent;
        return element;
    };
    ExitButton.getElements = function () {
        return document.getElementsByClassName("exit-button");
    };
    return ExitButton;
}(BaseComponent));
var QFooter = (function (_super) {
    __extends(QFooter, _super);
    function QFooter(parent, id, steps) {
        var _this = _super.call(this, parent, "qfooter") || this;
        _this.name = CLASSNAMES.Q_FOOTER;
        _this.elements = [Steps, HrElement, NavButtons];
        _this.steps = steps;
        return _this;
    }
    QFooter.prototype.load = function (onclicks) {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.makeId(), "", el == NavButtons ? onclicks : _this.steps);
            element.initiate();
            element.load();
        });
        QFooter.reload(0, this.steps);
    };
    QFooter.reload = function (step, totalSteps) {
        NavButtons.reload(step, totalSteps);
    };
    return QFooter;
}(ContentPanel));
var BackButton = (function (_super) {
    __extends(BackButton, _super);
    function BackButton(parentId, id, onClick) {
        var _this = _super.call(this, parentId, ClassName.BACK) || this;
        _this.buttonContent = "Back";
        _this.clickHandler = onClick || (function () { });
        return _this;
    }
    BackButton.prototype.getElementTag = function () {
        return 'button';
    };
    BackButton.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.buttonContent;
        return element;
    };
    BackButton.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    BackButton.getElements = function () {
        return document.getElementsByClassName(ClassName.BACK);
    };
    BackButton.componentName = ClassName.BACK;
    return BackButton;
}(BaseComponent));
var NextButton = (function (_super) {
    __extends(NextButton, _super);
    function NextButton(parentId, id, onClick) {
        var _this = _super.call(this, parentId, ClassName.NEXT) || this;
        _this.buttonContent = "Next";
        _this.clickHandler = onClick || (function () { });
        return _this;
    }
    NextButton.prototype.getElementTag = function () {
        return 'button';
    };
    NextButton.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.buttonContent;
        return element;
    };
    NextButton.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    NextButton.getElements = function () {
        return document.getElementsByClassName(ClassName.NEXT);
    };
    NextButton.componentName = ClassName.NEXT;
    return NextButton;
}(BaseComponent));
var SubmitButton = (function (_super) {
    __extends(SubmitButton, _super);
    function SubmitButton(parentId, id, onClick) {
        var _this = _super.call(this, parentId, ClassName.SUBMIT) || this;
        _this.buttonContent = "Submit";
        _this.clickHandler = onClick || (function () { });
        return _this;
    }
    SubmitButton.prototype.getElementTag = function () {
        return 'button';
    };
    SubmitButton.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.buttonContent;
        return element;
    };
    SubmitButton.prototype.afterInit = function () {
        this.addEventListener('click', this.clickHandler);
    };
    SubmitButton.getElements = function () {
        return document.getElementsByClassName(ClassName.SUBMIT);
    };
    SubmitButton.componentName = ClassName.SUBMIT;
    return SubmitButton;
}(BaseComponent));
var NavButtons = (function (_super) {
    __extends(NavButtons, _super);
    function NavButtons(parent, id, onclicks) {
        if (id === void 0) { id = ""; }
        if (onclicks === void 0) { onclicks = []; }
        var _this = _super.call(this, parent, id) || this;
        _this.elements = [BackButton, NextButton, SubmitButton];
        _this.name = CLASSNAMES.NAV;
        _this.args = onclicks;
        return _this;
    }
    NavButtons.prototype.load = function () {
        var _this = this;
        this.elements.forEach(function (el, i) {
            var element = new el(_this.makeId(), "", _this.args[i]);
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
                ba.style.display = cond(step, steps) ? DISPLAY.NONE : "inline-block";
            }
        });
    };
    NavButtons.buttonConditions = new Map([
        [BackButton.name, function (step, steps) { return step == 0; }],
        [NextButton.name, function (step, steps) { return step == steps - 1; }],
        [SubmitButton.name, function (step, steps) { return step != steps - 1; }]
    ]);
    return NavButtons;
}(ContentPanel));
var Steps = (function (_super) {
    __extends(Steps, _super);
    function Steps(parentId) {
        return _super.call(this, parentId, "steps") || this;
    }
    return Steps;
}(BaseComponent));
var QContainer = (function (_super) {
    __extends(QContainer, _super);
    function QContainer(parent, id, content) {
        var _this = _super.call(this, parent, CLASSNAMES.Q_CONTAINER) || this;
        _this.name = CLASSNAMES.Q_CONTAINER;
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
        console.log("QContainer.load_ called, step:", step, "content:", this.content);
        this.content.forEach(function (qs, i) {
            qs.content.forEach(function (qa, j) {
                if (!qa.e) {
                    qa.initiate(_this.makeId());
                }
            });
        });
        this.content.forEach(function (qs, i) {
            qs.content.forEach(function (qa, j) {
                var prevValue = qa.prev_id ? _this.tree.get(qa.prev_id) : undefined;
                var shouldDisplay = (i == step && (j == 0 || !!prevValue));
                console.log("Step ".concat(i, ", QA ").concat(j, ": shouldDisplay=").concat(shouldDisplay, ", step=").concat(step, ", i==step=").concat(i == step, ", j==0=").concat(j == 0, ", prev_id=").concat(qa.prev_id, ", prevValue=").concat(prevValue));
                qa.make(_this.makeId(), shouldDisplay, _this.tree);
            });
        });
    };
    return QContainer;
}(ContentPanel));
var QuestionContainer = (function (_super) {
    __extends(QuestionContainer, _super);
    function QuestionContainer(parent, id, content) {
        var _this = _super.call(this, parent, id) || this;
        _this.name = CLASSNAMES.QUESTION_CONTAINER;
        _this.content = content;
        _this.elements = [TextElement, TextElement];
        return _this;
    }
    QuestionContainer.prototype.makeHelp = function (parent_id) {
        var el = new TextElement(parent_id, this.id, this.content[1]);
        el.initiate();
        el.load();
        return el;
    };
    QuestionContainer.prototype.makeQuestion = function (parent_id) {
        var el = new TextElement(parent_id, this.id, this.content[0]);
        el.initiate();
        el.load();
        return el;
    };
    QuestionContainer.prototype.load = function () {
        this.makeQuestion(this.makeId());
        this.makeHelp(this.makeId());
    };
    QuestionContainer.prototype.show = function (display) {
        this.getElement().style.display = display == false ? "none" : "flex";
    };
    return QuestionContainer;
}(ContentPanel));
var QAContainer = (function (_super) {
    __extends(QAContainer, _super);
    function QAContainer(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.name = CLASSNAMES.QA_CONTAINER;
        _this.elements = [];
        return _this;
    }
    QAContainer.prototype.load = function (tree, next_ids, display) {
        this.load_(tree, next_ids, display);
    };
    QAContainer.prototype.load_ = function (tree, next_ids, display) {
        this.content.question.make(this.makeId());
        this.content.answer.make(this.makeId(), tree, next_ids);
        this.show(display);
    };
    QAContainer.prototype.show = function (display) {
        this.getElement().style.display = display == false ? DISPLAY.NONE : DISPLAY.FLEX;
    };
    return QAContainer;
}(ContentPanel));
var QContainer_ = (function (_super) {
    __extends(QContainer_, _super);
    function QContainer_(parent, content) {
        var _this = _super.call(this, parent, "") || this;
        _this.name = CLASSNAMES.Q_PAGE;
        _this.content = content;
        return _this;
    }
    QContainer_.prototype.load_ = function (step) {
        var _this = this;
        this.content.forEach(function (qa, i) { return qa.make(_this.makeId(), i == step - 1); });
    };
    return QContainer_;
}(ContentPanel));
