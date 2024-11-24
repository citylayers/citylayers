class Subcategory{
    constructor(id, name, parent_id
        // description, subcategories
    ){
        this.id = id;
        this.name = name? name : " ";
        this.parent_id = parent_id;
    }
}