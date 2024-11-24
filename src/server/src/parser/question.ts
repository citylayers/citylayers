import { Answer, AnswerBool, AnswerCategorical, 
    AnswerImage, AnswerRange, 
    AnswerMultiCategorical, AnswerText } from "../../../logic/question/question";
import {Parser} from "./parser";


const ANSWERS = {
    RANGE: "range",
    BOOL: "bool",
    CATEGORY: "category",
    IMAGE: "image",
    TEXT: "comment",
    MULTICATEGORY: "multicategory",
}

class AnswerParser extends Parser{

    static content: Map<string, (node:any)=>Answer> = new Map([
        [ANSWERS.RANGE, (node)=>{return AnswerRange.fromNode(node)}],
        [ANSWERS.BOOL, (node)=>{return AnswerBool.fromNode(node)}],
        [ANSWERS.CATEGORY, (node)=>{return AnswerCategorical.fromNode(node)}],
        [ANSWERS.IMAGE, (node)=>{return AnswerImage.fromNode(node)}],
        [ANSWERS.TEXT, (node)=>{return AnswerText.fromNode(node)}],
        [ANSWERS.MULTICATEGORY, (node)=>{return AnswerMultiCategorical.fromNode(node)}],

    ]);

    static make(inp:any, args:any){
        let e = AnswerParser.content.get(inp);
        return e(args);        
    }

    static fromNode(node:any){
        let e = AnswerParser.content.get(node.atype);

        return e(node);
        
    }
}


export {AnswerParser, ANSWERS}