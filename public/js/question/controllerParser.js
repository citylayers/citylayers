class ControllerParser extends Parser{

    static content = new Map([
        [ANSWERS.RANGE, (node)=>{return ControllerRange.fromNode(node)}],
        [ANSWERS.BOOL, (node)=>{return ControllerBool.fromNode(node)}],
        [ANSWERS.CATEGORY, (node)=>{return ControllerCategorical.fromNode(node)}],
        [ANSWERS.IMAGE, (node)=>{return ControllerImage.fromNode(node)}],
        [ANSWERS.TEXT, (node)=>{return ControllerText.fromNode(node)}],
        [ANSWERS.MULTICATEGORY, (node)=>{return ControllerMultiCategorical.fromNode(node)}],

    ])

    static make(inp, args){
        let e = ControllerParser.content.get(inp);
        return new e(args);        
    }

    static fromNode(node){
        let e = ControllerParser.content.get(node.type);
        return e(node);
        
    }
}