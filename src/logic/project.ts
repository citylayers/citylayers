import { Config } from "./config";
import { ProjectInfo } from "./projectInfo";

class ProjectManager{
    projects: Project[];
    constructor(){
        this.projects = [];
    }
}

class Project{
    name: string;
    info: ProjectInfo;
    config: Config;
    constructor(projectInfo, config){
        // this.id = id;
        this.name = projectInfo.name;
        this.info = projectInfo;
        this.config = config ? config : Config.empty();
    }

    getPlace(){
        return "Vienna, Austria";
    }
    getPeriod(){
        return "2024/06";
    }
    getStatus(){
        return "Closed";
    }
}

export {Project};
