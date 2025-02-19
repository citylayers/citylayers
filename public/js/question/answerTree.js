

class AnswerTree{
    constructor(){
        this.content = new Map();
    }

    make(){
        
    }

    add(q, a){
        // q - elementId
        // a - value
            this.content.set(q, a);
        }
        
    get(id){
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