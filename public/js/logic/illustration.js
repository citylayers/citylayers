

class Illustration{
    constructor(image_path, link, caption){
        this.path = image_path;
        this.link = link ? link : "";
        this.caption = caption ? caption : "illustration of citylayers project" + this.link =="" ? "" : ` leading to ${this.link}`
    }
}