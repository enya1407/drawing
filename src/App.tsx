import React, { useState } from "react";
import drawing from "../src/image/обмерочный-чертеж.jpg";
import lock from "../src/image/lock.svg";
import "./App.css";
import DrawPane from "./DrawPane";
import { Layer, Line, Rect, Stage, Shape } from "react-konva";
import { Button, Switch } from "antd";
import { KonvaEventObject } from "konva/types/Node";

const App = () => {
  type ElementType = {
    start: boolean;
    points: Array<Array<number>>;
    end: boolean;
  };

  const [elements, setElements] = useState<Array<ElementType>>([]);
  const [selectedElementIndex, setSelectedElementIndex] = useState<
    Array<number>
  >([]);
  const [drawingMode, setDrawingMode] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(1);
  let stage: any = null;

  const setStageRef = (ref: any) => {
    if (ref) {
      stage = ref;
    }
  };

  const getScaledPoint = (stage: any, scale: any) => {
    const { x, y } = stage.getPointerPosition();
    return { x: x / scale, y: y / scale };
  };

  const onMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (drawingMode) {
      if (
        elements[elements.length - 1]?.start &&
        !elements[elements.length - 1]?.end
      ) {
        const { x, y } = getScaledPoint(stage, scale);
        setElements([
          ...elements.slice(0, -1),
          {
            ...elements[elements.length - 1],
            points: [...elements[elements.length - 1].points, [x, y]],
          },
        ]);
      } else {
        const { x, y } = getScaledPoint(stage, scale);
        setElements([
          ...elements,
          { start: true, points: [[x, y]], end: false },
        ]);
        setDrawingMode(true);
      }
    } else {
      const { id } = e.target.attrs;
      if (id?.toString().includes("shape")) {
        const targetIndex: number = Number(id.split("-")[1]);
        if (selectedElementIndex?.includes(targetIndex)) {
          setSelectedElementIndex([
            ...selectedElementIndex?.filter(
              (el, i) => selectedElementIndex[i] !== targetIndex
            ),
          ]);
        } else if (!selectedElementIndex.length) {
          setSelectedElementIndex([targetIndex]);
        } else {
          setSelectedElementIndex([...selectedElementIndex, targetIndex]);
        }
      }
    }
  };
  const handlerPressingTheLock = () => {
    setElements([
      ...elements.slice(0, -1),
      {
        ...elements[elements.length - 1],
        end: true,
      },
    ]);
  };

  const handlerForNullify = () => {
    setElements([]);
  };

  const handlerRorRollbackOneStep = () => {
    if (drawingMode && !elements[elements.length - 1]?.end) {
      if (elements[elements.length - 1].points.length < 2) {
        setElements([...elements.slice(0, -1)]);
      } else {
        setElements([
          ...elements.slice(0, -1),
          {
            ...elements[elements.length - 1],
            points: [...elements[elements.length - 1].points.slice(0, -1)],
          },
        ]);
      }
    }
  };

  const handlerDeleteElement = () => {
    setElements([
      ...elements.filter((el, i) => !selectedElementIndex?.includes(i)),
    ]);
    setSelectedElementIndex([]);
  };
  const handlerDrawingMode = () => {
    if (selectedElementIndex) {
      setSelectedElementIndex([]);
    }
    if (
      elements[elements.length - 1]?.start &&
      !elements[elements.length - 1]?.end
    ) {
      setElements([
        ...elements.slice(0, -1),
        {
          ...elements[elements.length - 1],
          end: true,
        },
      ]);
    }
    setDrawingMode(!drawingMode);
  };

  const styleLock =
    drawingMode &&
    elements[elements.length - 1]?.start &&
    !elements[elements.length - 1]?.end
      ? {
          top: elements[elements.length - 1].points[0][1] + 40,
          left: elements[elements.length - 1].points[0][0] + 40,
        }
      : { display: "none" };
  return (
    <div className="main-layout">
      <div className="panelWithButtons">
        <Button
          type="primary"
          disabled={!drawingMode || !elements[elements.length - 1]?.start}
          onClick={handlerForNullify}
          className="button"
        >
          заново
        </Button>
        <Button
          type="primary"
          disabled={
            !drawingMode ||
            elements[elements.length - 1]?.end ||
            !elements[elements.length - 1]?.start
          }
          onClick={handlerRorRollbackOneStep}
          className="button"
        >
          назад
        </Button>
        <Button
          type="primary"
          disabled={!selectedElementIndex.length}
          onClick={handlerDeleteElement}
          className="button"
        >
          удалить
        </Button>
        <Switch
          checked={drawingMode}
          checkedChildren="рисуем"
          unCheckedChildren="двигаем"
          onChange={() => handlerDrawingMode()}
        />
      </div>
      <Stage
        ref={setStageRef}
        className="konva-container"
        width={window.innerWidth - 200}
        height={window.innerHeight}
        style={{
          backgroundImage: `url(${drawing})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onMouseDown={(e) => onMouseDown(e)}
      >
        <Layer>
          {elements.map((el, index) => {
            const fillColor = el.end ? "#80808021" : "#11ffee00";
            return (
              <Shape
                id={`shape-${index}`}
                sceneFunc={(context, shape) => {
                  context.beginPath();
                  el.points.map((el) => {
                    context.lineTo(el[0], el[1]);
                  });
                  if (el.end) {
                    context.closePath();
                  }
                  context.fillStrokeShape(shape);
                }}
                fill={fillColor}
                stroke={
                  !drawingMode && selectedElementIndex?.includes(index)
                    ? "red"
                    : "blue"
                }
                strokeWidth={0.5}
                draggable={!drawingMode}
              />
            );
          })}
        </Layer>
      </Stage>
      <img
        src={lock}
        width={20}
        className="lock"
        onClick={handlerPressingTheLock}
        style={styleLock}
      ></img>
    </div>
  );
};

export default App;
