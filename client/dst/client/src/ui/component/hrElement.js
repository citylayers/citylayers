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
var HrElement = (function (_super) {
    __extends(HrElement, _super);
    function HrElement(parentId) {
        return _super.call(this, parentId, "") || this;
    }
    HrElement.prototype.getElementTag = function () {
        return 'hr';
    };
    HrElement.updateColor = function (ev, gradientEnd) {
        var hrElements = document.getElementsByTagName("hr");
        if (hrElements.length > 0) {
            hrElements[0].style.setProperty(gradientEnd, ev.target.value);
        }
    };
    return HrElement;
}(BaseComponent));
