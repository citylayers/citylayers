import { Parser } from "./parser";
import { Partner } from "../../../logic/partner";

class PartnerParser extends Parser{

    static make(partnerInput:any){
        return new Partner(partnerInput.name, 
                            partnerInput.image, partnerInput.link);
        
    }
}

export {PartnerParser}