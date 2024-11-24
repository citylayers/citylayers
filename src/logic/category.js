class CategoryManager{
    constructor(){
        this.categories = [];
    }
}


class CategoryLoader{

    static make(){
        let categories =  ["Accessibility", "Noise", "Safety", "Weather Resistance", "Amenities"];
        let categoryProps = categories.map(c => c);

        return categories.map(c => Category(c));
    }
}



class Category{
    constructor(id, name, description, 
                subcategories, 
                color, low, high){
        this.id = id;
        this.name = name? name : " ";
        this.description = description? description : "";
        this.subcategories = subcategories? subcategories : [];
        this.color = color? color : "";
        this.low = low ? low : "Low";
        this.high = high ? high : "High";
    }
}

