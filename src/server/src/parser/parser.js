"use strict";
exports.__esModule = true;
exports.Parser = void 0;
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.make = function (inp, arg) {
        return;
    };
    Parser.makeAll = function (inp, arg) {
        var _this = this;
        if (inp.original == undefined) {
            return inp.map(function (i) { return _this.make(i, arg); });
        }
        return [];
    };
    return Parser;
}());
exports.Parser = Parser;
