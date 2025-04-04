import { ContentPanel } from "../panel/contentPanel";
import { CLASSNAMES } from "../../../classnames";
import { TeamMember } from "../../../../logic/teammember";
import { TextElement } from "../component/textElement";
import { LinkElement } from "../component/linkElement";

class TeamMemberContainer extends ContentPanel{
    
    constructor(parent:string, id:string, team:TeamMember){
        super(parent, "id");
        this.name = CLASSNAMES.TEAM_MEMBER_CONTAINER;
        this.elements = [TeamPersonCard];
        this.content = team;
    }

    load(team:TeamMember[]) {
        team.forEach((el, i) => {
            let element = new TeamPersonCard(this.make_id(), this.parent, team[i]);
            element.initiate();
            element.load();
        });

    }
}

class TeamPersonCard extends ContentPanel{
    args: string[];
    constructor(parent:string, id:string, content?:any){
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
            
            let element = new el(this.make_id(), 
                                 `${this.id}`, 
                                 this.args[i]);
            element.initiate();
            element.load();
        });

    }
}

class RoleContainer extends ContentPanel{
    
    constructor(parent:string, id:string, content?:any){
        super(parent, id);
        this.id = id;
        this.name = CLASSNAMES.ROLE_CONTAINER;; //RoleContainer.name;
        this.elements = [RoleElement];
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
     
    constructor(parent:string, id:string, content?:any){
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
        
        let element = new LinkElement(this.make_id(), 
                                  this.id, 
                                  [this.content.project_name, 
                                  `/project/${this.content.project_id}`]);
        element.initiate();
        element.load();

        let element1 = new TextElement(this.make_id(), 
                                      this.id, 
                                      this.content.role);
        element1.initiate();
        element1.load();

    }
}

export {TeamMemberContainer}