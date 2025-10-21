





class TeamPanel extends LegalPanel{
    
    constructor(parent:string){
        super(parent, "");
        this.name = CLASSNAMES.HOME_PANEL;
        this.elements = [TextElement, TeamMemberContainer];
        
    }

    getParent(){
        let els = document.getElementsByTagName(this.parent);
        return els.length>0 ? els[0] as HTMLElement : document.body;
    }

    load(team:any[]) {
        this.elements.forEach(el => {
            let element = new el(this.makeId(), "team");
            element.initiate();
            el==TeamMemberContainer ? element.load(team) : element.load();
        });

    }
}

