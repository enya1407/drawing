import React, { useEffect, useState } from "react";
import drawing from "../../image/обмерочный-чертеж.jpg";
import lock from "../../image/lock.svg";
import style from "./FloorPlans.module.css";
import { Layer, Line, Rect, Stage, Shape, Transformer } from "react-konva";
import { Button, Form, Switch } from "antd";
import { KonvaEventObject } from "konva/types/Node";
import ShapeDrawing from "./ShapeDrawing";

const FloorPlans = () => {
  type ElementType = {
    start: boolean;
    points: Array<Array<number>>;
    end: boolean;
  };

  const [cursorCoordinates, setCursorCoordinates] = useState<number[] | null>(
      null
  );
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

  const onMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    setCursorCoordinates([e.evt.clientX, e.evt.clientY]);
  };

  const handlerPressingTheLock = () => {
    setElements([
      ...elements.slice(0, -1),
      {
        ...elements[elements.length - 1],
        end: true,
      },
    ]);
    setDrawingMode(false);
  };

  const handlerPressingFirstPoint = (index: number) => {
    if (index === 0) {
      setElements([
        ...elements.slice(0, -1),
        {
          ...elements[elements.length - 1],
          end: true,
        },
      ]);
      setDrawingMode(false);
    }
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
            top: elements[elements.length - 1].points[0][1] + 233,
            left: elements[elements.length - 1].points[0][0] + 60,
            cursor: "pointer",
          }
          : { display: "none" };

  const styleRound = (index: number) => {
    const style =
        drawingMode &&
        elements[elements.length - 1]?.start &&
        !elements[elements.length - 1]?.end
            ? {
              top: elements[elements.length - 1].points[index][1] + 233,
              left: elements[elements.length - 1].points[index][0] + 60,
            }
            : { display: "none" };
    return index === 0
        ? { ...style, backgroundColor: "red", cursor: "pointer" }
        : style;
  };

  const konvaContainerStyle = drawingMode
      ? style.konvaContainer
      : `${style.figureMovementMode} ${style.konvaContainer}`;

  return (
      <div className={style.mainLayout}>
        <div className={style.panelWithButtons}>
          <Button
              type="primary"
              disabled={!drawingMode || !elements[elements.length - 1]?.start}
              onClick={handlerForNullify}
              className={style.button}
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
              className={style.button}
          >
            назад
          </Button>
          <Button
              type="primary"
              disabled={!selectedElementIndex.length}
              onClick={handlerDeleteElement}
              className={style.button}
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
            className={konvaContainerStyle}
            width={window.innerWidth - 100}
            height={window.innerHeight}
            style={{
              backgroundImage: `url(${drawing})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
            onMouseDown={(e) => onMouseDown(e)}
            onMouseMove={(e) => onMouseMove(e)}
        >
          <Layer>
            {cursorCoordinates && drawingMode && (
                <React.Fragment>
                  <Line
                      x={0}
                      y={cursorCoordinates[1] - 233}
                      points={[0, 0, window.innerWidth, 0]}
                      stroke="blue"
                      strokeWidth={0.5}
                      dash={[3, 3]}
                  />
                  <Line
                      x={cursorCoordinates[0] - 60}
                      y={0}
                      points={[0, window.innerHeight, 0, 0]}
                      stroke="blue"
                      strokeWidth={0.5}
                      dash={[3, 3]}
                  />
                  {elements[elements.length - 1]?.start &&
                  !elements[elements.length - 1]?.end && (
                      <Line
                          points={[
                            elements[elements.length - 1].points[
                            elements[elements.length - 1].points.length - 1
                                ][0],
                            elements[elements.length - 1].points[
                            elements[elements.length - 1].points.length - 1
                                ][1],
                            cursorCoordinates[0] - 60,
                            cursorCoordinates[1] - 233,
                          ]}
                          stroke="blue"
                          strokeWidth={1}
                          dash={[10, 5]}
                      />
                  )}
                </React.Fragment>
            )}
            {elements.map((el, index) => {
              return (
                  <ShapeDrawing
                      key={index}
                      index={index}
                      shapeEl={el}
                      isSelected={selectedElementIndex.length > 0}
                      drawingMode={drawingMode}
                      selectedElementIndex={selectedElementIndex}
                      setSelectedElementIndex={setSelectedElementIndex}
                      onChange={(newAttrs: any) => {
                        const rects = elements.slice();
                        rects[index] = newAttrs;
                        setElements(rects);
                      }}
                  />
              );
            })}
          </Layer>
        </Stage>
        <img
            src={lock}
            width={20}
            className={style.lock}
            onClick={handlerPressingTheLock}
            style={styleLock}
        ></img>
        {elements[elements.length - 1] &&
        elements[elements.length - 1].points.map((el, index) => {
          return (
              <div
                  className={style.round}
                  style={styleRound(index)}
                  key={index}
                  onClick={() => handlerPressingFirstPoint(index)}
              ></div>
          );
        })}
      </div>
  );
};

export default FloorPlans;
