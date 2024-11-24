

class TeamMember{
    id: string;
    name: string;
    link: string;
    role:Role[];
    external: boolean;
    constructor(name:string, link:string, role:Role[]=[], external:boolean=false){
        this.id = name;
        this.name = name;
        this.link = link ? link : "";
        this.role = role;
        this.external = external ? external : false;
    }
}

class Role{
    role: string;
    project_name: string;
    constructor(role:string, project_name:string){
        this.role = role;
        this.project_name = project_name;
    }
}

export {TeamMember, Role};