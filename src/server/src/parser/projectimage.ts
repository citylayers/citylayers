import { Parser } from "./parser";
import { Illustration } from "../../../logic/illustration";

class ProjectImageParser extends Parser{

    static make(inp:any, project_id:string | number){
        
        return new Illustration(`/images/projects/${project_id}/${inp.image}`, 
            '', inp.caption);
            
    }
}

export {ProjectImageParser}