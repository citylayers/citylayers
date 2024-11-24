

class Partner{
    constructor(name, image, link){
        // this.id = name;
        this.name = name;
        this.image = new Illustration(`/images/partners/${image}`, link, this.getCaption(name));
    }

    getCaption(name){
        return `Logo of Citylayer's partner ${name}`;
    }
}