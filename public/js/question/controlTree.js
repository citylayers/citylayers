

class ControlTree extends AnswerTree{
    constructor(){
        super();
    }

    make(){
        
    }

    add(q, a){
        // q - elementId
        // a - value
        if (a instanceof Map){
            if (this.content.get(q) == undefined){
                 this.content.set(q, new Map()); 
            }
            Object(a).entries().forEach((k, v)=>{
                this.content.get(q).set(k, v)});
        }
        this.content.set(q, a);

        pubsub.publish(this.out());
    }

    clear(){
        this.content = new Map();
        pubsub.publish(this.out());
    }

    remove(q){
        if (this.content.has(q)){
            this.content.delete(q);
        }
        pubsub.publish(this.out());
        
    }
}