class Config{
    
    static empty(){
        return new Config("", "", "", [])
    }
    constructor(id, name, description,
        categories
    ){
        this.id = id;
        this.name = name? name : " ";
        this.description = description ? description : "";
        this.categories = categories ? categories : [];
        // this.subcategories = subcategories ? subcategories : [];
    }
    isempty(){
        return this.id=="";
    }
}