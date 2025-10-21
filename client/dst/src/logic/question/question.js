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
exports.AnswerBool = exports.AnswerCategorical = exports.QASet = exports.QAPair = exports.AnswerMultiCategorical = exports.AnswerRange = exports.AnswerText = exports.AnswerImage = exports.Answer = exports.Question = void 0;
var question_1 = require("../../server/src/parser/question");
var QASet = (function () {
    function QASet(step, name, content) {
        if (name === void 0) { name = ""; }
        this.step = step;
        this.name = name;
        this.content = content ? content : [];
    }
    QASet.prototype.add = function (qapair) {
        this.content.push(qapair);
        var prevs = this.content.filter(function (qp) { return qp.answer.getIds().includes(qapair.prev_id); });
        prevs.forEach(function (pr) { pr.setNext(qapair.prev_id, qapair.answer.id); });
    };
    QASet.prototype.convertContent = function () {
        this.content = this.content.map(function (qa) { return new QAPair(qa.question, qa.answer); });
        this.content.forEach(function (qa) { return qa.convertContent(); });
    };
    return QASet;
}());
exports.QASet = QASet;
var QAPair = (function () {
    function QAPair(question, answer, prev_id) {
        this.question = question;
        this.step = question.step;
        this.answer = answer;
        this.prev_id = prev_id;
        this.next_ids = new Map();
    }
    QAPair.prototype.make = function (parent_id, display, tree) {
    };
    QAPair.prototype.setNext = function (prev, next) {
        this.next_ids.set(prev, next);
    };
    QAPair.prototype.convertContent = function () {
        this.question = Question.fromNode(this.question);
        this.answer = question_1.AnswerParser.fromNode(this.answer);
    };
    return QAPair;
}());
exports.QAPair = QAPair;
var Answer = (function () {
    function Answer(id, content) {
        this.id = id;
        this.content = content;
        this.type = question_1.ANSWERS.TEXT;
    }
    Answer.fromNode = function (node) {
        return new Answer(node.id, node.atype);
    };
    Answer.prototype.getIds = function () {
        return [this.id];
    };
    Answer.prototype.empty = function () {
        return "";
    };
    return Answer;
}());
exports.Answer = Answer;
var Question = (function () {
    function Question(id, content, help, step) {
        this.id = id;
        this.help = help ? help : "";
        this.step = step ? step : 0;
        this.content = content;
    }
    Question.fromNode = function (node) {
        return new Question(node.id, node.value, node.help, node.step ? node.step : 0);
    };
    return Question;
}());
exports.Question = Question;
var AnswerBool = (function (_super) {
    __extends(AnswerBool, _super);
    function AnswerBool(id, content) {
        var _this = _super.call(this, id, content) || this;
        _this.type = question_1.ANSWERS.BOOL;
        return _this;
    }
    AnswerBool.prototype.empty = function () {
        return false;
    };
    return AnswerBool;
}(Answer));
exports.AnswerBool = AnswerBool;
var AnswerCategorical = (function (_super) {
    __extends(AnswerCategorical, _super);
    function AnswerCategorical(id, content) {
        var _this = _super.call(this, id, content) || this;
        _this.type = question_1.ANSWERS.CATEGORY;
        return _this;
    }
    AnswerCategorical.prototype.empty = function () {
        return -1;
    };
    return AnswerCategorical;
}(Answer));
exports.AnswerCategorical = AnswerCategorical;
var AnswerMultiCategorical = (function (_super) {
    __extends(AnswerMultiCategorical, _super);
    function AnswerMultiCategorical(id, content) {
        var _this = _super.call(this, id, content) || this;
        _this.content = content.content;
        _this.type = question_1.ANSWERS.MULTICATEGORY;
        return _this;
    }
    AnswerMultiCategorical.prototype.getIds = function () {
        return this.content.map(function (e) { return e.id; });
    };
    AnswerMultiCategorical.fromNode = function (node) {
        var q = new AnswerMultiCategorical(node.id, node);
        return q;
    };
    AnswerMultiCategorical.prototype.empty = function () {
        return [];
    };
    return AnswerMultiCategorical;
}(Answer));
exports.AnswerMultiCategorical = AnswerMultiCategorical;
var AnswerRange = (function (_super) {
    __extends(AnswerRange, _super);
    function AnswerRange(id, content) {
        var _this = _super.call(this, id, content) || this;
        _this.labels = content.label;
        _this.values = content.value;
        _this.type = question_1.ANSWERS.RANGE;
        return _this;
    }
    AnswerRange.fromNode = function (node) {
        return new AnswerRange(node.id, node);
    };
    AnswerRange.prototype.empty = function () {
        return -1;
    };
    return AnswerRange;
}(Answer));
exports.AnswerRange = AnswerRange;
var AnswerImage = (function (_super) {
    __extends(AnswerImage, _super);
    function AnswerImage(id, content) {
        var _this = _super.call(this, id, content) || this;
        _this.type = question_1.ANSWERS.IMAGE;
        return _this;
    }
    AnswerImage.fromNode = function (node) {
        return new AnswerImage(node.id, node.atype);
    };
    return AnswerImage;
}(Answer));
exports.AnswerImage = AnswerImage;
var AnswerText = (function (_super) {
    __extends(AnswerText, _super);
    function AnswerText(id, content) {
        var _this = _super.call(this, id, content) || this;
        _this.type = question_1.ANSWERS.TEXT;
        return _this;
    }
    AnswerText.fromNode = function (node) {
        var q = new AnswerText(node.id, node.atype);
        return q;
    };
    return AnswerText;
}(Answer));
exports.AnswerText = AnswerText;
