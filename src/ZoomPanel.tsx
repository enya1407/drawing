import React, { useCallback } from "react";

type Proptype={
    scale: number
    onChangeScale: any;
}


function ZoomPanel(props:Proptype) {
    const zoomIn = useCallback(() => {
        if (props.scale < 3) {
            props.onChangeScale(0.25);
        }
    }, [props]);

    const zoomOut = useCallback(() => {
        if (props.scale > 0.25) {
            props.onChangeScale(-0.25);
        }
    }, [props]);

    return (
        <div className="zoom-panel">
            <div className="zoom-btn" onClick={zoomIn}>
                +
            </div>
            <div className="zoom-value">{props.scale * 100}%</div>
            <div className="zoom-btn" onClick={zoomOut}>
                -
            </div>
        </div>
    );
}



export default ZoomPanel;
