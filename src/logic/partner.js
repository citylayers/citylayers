"use strict";
exports.__esModule = true;
exports.Partner = void 0;
var illustration_1 = require("./illustration");
var Partner = /** @class */ (function () {
    function Partner(name, image, link) {
        // this.id = name;
        this.name = name;
        this.image = new illustration_1.Illustration("/images/partners/".concat(image), link, this.getCaption(name));
    }
    Partner.prototype.getCaption = function (name) {
        return "Logo of Citylayer's partner ".concat(name);
    };
    return Partner;
}());
exports.Partner = Partner;
