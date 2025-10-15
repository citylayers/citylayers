"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
var Config = (function () {
    function Config(id, name, description, categories) {
        this.id = id;
        this.name = name ? name : " ";
        this.description = description ? description : "";
        this.categories = categories ? categories : [];
    }
    Config.empty = function () {
        return new Config("", "", "", []);
    };
    return Config;
}());
exports.Config = Config;
