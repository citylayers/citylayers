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
var DoubleRangeContainerElement = (function (_super) {
    __extends(DoubleRangeContainerElement, _super);
    function DoubleRangeContainerElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content) || this;
        _this.elements = [];
        return _this;
    }
    DoubleRangeContainerElement.getParsed = function (currentFrom, currentTo) {
        var from = parseInt(currentFrom.value, 10);
        var to = parseInt(currentTo.value, 10);
        return [from, to];
    };
    DoubleRangeContainerElement.prototype.load = function (controlTree) {
        var _this = this;
        this.elements = [SLIDER_IDS.LOW, SLIDER_IDS.HIGH].map(function (s) {
            var slider = new Slider(_this.makeId(), s, _this.content);
            slider.initiate(controlTree);
            return slider;
        });
        this.elements.forEach(function (el, i) {
            el.limit(function () {
                el.controlSlider(_this.elements[1 - i], i == 0);
                _this.updateDashboard();
            });
        });
        this.elements.forEach(function (el) { return el.activate(false); });
    };
    DoubleRangeContainerElement.prototype.action = function (ev, tree, next) {
        tree.add(this.id, this.getCurrentValue());
    };
    DoubleRangeContainerElement.prototype.getCurrentValue = function () {
        return new Map([
            [RANGE_LABELS.MIN, parseInt(this.elements[0].getValue())],
            [RANGE_LABELS.MAX, parseInt(this.elements[1].getValue())]
        ]);
    };
    DoubleRangeContainerElement.prototype.updateDashboard = function () {
        var ConfigPanel = window.ConfigPanel;
        if (ConfigPanel) {
            ConfigPanel.activation(this.content, this.elements[0].getValue(), this.elements[1].getValue());
        }
    };
    DoubleRangeContainerElement.prototype.fillSlider = function (from, to, sliderColor, rangeColor, controlSlider) {
        var rangeDistance = parseInt(to.max) - parseInt(to.min);
        var fromPosition = parseInt(from.value) - parseInt(to.min);
        var toPosition = parseInt(to.value) - parseInt(to.min);
        controlSlider.style.background = "linear-gradient(\n          to right,\n          ".concat(sliderColor, " 0%,\n          ").concat(sliderColor, " ").concat((fromPosition) / (rangeDistance) * 100, "%,\n          ").concat(rangeColor, " ").concat(((fromPosition) / (rangeDistance)) * 100, "%,\n          ").concat(rangeColor, " ").concat((toPosition) / (rangeDistance) * 100, "%,\n          ").concat(sliderColor, " ").concat((toPosition) / (rangeDistance) * 100, "%,\n          ").concat(sliderColor, " 100%)");
    };
    DoubleRangeContainerElement.prototype.setToggleAccessible = function (currentTarget) {
        var toSlider = document.querySelector('#toSlider');
        if (toSlider) {
            if (Number(currentTarget.value) <= 0) {
                toSlider.style.zIndex = '2';
            }
            else {
                toSlider.style.zIndex = '0';
            }
        }
    };
    DoubleRangeContainerElement.componentName = ClassName.CATEGORY_SLIDER_CONTAINER;
    return DoubleRangeContainerElement;
}(InputContainer));
var Slider = (function (_super) {
    __extends(Slider, _super);
    function Slider(parent, border, content) {
        var _this = _super.call(this, parent, "", content) || this;
        _this.border = border;
        return _this;
    }
    Slider.prototype.action = function (ev, tree, next) {
        tree.add(this.id, [this.border, this.getValue()]);
    };
    Slider.prototype.initExtra = function (element) {
        _super.prototype.initExtra.call(this, element);
        var inputElement = element;
        var isHigh = this.id.includes(SLIDER_IDS.HIGH);
        inputElement.setAttribute("value", isHigh ? "100" : "0");
        inputElement.setAttribute("class", isHigh ? SLIDER_IDS.HIGH : SLIDER_IDS.LOW);
    };
    Slider.prototype.makeId = function () {
        return "".concat(this.className, "_").concat(this.parentId, "_").concat(this.id);
    };
    Slider.prototype.activate = function (value) {
        var res = value === undefined || value === true ? false : true;
        var element = this.getElement();
        if (element) {
            element.disabled = res;
        }
    };
    Slider.prototype.controlSlider = function (other, is_start) {
        var thisElement = this.getElement();
        var otherElement = other.getElement();
        if (!thisElement || !otherElement)
            return;
        var _a = is_start
            ? DoubleRangeContainerElement.getParsed(thisElement, otherElement)
            : DoubleRangeContainerElement.getParsed(otherElement, thisElement), from = _a[0], to = _a[1];
        if (from >= to) {
            this.setValue(is_start ? to : from);
        }
    };
    Slider.prototype.limit = function (f) {
        var element = this.getElement();
        if (element) {
            element.oninput = f;
        }
    };
    Slider.prototype.getValue = function () {
        var element = this.getElement();
        return element ? element.value : '0';
    };
    Slider.prototype.setValue = function (value) {
        var element = this.getElement();
        if (element) {
            element.value = value.toString();
        }
    };
    return Slider;
}(RangeInputElement));
var DoubleSlider = DoubleRangeContainerElement;
