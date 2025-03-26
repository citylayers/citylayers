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
exports.__esModule = true;
exports.ANSWERS = exports.AnswerParser = void 0;
var question_1 = require("../../../logic/question/question");
var parser_1 = require("./parser");
var ANSWERS = {
    RANGE: "range",
    BOOL: "bool",
    CATEGORY: "category",
    IMAGE: "image",
    TEXT: "comment",
    MULTICATEGORY: "multicategory"
};
exports.ANSWERS = ANSWERS;
var AnswerParser = /** @class */ (function (_super) {
    __extends(AnswerParser, _super);
    function AnswerParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnswerParser.make = function (inp, args) {
        var e = AnswerParser.content.get(inp);
        return e(args);
    };
    AnswerParser.fromNode = function (node) {
        var e = AnswerParser.content.get(node.atype);
        return e(node);
    };
    AnswerParser.content = new Map([
        [ANSWERS.RANGE, function (node) { return question_1.AnswerRange.fromNode(node); }],
        [ANSWERS.BOOL, function (node) { return question_1.AnswerBool.fromNode(node); }],
        [ANSWERS.CATEGORY, function (node) { return question_1.AnswerCategorical.fromNode(node); }],
        [ANSWERS.IMAGE, function (node) { return question_1.AnswerImage.fromNode(node); }],
        [ANSWERS.TEXT, function (node) { return question_1.AnswerText.fromNode(node); }],
        [ANSWERS.MULTICATEGORY, function (node) { return question_1.AnswerMultiCategorical.fromNode(node); }],
    ]);
    return AnswerParser;
}(parser_1.Parser));
exports.AnswerParser = AnswerParser;
