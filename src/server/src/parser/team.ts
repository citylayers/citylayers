import { Parser } from "./parser";
import { TeamMember } from "../../../logic/teammember";

class TeamParser extends Parser{

    static make(teamInput:any, roleInput:any){
        return new TeamMember(teamInput.name, teamInput.link, 
                    roleInput.filter(r=>r.team_id==teamInput.id)[0].role, teamInput.external);
                
    }
}

export {TeamParser};