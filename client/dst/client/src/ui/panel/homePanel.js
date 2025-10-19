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
var HomePanel = (function (_super) {
    __extends(HomePanel, _super);
    function HomePanel(parent) {
        var _this = _super.call(this, parent, "id") || this;
        _this.name = CLASSNAMES.HOME_PANEL;
        _this.elements = [LandingIllustration, GeneralContent, ProjectPanel];
        return _this;
    }
    HomePanel.prototype.load = function (projects) {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.makeId(), _this.id);
            element.initiate();
            element.load(projects);
        });
    };
    return HomePanel;
}(ContentPanel));
