import React from "react";
import ZoomPanel from "./ZoomPanel";


type Proptype={
    scale: number
    onChangeScale: any
}
function DrawToolbar(props:Proptype) {

    return (
        <div className="toolbar">
            <ZoomPanel scale={props.scale} onChangeScale={props.onChangeScale} />
        </div>
    );
}



export default DrawToolbar;
