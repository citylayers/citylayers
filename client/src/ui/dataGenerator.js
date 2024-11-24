class Randomizer{

    static randomToRange(lower, upper){
        return lower + (Math.random() * (upper - lower));
    }

    static randomFromArray(arr){
        return arr[Math.floor(this.randomToRange(0, arr.length-1))];
    }

}
class GradeGenerator{
    static goodLower = 0.7;
    static goodUpper = 1.0;
    static badLower = 0.0;
    static badUpper = 0.30;

    static catKey = "category_id";
    static gradeKey = "grade";
    static idKey = "id";
    
    static grade(category, value, id){
        let d = new Object();
        d[this.catKey] = category;
        d[this.gradeKey] = parseInt(value);
        d[this.idKey] = parseInt(id);
        return d;
    }

    static goodGrade(category){
        return this.grade(category, Randomizer.randomToRange(this.goodLower, this.goodUpper) * 100);
    }
    static badGrade(category){
        return this.grade(category, Randomizer.randomToRange(this.badLower, this.badUpper) * 100);
    }
    static anyGrade(category){
        return this.grade(category, Randomizer.randomToRange(this.badLower, this.goodUpper) * 100);
    }
}

class DataGenerator{

    static lat = 59.30903679229989
    static lng = 18.035872608321115

    static lat_range = 0.008;
    static lng_range = 0.08;
    

    static latKey = "lat";
    static lngKey = "lng";
    static idKey = "id";

    // stab data for stockholm Södermalm

    static make(lat, lng, id){
        // function that generates a point in a standard format for this class
        // given coordinates
        let p = {};
        p[this.latKey] = lat;
        p[this.lngKey] = lng;
        p[this.idKey] = id;
        return p;
    }

    static placePoint(point){
        
        // point is expected as {"lat": Math.random(), "lng": Math.random}
        return this.make(
            this.lat + point[this.latKey] * this.lat_range,
            this.lng + point[this.lngKey] * this.lng_range,
            point[this.idKey]
        )
    }

    static generatePoint(id){
        id = id==undefined ? 0 : id;
        return this.placePoint(this.make(Math.random(), Math.random(), id));
    }
    
    static generate(amount){
        return Array.from({length: amount}, 
            (v, i) => {
                return this.generatePoint(i)
        });
    }
}

class OPINIONS{
    GOOD = 0
    BAD = 1
    ANY = 2
}

class ObservationGenerator{

    static idKey = "id";
    static ptKey = "pt";
    static gradeKey = "grade";

    static _observation(pt, grades){
        // function that generates an observation in a standard format for this class
        // given coordinates and grade
        
        let p = {};
        p[this.ptKey] = pt;
        p[this.idKey] = pt.id;
        p[this.gradeKey] = grades;
        return p;
    }

    static make(places, grades){
        let pts = places.map(pt => DataGenerator.make(parseFloat(pt["latitude"]), 
                                                      parseFloat(pt["longitude"]), 
                                                      pt["id"]));
        // grades = grades.map(g => GradeGenerator.grade(parseInt(g["category_id"]), parseInt(g["grade"])));
        
        return pts.map(pt => this._observation(pt, grades.filter(g => g.place_id==pt.id).map(g=>
            GradeGenerator.grade(parseInt(g["category_id"]), parseInt(g["grade"]), parseInt(g["id"]))
        )
    ));

    }

    static generate(amount, category, opinion){
        let pts = DataGenerator.generate(amount);
        
        if (opinion==OPINIONS.GOOD){
            return pts.map(p=>this._observation(p, [GradeGenerator.goodGrade(category)]));
        }
        else if (opinion==OPINIONS.BAD){
            return pts.map(p=>this._observation(p, [GradeGenerator.badGrade(category)]));
        }
        else{
            return pts.map(p=>this._observation(p, [GradeGenerator.anyGrade(category)]));
        }
    }
}


class CommentAssigner{
    static commentKey = "comment";

    static generate(observations, comments){
        observations.forEach(ob => {
            ob[this.commentKey] = [];
            if (Math.random() > 0.5){
                ob[this.commentKey] = [Randomizer.randomFromArray(comments)];
            }
        });
    }

    static make(observations, comments){
        observations.forEach(ob => {
            ob[this.commentKey] = [];
            ob[this.commentKey] = comments.filter(comment => comment.place_id==ob.id);
            
        });
    }
}

class SubcatAssigner{
    static subcatKey = "subcat";

    static generate(observations, subcategories){
        observations.forEach(ob => {
            ob[this.subcatKey] = undefined;
            if (Math.random() > 0.5){
                ob[this.subcatKey] = [Randomizer.randomFromArray(subcategories)];
            }
        });
    }

    static make(observations, subcategories){
        observations.forEach(ob => {
            ob[this.subcatKey] = [];
            ob[this.subcatKey] = subcategories.filter(s => ob[ObservationGenerator.gradeKey].map(g=>g.id).includes(s.grade_id));
        });
    }
}