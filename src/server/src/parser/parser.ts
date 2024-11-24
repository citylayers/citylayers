

class Parser{

    
    static make(inp:any, arg:any){
        return ;
    }

    static makeAll(inp:any, arg:any){
        if (inp.original==undefined){
            return inp.map(i => this.make(i, arg));
        }
        return [];
    }
}
export {Parser};