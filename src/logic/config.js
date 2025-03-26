"use strict";
exports.__esModule = true;
exports.Config = void 0;
var Config = /** @class */ (function () {
    function Config(id, name, description, categories) {
        this.id = id;
        this.name = name ? name : " ";
        this.description = description ? description : "";
        this.categories = categories ? categories : [];
        // this.subcategories = subcategories ? subcategories : [];
    }
    Config.empty = function () {
        return new Config("", "", "", []);
    };
    return Config;
}());
exports.Config = Config;
