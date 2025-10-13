
import { CLASSNAMES } from "../../constants/ClassNames";
import { TeamMember } from "../../../../logic/teammember";
import { TextElement } from "../component/textElement";
import { LegalPanel } from "./legal";
import { TeamMemberContainer } from "../panelcomponent/teamComponent";

class TeamPanel extends LegalPanel{
    
    constructor(parent:string){
        super(parent, "");
        this.name = CLASSNAMES.HOME_PANEL;
        this.elements = [TextElement, TeamMemberContainer];
        
    }

    getParent(){
        let els = document.getElementsByTagName(this.parent);
        return els.length>0 ? els[0] as HTMLElement : document.body;
    }

    load(team:TeamMember[]) {
        this.elements.forEach(el => {
            let element = new el(this.make_id(), "team");
            element.initiate();
            el==TeamMemberContainer ? element.load(team) : element.load();
        });

    }
}

export {TeamPanel}

