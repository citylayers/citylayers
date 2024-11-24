// import { CLASSNAMES } from "../../classnames";
import { CButton } from "./cbutton";
// import {CElement} from "./celement";
import {CityLayersPanel} from "../panel/citylayerspanel";

class PinButton extends CButton {
    
    constructor(parent:string) {
        super(parent, "");
        this.name = "pinButton";
        this.content = "Add a pin";
    }

    initiate() {
        var element = document.createElement("button");
        element.innerHTML = this.content;
        element.setAttribute('class', "" + this.name + " primary-button");
        element.setAttribute("id", this.make_id());
        this.getParent().appendChild(element);
        element.addEventListener("click", () => {
            let coords = CityLayersPanel.getCoords();
            window.location.href = `/pin?lat=${coords.lat}&lng=${coords.lon}`;
        });
    }
}

export {PinButton};