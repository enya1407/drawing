import React, { useEffect, useState } from "react";
import { Shape, Transformer } from "react-konva";
import style from "./AddingAreas.module.css";

type ElementType = {
  start: boolean;
  points: Array<Array<number>>;
  end: boolean;
};
interface propsType {
  shapeEl: ElementType;
  index: number;
  isSelected: boolean;
  drawingMode: boolean;
  selectedElementIndex: number[];
  setSelectedElementIndex: any;
  onChange: any;
}

const ShapeDrawing = ({
  shapeEl,
  index,
  isSelected,
  drawingMode,
  selectedElementIndex,
  setSelectedElementIndex,
  onChange,
}: propsType) => {
  const shapeRef: any = React.useRef();
  const trRef: any = React.useRef();

  // useEffect(() => {
  //   if (isSelected) {
  //     trRef.current.nodes([shapeRef.current]);
  //     trRef.current.getLayer().batchDraw();
  //   }
  // }, [isSelected]);
  //
  const click = () => {
    // console.log("clic", index);
    // if (selectedElementIndex?.includes(index)) {
    //   setSelectedElementIndex([
    //     ...selectedElementIndex?.filter(
    //       (el, i) => selectedElementIndex[i] !== index
    //     ),
    //   ]);
    // } else if (!selectedElementIndex.length) {
    //   setSelectedElementIndex([index]);
    // } else {
    //   setSelectedElementIndex([...selectedElementIndex, index]);
    // }
  };

  const fillColor = shapeEl.end ? "#80808021" : "#11ffee00";
  return (
    <React.Fragment>
      <Shape
        onClick={() => {
          click();
        }}
        id={`shape-${index}`}
        sceneFunc={(context, shape) => {
          context.beginPath();
          shapeEl.points.map((el) => {
            context.lineTo(el[0], el[1]);
          });
          if (shapeEl.end) {
            context.closePath();
          }
          context.fillStrokeShape(shape);
        }}
        fill={
          !drawingMode && selectedElementIndex?.includes(index)
            ? "#00000066"
            : "#80808021"
        }
        stroke="blue"
        strokeWidth={1}
        draggable={!drawingMode}
        dash={[10, 5]}
        // ref={shapeRef}
        // {...shapeEl}
        // onDragEnd={(e) => {
        //   onChange({
        //     ...shapeEl,
        //     x: e.target.x(),
        //     y: e.target.y(),
        //   });
        // }}
        // onTransformEnd={(e) => {
        //   const node = shapeRef.current;
        //
        //   console.log(node);
        //   const scaleX = node.scaleX();
        //   const scaleY = node.scaleY();
        //
        //   node.scaleX(1);
        //   node.scaleY(1);
        //   onChange({
        //     start: true,
        //     points: [
        //       [590, 387],
        //       [593, 447],
        //       [641, 425],
        //     ],
        //     end: true,
        //   });
        // }}
      />
      {/*{isSelected && (*/}
      {/*  <Transformer*/}
      {/*    ref={trRef}*/}
      {/*    boundBoxFunc={(oldBox, newBox) => {*/}
      {/*      if (newBox.width < 5 || newBox.height < 5) {*/}
      {/*        return oldBox;*/}
      {/*      }*/}
      {/*      return newBox;*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
    </React.Fragment>
  );
};
export default ShapeDrawing;
