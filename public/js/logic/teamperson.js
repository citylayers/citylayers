

class TeamPerson{
    constructor(name, link, role, external){
        this.id = name;
        this.name = name;
        this.link = link ? link : "";
        this.role = role;
        this.external = external ? external : 0;
    }
}

class Role{
    constructor(role, project_name){
        this.role = role;
        this.project_name = project_name;
    }
}