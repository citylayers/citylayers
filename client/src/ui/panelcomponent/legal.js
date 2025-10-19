


class LegalContainer extends ContentPanel{
    constructor(parent){
        super(parent, "social");
        this.name = LEGAL_CLASSNAMES.FOOTER;
        this.parent = parent ? parent : "body";
        this.id = "id";
        
    }

    load() {
        Object.keys(LEGAL).forEach(el => {
            let element = new LinkElement(
                this.makeId(),
                LEGAL_CLASSNAMES.TEXT,
                [LEGAL[el], LEGAL_LINKS.get(LEGAL[el])]
            );
            element.initiate();
            element.load();
        });
    }

}