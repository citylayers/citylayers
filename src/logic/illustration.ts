
class Illustration{
    path: string;
    link: string;
    caption: string;
    constructor(image_path:string, link:string, caption?:string){
        this.path = image_path;
        this.link = link ? link : "";
        this.caption = caption ? caption : "illustration of citylayers project" + this.link =="" ? "" : ` leading to ${this.link}`
    }
}

export {Illustration};