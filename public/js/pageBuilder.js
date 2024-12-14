const PAGES = {
    TEAM: "team",
    ACCESSIBILITY: "accessibility",
    PRIVACY: "privacy",
    IMPRESSUM: "impressum",
    HOME: "home",
    KARTA: "karta",
    PROJECT: "project",
    PIN: "pin"

}

class PageBuilder{
    static content = new Map(
        [[PAGES.TEAM, PageBuilder.buildTeamPage],
        [PAGES.ACCESSIBILITY, PageBuilder.no_build],
        [PAGES.PRIVACY, PageBuilder.no_build],
        [PAGES.IMPRESSUM, PageBuilder.no_build],
        [PAGES.HOME, PageBuilder.buildHomePage],
        [PAGES.PROJECT, PageBuilder.buildProjectPage],
        [PAGES.PIN, PinPage.build],
        [PAGES.KARTA, PageBuilder.buildKarta],
    ]
    )

    static build(page, content){
        let method = PageBuilder.content.get(page);
        return method(content);
    }

    static no_build(content){

    }

    static buildHomePage(content){
        let page = new HomePanel("main");
        page.initiate();
        page.load(content.map(p=>{
            let a = new Project(p.info);
            return a;
        }));
    }

    static buildTeamPage(content){
        var page = new TeamPanel("main");
        page.initiate();
        page.load(content);
    }

    static buildProjectPage(content){
        let page = new ProjectCardPanel("main", content);
        page.initiate();
        page.load(content);
    }
    static buildKarta(content){
        let page = new Dashboard("main");
        page.initiate();
        page.load(content);
    }

    
}



