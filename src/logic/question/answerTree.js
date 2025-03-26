"use strict";
exports.__esModule = true;
exports.AnswerTree = void 0;
var AnswerTree = /** @class */ (function () {
    function AnswerTree() {
        this.content = new Map();
    }
    AnswerTree.prototype.make = function () {
    };
    AnswerTree.prototype.add = function (q, a) {
        // q - elementId
        // a - value
        this.content.set(q, a);
    };
    AnswerTree.prototype.get = function (id) {
        return this.content.get(id) ? this.content.get(id) : undefined;
    };
    return AnswerTree;
}());
exports.AnswerTree = AnswerTree;
