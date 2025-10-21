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
        // Handle different period formats
        if (!this.info.period) return "";

        // If period has a summary method, use it
        if (typeof this.info.period.summary === 'function') {
            return this.info.period.summary();
        }

        // Otherwise construct the string from start/end properties
        let start = this.info.period.start;
        let end = this.info.period.end;

        // Convert objects to strings if needed
        if (typeof start === 'object' && start.year !== undefined) {
            start = `${start.year}/${start.month}/${start.day}`;
        }
        if (typeof end === 'object' && end.year !== undefined) {
            end = `${end.year}/${end.month}/${end.day}`;
        }

        // Default values
        start = start || "Not started";
        end = end || "Ongoing";

        // If start is "Not started", just return that
        if (start === "Not started" || start === ProjectPeriod.notstarted) {
            return start;
        }

        // Otherwise return "start - end"
        return `${start} - ${end}`;
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

