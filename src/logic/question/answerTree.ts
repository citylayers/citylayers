

class AnswerTree{
    content: Map<string, string | number>
    constructor(){
        this.content = new Map();
    }

    make(){
        
    }

    add(q:string, a:string | number){
        // q - elementId
        // a - value
            this.content.set(q, a);
        }
        
    get(id:string){
        return this.content.get(id) ? this.content.get(id) : undefined;
    }
}

export {AnswerTree}