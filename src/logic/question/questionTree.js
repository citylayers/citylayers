class Level{
    constructor(name, questions){
        this.name = name;
        this.content = questions;
    }
}

class Aspect{
    constructor(name, levels){
        this.name = name;
        this.content = levels;
    }
}

class QuestionTree{
    constructor(content){
        this.content = content;  // list of aspects
        /*
        {
            aspect1 : {
                1 : [],
                2 : {
                    qid : []
                }
            }
        }
        */
    }

    make(){
        
    }


    getChildren(question){
        return this.content.get(question) ? this.content.get(question) : [];
    }

    getParent(question){
        let qs = this.content.keys().filter(k=>k.id==question.id);
        return qs.length>0 ? qs[0] : null;
    }
}