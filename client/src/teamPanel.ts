
function buildTeamPanel(team:any){
    let page = new TeamPanel("main");
    page.initiate();
    page.load(team);
}

export{buildTeamPanel};