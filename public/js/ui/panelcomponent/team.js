

class TeamMemberContainer extends ContentPanel{
    static name = CLASSNAMES.TEAM_MEMBER_CONTAINER;
    constructor(parent, team){
        super(parent, "id");
        this.name = TeamMemberContainer.name;
        this.elements = TeamPersonCard;
        this.content = team;
    }

    load(team) {
        team.forEach((el, i) => {
            let element = new TeamPersonCard(this.make_id(), this.parent, team[i]);
            element.initiate();
            element.load();
        });

    }
}

class TeamPersonCard extends ContentPanel{
    static name = CLASSNAMES.TEAM_MEMBER_CARD;
    constructor(parent, id, content){
        super(parent, id, content.id);
        this.id = content.id;
        this.name = TeamPersonCard.name;
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
            
            let element = new el(this.make_id(), 
                                 `${this.id}`, 
                                 this.args[i]);
            element.initiate();
            element.load();
        });

    }
}

class RoleContainer extends ContentPanel{
    static name = CLASSNAMES.ROLE_CONTAINER;
    constructor(parent, id, content){
        super(parent, id);
        this.id = id;
        this.name = RoleContainer.name;
        this.elements = RoleElement;
        this.content = content;
    }

    load() {
        this.content.forEach((el, i) => {
            let element = new RoleElement(this.make_id(), 
                                          `${this.id}_${i}`, 
                                          el
                                        );
            element.initiate();
            element.load();
        });

    }
}

class RoleElement extends ContentPanel{
    static name = CLASSNAMES.ROLE_ELEMENT;
    constructor(parent, id, content){
        super(parent, id, content.id);
        this.id = `${parent}_${id}`;
        this.name = RoleElement.name;
        this.elements = [ 
                         LinkElement,
                         TextElement
                        ];
        this.content = content;
        
    }

    load() {
        
        let element = new LinkElement(this.make_id(), 
                                  this.id, 
                                  this.content.project_name, 
                                  `/project/${this.content.project_id}`);
        element.initiate();
        element.load();

        element = new TextElement(this.make_id(), 
                                      this.id, 
                                      this.content.role);
        element.initiate();
        element.load();

    }
}