
const ACTIVE_CONTROLS = {
    SWITCH : "categoryswitch",
    TAGS : "tagcontainer",
    RANGE : "categoryslider",
    COLOR : "color",
    GRADIENT : "gradient subcontainer",
}


class ControllerContainerManager{

    static getGlobalVis(){
        
        return globalvisualization.active;
    }

    static mapping = new Map([
        [VIS.HIGHLIGHT, [ACTIVE_CONTROLS.SWITCH,
                         ACTIVE_CONTROLS.RANGE,
                         ACTIVE_CONTROLS.COLOR]],
        [VIS.GRADIENT, [ACTIVE_CONTROLS.SWITCH, ACTIVE_CONTROLS.RANGE, ACTIVE_CONTROLS.GRADIENT]],
        [VIS.ELEMENTS, [ACTIVE_CONTROLS.SWITCH, ACTIVE_CONTROLS.RANGE, ACTIVE_CONTROLS.TAGS]]
        ]
    );

    static getAll(){
        return Object.values(ACTIVE_CONTROLS);
    }

    static show(control, hide){
        let dsp = control == ACTIVE_CONTROLS.GRADIENT ? DISPLAY.GRID : DISPLAY.FLEX;
        // For gradient subcontainer, need to find elements with both classes
        let elements = control === ACTIVE_CONTROLS.GRADIENT
            ? [...document.querySelectorAll('.gradient.subcontainer')]
            : [...document.getElementsByClassName(control)];

        elements.forEach(element => {
            if (hide) {
                element.style.display = DISPLAY.NONE;
            } else {
                // For gradient, remove inline style to let CSS take over, otherwise set explicit display
                if (control === ACTIVE_CONTROLS.GRADIENT) {
                    element.style.removeProperty('display');
                } else {
                    element.style.display = dsp;
                }
            }
        });
    }

    static offSwitch(){
        [...document.getElementsByClassName(ACTIVE_CONTROLS.SWITCH)].forEach(
            (sw) => {
                sw.children[0].checked = false;
                sw.children[0].onchange();
            }
        )
    }

    static update(){

        let vis = ControllerContainerManager.getGlobalVis();
        let active_controls = ControllerContainerManager.mapping.get(vis);
        ControllerContainerManager.offSwitch();
        ControllerContainerManager.getAll().forEach(control => {
            let hide = !active_controls.includes(control);
            ControllerContainerManager.show(control, hide)
        })
    }
}