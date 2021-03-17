import React, {useState} from 'react';
import drawing from '../src/image/обмерочный-чертеж.jpg';
import lock from '../src/image/lock.svg';
import './App.css';
import DrawPane from "./DrawPane";
import {Layer, Line, Rect, Stage,Shape} from "react-konva";
import Konva from "konva"



const App = () => {


    const [line,setLine]=useState<Array<Array<number>>>([[]])
    const [firstPoint,setFirstPoint]=useState<Array<number>|null>(null)
    const[drawingMode,setDrawingMode]=useState<boolean>(true)
    const [scale, setScale] = useState<number>(1);
    let stage:any = null;

    const getScaledPoint = (stage:any, scale:any) => {
        const { x, y } = stage.getPointerPosition();
        return { x: x / scale, y: y / scale };
    };

    const onMouseDown = () => {
        if(drawingMode){
            const { x, y } = getScaledPoint(stage, scale);
            if(firstPoint){
                setLine([...line,[x,y]])
            }else{
                setFirstPoint([x,y])
                setLine([[x,y]])
            }
        }else{
            console.log("не рисуем")
        }
    };


    const handlerForNullify=()=>{
        setLine([[]])
        setFirstPoint(null)
        setDrawingMode(true)
    }
    const handlerRorRollbackOneStep=()=>{
        console.log(line.length)
        if(line.length < 2 &&drawingMode){
            console.log(1)
            setLine([[]])
            setFirstPoint(null)
            setDrawingMode(true)
        } else if(firstPoint&&drawingMode){
            setLine((prev) => {
                const next = [...prev];
                next.pop();
                return next;
            });
        }

    }
    const figureDrawn=()=>{
        setDrawingMode(false)
    }
    const setStageRef = (ref:any) => {
        if (ref) {
            stage = ref;
        }
    };
const styleLock = firstPoint&&drawingMode ?{top:line[0][1]+40,left:line[0][0]+40}: {display: "none"}
const fillShape = drawingMode?"#11ffee00":"#80808021"
  return (
      <div className="main-layout">
    <div className="panelWithButtons">
        <button onClick={handlerForNullify } className="button">заново</button>
        <button onClick={handlerRorRollbackOneStep}>назад</button></div>
         <Stage ref={setStageRef}
                className="konva-container"
             width={window.innerWidth-200}
             height={window.innerHeight}
             style={{backgroundImage: `url(${drawing})`,backgroundPosition: "center",backgroundRepeat: "no-repeat"}}
                onMouseDown={onMouseDown}>
          <Layer>
              <Shape
                  sceneFunc={(context, shape) => {
                      context.beginPath();
                      line.map((el)=>{
                          context.lineTo(el[0],el[1]);
                      })
                      if(!drawingMode){
                          context.closePath();
                      }
                      context.fillStrokeShape(shape);
                  }}
                  fill={fillShape}
                  stroke="black"
                  strokeWidth={2}
                  draggable
              />
          </Layer>

          </Stage>
          <img src={lock} width={20} className="lock"
               onClick={figureDrawn}
          style={styleLock}></img>
      </div>
  );
}

export default App;
