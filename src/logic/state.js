
class StateConstructor{
    static updateCategory(obj, active, lower, upper){
        obj["active"] = active!=undefined ? active : obj["active"];
        obj["lower"] = active!=undefined ? lower : obj["lower"];
        obj["upper"] = active!=undefined ? upper : obj["upper"];
    }

    static updateProject(obj, active){
        obj["active"] = active!=undefined ? active : obj["active"];
    }

    static category(category, active, lower, upper){
        return {
            category: {
                "id": category,
                "active": active!=undefined ? active : 0,
                "lower": lower!=undefined ? lower : 0,
                "upper": upper!=undefined ? upper : 100
            }
        }
    }
    static project(project, active){
        return {
            project: {
                "id": project.id,
                "active": active!=undefined ? active : 0,
                "categories": project.config.categories.map(c=>StateConstructor.category(c.id, 0, 0, 100))
            }
        }
    }

}

class State{
    static key = "state";
    static content = {};

    static setup(projects){
        this.content = projects.map(p=>StateConstructor.project(p));
    }

    static updateProject(project, active){
        this.content.filter(p=>p.id==project).forEach(p=>
        {
            StateConstructor.updateProject(p, active);
        }
        )
    }

    static update(category, active, lower, upper){
        this.content.filter(p=>p.categories.map(c=>c.name).includes(category)).forEach(p=>
        {
            p.categories.filter(c=>c.id==category).forEach(c=>
            {
                StateConstructor.updateCategory(c, active, lower, upper)
            }
            )
        }
        )
    }

    static write(){
        localStorage.setItem(this.key, JSON.stringify(this.content));
    }

    static read(){
        this.content = localStorage.getItem(this.key);
    }
}