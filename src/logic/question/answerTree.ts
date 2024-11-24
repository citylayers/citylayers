

class AnswerTree{
    content: Map<string, string | number>
    constructor(){
        this.content = new Map();
    }

    make(){
        
    }

    addAnswer(q:string, a:string | number){
        // q - elementId
        // a - value
            this.content.set(q, a);
        }
        
    getAnswer(id:string){
        return this.content.get(id) ? this.content.get(id) : undefined;
    }
}

export {AnswerTree}