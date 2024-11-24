

class PartnerElement extends ContentElement{
    constructor(parent, id, content){
        let name = CLASSNAMES.PARTNER;
        super(parent, id, name, content);
        this.elements = [Logo, Logo, Logo];
    }

}