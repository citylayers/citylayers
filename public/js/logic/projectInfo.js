
class ProjectPeriod{
    static notstarted = "Not started";
    static ongoing = "Ongoing";
    static closed = "Closed";
    constructor(start, end){
        this._start_date = start;
        this._end_date = end;
        this.start = this.convert(start, true); //? start.substr(0, 10).replaceAll(":", "/") : "Not started";
        this.end = this.convert(end);// ? end.substr(0, 10).replaceAll(":", "/") : "Ongoing";
    }

    summary(){
        return this.start==ProjectPeriod.notstarted ? this.start :`${this.start} - ${this.end}`
    }

    convert(d, start){
        if (d==null || d==undefined){
            return start==true ? "Not started" : "Ongoing";
        }
        if (typeof d === 'string'){
            return d.substr(0, 10).replaceAll(":", "/")
        }
        else if (d.year !== undefined){
            return `${d.year}/${d.month}/${d.day}`;
        }
        else {
            return start==true ? "Not started" : "Ongoing";
        }
    }
}

class ProjectRecognition{
    constructor(value, partner){
        this.value = value ? value : "";
        this.partner = partner;
    }
}

class ProjectInfo{
    constructor(name, subtitle, description, period, mappable,
                recognition,
                images, partners, team){
        this.id = name;
        this.name = name;
        this.period = period;
        this.mappable = mappable;
        this.subtitle = subtitle ? subtitle : "";
        this.description = description ? description : "";
        this.recognition = recognition ? recognition : "";
        this.images = images ? images : [];
        this.partners = partners ? partners : [];
        this.team = team ? team : [];
    }

    status(){
        if (this.period.start==ProjectPeriod.notstarted){
            return this.period.start;
        }
        if (this.period.end==ProjectPeriod.ongoing){
            return this.period.end;
        }
        if (this._end_date!=undefined){
            if (this._end_date<Date.now()){
                return ProjectPeriod.ongoing;
            }
            else{
                return ProjectPeriod.closed;
            }
        }

    }
}