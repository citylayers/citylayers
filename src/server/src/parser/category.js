

class CategoryParser extends Parser{

    static make(categoryInput, subcats){
        // per category
        return new Category(categoryInput.id, 
            categoryInput.name, 
            categoryInput.description, 
            subcats.filter(e=>e.parent_id==categoryInput.id),
            categoryInput.color, categoryInput.low, categoryInput.high);
        
    }
}