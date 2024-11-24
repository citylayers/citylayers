import { Parser } from "./parser";
import { ProjectRecognition } from "../../../logic/projectInfo";

class AwardParser extends Parser{

    static make(inp){
        return new ProjectRecognition(inp.value, inp.partner_id);
    }
}

export {AwardParser};