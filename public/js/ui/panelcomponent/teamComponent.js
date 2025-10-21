class TeamMemberContainer extends ContentPanel {
    constructor(parent, id, team) {
        super(parent, "id");
        this.name = CLASSNAMES.TEAM_MEMBER_CONTAINER;
        this.elements = [TeamPersonCard];
        this.content = team;
    }
    load(team) {
        team.forEach((el, i) => {
            let element = new TeamPersonCard(this.makeId(), this.parent, team[i]);
            element.initiate();
            element.load();
        });
    }
}
class TeamPersonCard extends ContentPanel {
    constructor(parent, id, content) {
        super(parent, id, content.id);
        this.id = content.id;
        this.name = CLASSNAMES.TEAM_MEMBER_CARD;
        this.elements = [TextElement,
            RoleContainer];
        this.content = content;
        this.args = [
            content.name,
            content.role
        ];
    }
    load() {
        this.elements.forEach((el, i) => {
            let element = new el(this.makeId(), `${this.id}`, this.args[i]);
            element.initiate();
            element.load();
        });
    }
}
class RoleContainer extends ContentPanel {
    constructor(parent, id, content) {
        super(parent, id);
        this.id = id;
        this.name = CLASSNAMES.ROLE_CONTAINER;
        ; //RoleContainer.name;
        this.elements = [RoleElement];
        this.content = content;
    }
    load() {
        this.content.forEach((el, i) => {
            let element = new RoleElement(this.makeId(), `${this.id}_${i}`, el);
            element.initiate();
            element.load();
        });
    }
}
class RoleElement extends ContentPanel {
    constructor(parent, id, content) {
        super(parent, id, content.id);
        this.id = `${parent}_${id}`;
        this.name = CLASSNAMES.ROLE_ELEMENT; //RoleElement.name;
        this.elements = [
            LinkElement,
            TextElement
        ];
        this.content = content;
    }
    load() {
        let element = new LinkElement(this.makeId(), this.id, [this.content.project_name,
            `/project/${this.content.project_id}`]);
        element.initiate();
        element.load();
        let element1 = new TextElement(this.makeId(), this.id, this.content.role);
        element1.initiate();
        element1.load();
    }
}
