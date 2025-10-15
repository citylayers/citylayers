"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Illustration = void 0;
var Illustration = (function () {
    function Illustration(image_path, link, caption) {
        this.path = image_path;
        this.link = link ? link : "";
        this.caption = caption ? caption : "illustration of citylayers project" + this.link == "" ? "" : " leading to ".concat(this.link);
    }
    return Illustration;
}());
exports.Illustration = Illustration;
