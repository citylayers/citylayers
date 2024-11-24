

class AnswerTree{
    constructor(){
        this.content = new Map();
    }

    make(){
        
    }

    addAnswer(q, a){
        // q - elementId
        // a - value
            this.content.set(q, a);
        }
        
    getAnswer(id){
        return this.content.get(id) ? this.content.get(id) : undefined;
    }

    out(){
        
        let a = Object.fromEntries(this.content);
        return Object.entries(a).filter(c=>c[0]!="image").map(c=>{return Object({
            id: c[0], value: c[1]}
        )
    });
    }

}