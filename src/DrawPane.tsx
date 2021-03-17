import React, { useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import DrawToolbar from "./DrawToolbar";
import drawing from "./image/обмерочный-чертеж.jpg";

const getScaledPoint = (stage:any, scale:any) => {
    const { x, y } = stage.getPointerPosition();
    return { x: x / scale, y: y / scale };
};
type Proptype={
    width: number,
    height: number
}
type LineType ={
    points:Array<number>,
    color:string
}
const DrawPane = (props:Proptype) => {
    let stage:any = null;
    const [color, setColor] = useState<string>("DARK");
    const [scale, setScale] = useState<number>(1);
    const [currentLine, setCurrentLine] = useState<LineType|null>(null);
    const [lines, setLines] = useState<any>([]);

    const onMouseDown = () => {
        const { x, y } = getScaledPoint(stage, scale);
        setCurrentLine({ points: [x, y], color });
    };

    const onMouseMove = () => {
        if (currentLine) {
            const { x, y } = getScaledPoint(stage, scale);
            const [x0, y0] = currentLine.points;
              setCurrentLine({
                        ...currentLine,
                        points: [x0, y0, x, y]
                    });

        }
    };

    const onMouseUp = () => {
        const { x, y } = getScaledPoint(stage, scale);
        setCurrentLine(null);
        setLines([
            ...lines,
            { ...currentLine, points: [...currentLine!.points, x, y] }
        ]);
    };

    const setStageRef = (ref:any) => {
        if (ref) {
            stage = ref;
        }
    };

    const onChangeScale = (delta:any) => {
        setScale(scale + delta);
    };

    return (
        <div className="main-layout">
            <DrawToolbar
                scale={scale}
                onChangeScale={onChangeScale}
            />
            <Stage
                ref={setStageRef}
                className="konva-container"
                style={{backgroundImage: `url(${drawing})`}}
                width={props.width * scale}
                height={props.height * scale}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
            >

                <Layer >
                    <img src={drawing} className="image" />
                    {/*<Line*/}
                    {/*    {...currentLine}*/}
                    {/*    scale={{ x: scale, y: scale }}*/}
                    {/*    strokeWidth={1}*/}
                    {/*    stroke={COLOR_MAP[color]}*/}
                    {/*/>*/}
                    {lines.map((line:any, index:any) => (
                        <Line
                            key={index}
                            {...line}
                            scale={{ x: scale, y: scale }}
                            strokeWidth={1}
                            stroke={"black"}
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
};



export default DrawPane;
