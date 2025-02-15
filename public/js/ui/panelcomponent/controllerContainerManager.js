
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
        [VIS.GRADIENT, [ACTIVE_CONTROLS.SWITCH, ACTIVE_CONTROLS.GRADIENT]],
        [VIS.ELEMENTS, [ACTIVE_CONTROLS.SWITCH, ACTIVE_CONTROLS.RANGE, ACTIVE_CONTROLS.TAGS]]
        ]
    );

    static getAll(){
        return Object.values(ACTIVE_CONTROLS);
    }

    static show(control, hide){
        let dsp = control == ACTIVE_CONTROLS.GRADIENT ? DISPLAY.GRID : DISPLAY.FLEX;
        [...document.getElementsByClassName(control)].forEach(element => {
            element.style.display = hide==true ? DISPLAY.NONE : dsp;
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