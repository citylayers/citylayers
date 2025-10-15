"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerTree = void 0;
var AnswerTree = (function () {
    function AnswerTree() {
        this.content = new Map();
    }
    AnswerTree.prototype.make = function () {
    };
    AnswerTree.prototype.add = function (q, a) {
        this.content.set(q, a);
    };
    AnswerTree.prototype.get = function (id) {
        return this.content.get(id) ? this.content.get(id) : undefined;
    };
    return AnswerTree;
}());
exports.AnswerTree = AnswerTree;
