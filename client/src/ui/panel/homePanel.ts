import { CLASSNAMES} from "../../constants/ClassNames";
import {ContentPanel} from "./contentPanel";
import {LandingIllustration, GeneralContent} from "../panelcomponent/landing";
import { ProjectPanel } from "../component/projectComponent";
import { Project } from '../../../../src/logic/project';


class HomePanel extends ContentPanel{
    
    constructor(parent:string){
        super(parent, "id");
        this.name = CLASSNAMES.HOME_PANEL;
        this.elements = [LandingIllustration, GeneralContent, ProjectPanel]
    }

    load(projects:Project[]) {
        this.elements.forEach(el => {
            let element = new el(this.makeId(), "main");
            element.initiate();
            element.load(projects);
        });

    }
}

export {HomePanel}

