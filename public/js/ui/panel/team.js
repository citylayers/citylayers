

class TeamPanel extends LegalPanel{
    static name = CLASSNAMES.HOME_PANEL;
    constructor(parent){
        super(parent, "id");
        this.name = TeamPanel.name;
        this.elements = [TextElement, TeamMemberContainer];
        
    }

    getParent(){
        let els = document.getElementsByTagName(this.parent);
        return els.length>0 ? els[0] : document.body;
    }

    load(team) {
        this.elements.forEach(el => {
            let element = new el(this.make_id(), "team");
            element.initiate();
            element.load(team);
        });

    }
}
