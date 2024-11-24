import {Illustration} from "./illustration";

class Partner{
    name: string;
    image: Illustration;
    link: string;
    constructor(name:string, image:string, link:string){
        // this.id = name;
        this.name = name;
        this.image = new Illustration(`/images/partners/${image}`, link, this.getCaption(name));
    }

    getCaption(name:string):string{
        return `Logo of Citylayer's partner ${name}`;
    }
}

export {Partner};