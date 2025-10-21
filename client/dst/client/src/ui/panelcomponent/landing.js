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
var LandingIllustration = (function (_super) {
    __extends(LandingIllustration, _super);
    function LandingIllustration(parent) {
        var _this = _super.call(this, parent, "id") || this;
        _this.name = CLASSNAMES.LANDING_ILLUSTRATION;
        _this.elements = [ColorLogo, GradElement];
        _this.images = Array.from(Array(15).keys()).filter(function (e) { return e > 1; }).map(function (e) { return "images/landing/v0.2.11/".concat(e, ".png"); });
        return _this;
    }
    LandingIllustration.prototype.load = function () {
        var _this = this;
        this.images.forEach(function (el) {
            var illustration = new Illustration(el, "", "");
            var element = new ImageElement(_this.makeId(), "image", illustration, "landing_illustration");
            element.initiate();
            element.load();
        });
        this.elements.forEach(function (el) {
            var element = new el(_this.makeId(), _this.id);
            element.initiate();
            element.load();
        });
    };
    return LandingIllustration;
}(ContentPanel));
var GeneralContent = (function (_super) {
    __extends(GeneralContent, _super);
    function GeneralContent(parent) {
        var _this = _super.call(this, parent, "id") || this;
        _this.name = CLASSNAMES.LANDING_GENERAL;
        _this.elements = [LandingSlogan, LandingBrief];
        return _this;
    }
    GeneralContent.prototype.load = function () {
        var _this = this;
        this.elements.forEach(function (el) {
            var element = new el(_this.makeId(), _this.id);
            element.initiate();
            element.load();
        });
    };
    return GeneralContent;
}(ContentPanel));
var LandingSlogan = (function (_super) {
    __extends(LandingSlogan, _super);
    function LandingSlogan(parent, id) {
        var content = "Collaborative mapping as a practice of resilient city-making";
        return _super.call(this, parent, ClassName.SLOGAN, id, content) || this;
    }
    LandingSlogan.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        return element;
    };
    return LandingSlogan;
}(BaseComponent));
var LandingBrief = (function (_super) {
    __extends(LandingBrief, _super);
    function LandingBrief(parent, id) {
        var content = "CITY LAYERS are a socially conscious framework that integrates \
                    subjective community knowledge with existing open datasets. Its \
                    purpose – to reveal, map and inform the key urban challenges, \
                    while simoultaneously offering a clear roadmap for overcoming \
                    them. \
                    Global challenges related to climate, mobility, and health are broken \
                    down into a series of micro-scale 'layers' — easily understandable urban \
                    phenomena that citizens can identify, record, and reflect upon through \
                    collaborative city-mapping. This participatory \
                    methodology elevates individual observations into collective \
                    knowledge, providing both citizens and city planners with actionable \
                    insights to improve decision-making.";
        return _super.call(this, parent, "description", id, content) || this;
    }
    LandingBrief.prototype.createElement = function () {
        var element = _super.prototype.createElement.call(this);
        element.innerHTML = this.content;
        element.classList.add("description");
        return element;
    };
    return LandingBrief;
}(BaseComponent));
var GradElement = (function (_super) {
    __extends(GradElement, _super);
    function GradElement(parentId, id) {
        return _super.call(this, parentId, ClassName.GRAD, id) || this;
    }
    return GradElement;
}(BaseComponent));
