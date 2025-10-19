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
var TeamMemberContainer = (function (_super) {
    __extends(TeamMemberContainer, _super);
    function TeamMemberContainer(parent, id, team) {
        var _this = _super.call(this, parent, "id") || this;
        _this.name = CLASSNAMES.TEAM_MEMBER_CONTAINER;
        _this.elements = [TeamPersonCard];
        _this.content = team;
        return _this;
    }
    TeamMemberContainer.prototype.load = function (team) {
        var _this = this;
        team.forEach(function (el, i) {
            var element = new TeamPersonCard(_this.makeId(), _this.parent, team[i]);
            element.initiate();
            element.load();
        });
    };
    return TeamMemberContainer;
}(ContentPanel));
var TeamPersonCard = (function (_super) {
    __extends(TeamPersonCard, _super);
    function TeamPersonCard(parent, id, content) {
        var _this = _super.call(this, parent, id, content.id) || this;
        _this.id = content.id;
        _this.name = CLASSNAMES.TEAM_MEMBER_CARD;
        _this.elements = [TextElement,
            RoleContainer];
        _this.content = content;
        _this.args = [
            content.name,
            content.role
        ];
        return _this;
    }
    TeamPersonCard.prototype.load = function () {
        var _this = this;
        this.elements.forEach(function (el, i) {
            var element = new el(_this.makeId(), "".concat(_this.id), _this.args[i]);
            element.initiate();
            element.load();
        });
    };
    return TeamPersonCard;
}(ContentPanel));
var RoleContainer = (function (_super) {
    __extends(RoleContainer, _super);
    function RoleContainer(parent, id, content) {
        var _this = _super.call(this, parent, id) || this;
        _this.id = id;
        _this.name = CLASSNAMES.ROLE_CONTAINER;
        ;
        _this.elements = [RoleElement];
        _this.content = content;
        return _this;
    }
    RoleContainer.prototype.load = function () {
        var _this = this;
        this.content.forEach(function (el, i) {
            var element = new RoleElement(_this.makeId(), "".concat(_this.id, "_").concat(i), el);
            element.initiate();
            element.load();
        });
    };
    return RoleContainer;
}(ContentPanel));
var RoleElement = (function (_super) {
    __extends(RoleElement, _super);
    function RoleElement(parent, id, content) {
        var _this = _super.call(this, parent, id, content.id) || this;
        _this.id = "".concat(parent, "_").concat(id);
        _this.name = CLASSNAMES.ROLE_ELEMENT;
        _this.elements = [
            LinkElement,
            TextElement
        ];
        _this.content = content;
        return _this;
    }
    RoleElement.prototype.load = function () {
        var element = new LinkElement(this.makeId(), this.id, [this.content.project_name, "/project/".concat(this.content.project_id)]);
        element.initiate();
        element.load();
        var element1 = new TextElement(this.makeId(), this.id, this.content.role);
        element1.initiate();
        element1.load();
    };
    return RoleElement;
}(ContentPanel));
