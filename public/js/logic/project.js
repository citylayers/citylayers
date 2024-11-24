class ProjectManager{
    constructor(){
        this.projects = [];
    }
}


class ProjectLoader{

    static make(){
        let projects =  ["Accessibility", "Mobility"];
        return projects.map(c => Project(c, c));
    }
}



class Project{
    constructor(projectInfo, config){
        // this.id = id;
        this.name = projectInfo.name;
        this.info = projectInfo;
        this.config = config ? config : Config.empty();
    }

    // getPlace(){
    //     return "Vienna, Austria";
    // }
    getPeriod(){
        return this.info.period.start==ProjectPeriod.notstarted ? this.info.period.start :`${this.info.period.start} - ${this.info.period.end}`
        // return this.info.period.summary();
    }
    getStatus(){
        if (this.info.period.start==ProjectPeriod.notstarted){
            return this.info.period.start;
        }
        if (this.info.period.end==ProjectPeriod.ongoing){
            return this.info.period.end;
        }
        let end = Date.parse(this.info.period.end);
        if (end!=undefined){
            if (end < new Date()){
                return ProjectPeriod.closed;
            }
            else{
                return ProjectPeriod.ongoing;
            }
        }
    }
}

