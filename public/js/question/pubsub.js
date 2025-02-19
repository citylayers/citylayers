

class PubSub{

    constructor(){
        // this is where we maintain list of subscribers for our PubSub
        this.subscribers = [];
      }
    
      subscribe(subscriber){
        if(typeof subscriber !== 'function'){
            throw new Error(`${typeof subscriber} is not a valid argument for subscribe method, expected a function instead`);
          }
        this.subscribers = [...this.subscribers, subscriber];
      }
    
      unsubscribe(subscriber){
        if(typeof subscriber !== 'function'){
            throw new Error(`${typeof subscriber} is not a valid argument for unsubscribe method, expected a function instead`);
        }
        this.subscribers = this.subscribers.filter(sub => sub!== subscriber);
      }
    
      publish(payload){
       // publish payload to existing subscribers by invoking them
        this.subscribers.forEach(subscriber => subscriber(payload));
      }
}