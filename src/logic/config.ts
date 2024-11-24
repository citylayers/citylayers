class Config{
    id: string;
    name: string;
    description: string;
    categories: string[];
    static empty():Config{
        return new Config("", "", "", [])
    }
    constructor(id:string, name:string, description:string,
        categories:string[]
    ){
        this.id = id;
        this.name = name? name : " ";
        this.description = description ? description : "";
        this.categories = categories ? categories : [];
        // this.subcategories = subcategories ? subcategories : [];
    }
}

export {Config};