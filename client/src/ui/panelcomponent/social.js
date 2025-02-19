

const SOCIAL = {
    FB: "FB_logo.svg",
    IG: "IG_logo.svg",
    YT: "YT_icon.svg",
    IN: "IN_logo.svg",
    TW: "twitter.png",
    MAIL: "mail.png",
    GH: "github_logo.png"
}

const SOCIAL_LINKS = new Map([
   [SOCIAL.FB, "/"],
   [SOCIAL.IG, "/"],
   [SOCIAL.YT, "/"],
   [SOCIAL.IN, "https://www.linkedin.com/company/layered-city/"],
   [SOCIAL.TW, "/"],
   [SOCIAL.GH, "https://github.com/citylayers/"],
   [SOCIAL.MAIL, "mailto@lovro.koncar-gamulin@tuwien.ac.at"]
]);

class SocialContainer extends ContentPanel{
    constructor(parent){
        super(parent, "social");
        this.name = CLASSNAMES.SOCIAL;
        this.parent = parent ? parent : "body";
        this.id = "id";
        
    }

    load() {
        Object.keys(SOCIAL).forEach(el => {
            let element = new ImageElement(
                this.make_id(), uuidv4(), "social", new Illustration(
                `/images/social/${SOCIAL[el]}`, SOCIAL_LINKS.get(SOCIAL[el]))
            );
            element.initiate();
            element.load();
        });
    }

}