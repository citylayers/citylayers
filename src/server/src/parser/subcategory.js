


class SubcategoryParser extends Parser{

    static make(subcategoryInput){
        return new Subcategory(subcategoryInput.id, subcategoryInput.name, subcategoryInput.category);
    }
}