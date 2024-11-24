const ANSWERS = {
    RANGE: "range",
    BOOL: "bool",
    CATEGORY: "category",
    IMAGE: "image",
    TEXT: "comment",
    MULTICATEGORY: "multicategory",
}

class Parser{

    
    static make(inp, arg){
        return ;
    }

    static makeAll(inp, arg){
        if (inp.original==undefined){
            return inp.map(i => this.make(i, arg));
        }
        return [];
    }
}

class AnswerParser extends Parser{

    static content = new Map([
        [ANSWERS.RANGE, (node)=>{return AnswerRange.fromNode(node)}],
        [ANSWERS.BOOL, (node)=>{return AnswerBool.fromNode(node)}],
        [ANSWERS.CATEGORY, (node)=>{return AnswerCategorical.fromNode(node)}],
        [ANSWERS.IMAGE, (node)=>{return AnswerImage.fromNode(node)}],
        [ANSWERS.TEXT, (node)=>{return AnswerText.fromNode(node)}],
        [ANSWERS.MULTICATEGORY, (node)=>{return AnswerMultiCategorical.fromNode(node)}],

    ])

    static make(inp, args){
        let e = AnswerParser.content.get(inp);
        return new e(args);        
    }

    static fromNode(node){
        let e = AnswerParser.content.get(node.type);
        return e(node);
        
    }
}
