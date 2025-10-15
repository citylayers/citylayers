import { DateTime } from "neo4j-driver";
import {Partner} from "./partner";
import { Illustration } from "./illustration";
import {TeamMember} from "./teammember";

class ProjectPeriod{
    start:string;
    end: string;
    constructor(start:string | DateTime, end:string | DateTime){
        this.start = this.convert(start, true); //? start.substr(0, 10).replaceAll(":", "/") : "Not started";
        this.end = this.convert(end);// ? end.substr(0, 10).replaceAll(":", "/") : "Ongoing";
    }

    convert(d:string | DateTime, start?:boolean):string{
        if (d==null || d==undefined){
            return start==true ? "Not started" : "Ongoing";
        }
        if (d instanceof String){
            return d.substr(0, 10).replace(/:/g, "/")
        }
        if (d instanceof DateTime){
            return `${d.year}/${d.month}/${d.day}`;
        }
    }
}

class ProjectRecognition{
    value: string;
    partner: Partner;
    constructor(value:string, partner:Partner){
        this.value = value ? value : "";
        this.partner = partner;
    }
}

class ProjectInfo{
    id: string;
    name: string;
    mappable:boolean;
    period: ProjectPeriod;
    recognition: ProjectRecognition[];
    images: Illustration[];
    subtitle: string;
    description: string;
    partners: Partner[];
    team: TeamMember[];
    constructor(name:string, subtitle:string, description:string, period:ProjectPeriod, 
                mappable:boolean=false,
                recognition?:ProjectRecognition[],
                images:Illustration[]=[], partners:Partner[]=[], team:TeamMember[]=[]){
        this.id = name;
        this.name = name;
        this.period = period;
        this.mappable = mappable;
        this.subtitle = subtitle ? subtitle : "";
        this.description = description ? description : "";
        this.recognition = recognition ? recognition : undefined;
        this.images = images ? images : [];
        this.partners = partners ? partners : [];
        this.team = team ? team : [];
    }
}

export {ProjectPeriod, ProjectRecognition, ProjectInfo};