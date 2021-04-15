import React, { useState } from "react";
import { Button, Form, Row, Col } from "antd";
import { DownOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import style from "./Squares.module.css";
import FieldSquares from "./FieldSquares";
import { FormListFieldData } from "antd/lib/form/FormList";
import { AllDataType, squareStatusType } from "../../type";

interface PropType {
  form: any;
  currentData: any;
  squareStatus: squareStatusType;
  setSquareStatus: any;
}
interface SquarePropType {
  form: any;
  currentData: any;
  blockIndex: any;
  floorIndex: any;
  fields: FormListFieldData[];
  add: any;
  remove: any;
  block: any;
  floor: any;
  squareStatus: squareStatusType;
  setSquareStatus: any;
}

const Squares = ({
  form,
  currentData,
  squareStatus,
  setSquareStatus,
}: PropType) => {
  const blocksAndFloors = form.getFieldValue(`blocks`);

  return (
    <div className={style.wrapper}>
      {blocksAndFloors &&
        blocksAndFloors.map((block: any, blockIndex: number) => {
          if (block?.floors) {
            return block.floors?.map((floor: any, floorIndex: number) => {
              if (floor?.floor && floor?.cost)
                return (
                  <Form.List name={[`squares`, blockIndex, floorIndex]}>
                    {(fields, { add, remove }) => (
                      <Square
                        form={form}
                        currentData={currentData}
                        blockIndex={blockIndex}
                        floorIndex={floorIndex}
                        fields={fields}
                        add={add}
                        remove={remove}
                        block={block}
                        floor={floor}
                        squareStatus={squareStatus}
                        setSquareStatus={setSquareStatus}
                      ></Square>
                    )}
                  </Form.List>
                );
            });
          }
        })}
    </div>
  );
};

const Square = ({
  form,
  currentData,
  blockIndex,
  floorIndex,
  fields,
  add,
  remove,
  block,
  floor,
  squareStatus,
  setSquareStatus,
}: SquarePropType) => {
  const [visible, setVisible] = useState<boolean>(true);

  const addSquare = (add: any) => {
    add();
    setVisible(true);
  };

  return (
    <>
      <Row>
        {visible ? (
          <UpOutlined
            onClick={() => setVisible(false)}
            style={{ marginRight: 25 }}
          />
        ) : (
          <DownOutlined
            onClick={() => setVisible(true)}
            style={{ marginRight: 25 }}
          />
        )}
        <div style={{ marginRight: 50 }}> Блок {block?.block}</div>
        <div style={{ marginRight: 50 }}> Этаж {floor?.floor}</div>
        <Form.Item>
          <Button
            type="dashed"
            onClick={() => addSquare(add)}
            icon={<PlusOutlined />}
          >
            Добавить площадь
          </Button>
        </Form.Item>
      </Row>
      {visible && fields.length > 0 && (
        <>
          <Row style={{ marginBottom: 35 }}>
            <Col span={1}></Col>
            <Col span={3} className={style.title}>
              Название
            </Col>
            <Col span={3} className={style.title}>
              Тип помещения
            </Col>
            <Col span={3} className={style.title}>
              Площадь
            </Col>
            <Col span={3} className={style.title}>
              Собственник
            </Col>
            <Col span={4}>Вспомогательная площадь</Col>
            <Col span={4}>Первоначальная стоимость</Col>
            <Col span={3}></Col>
          </Row>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <FieldSquares
              currentData={currentData}
              key={key}
              name={name}
              restField={restField}
              remove={remove}
              form={form}
              floor={floor}
              blockIndex={blockIndex}
              floorIndex={floorIndex}
              squareStatus={squareStatus}
              setSquareStatus={setSquareStatus}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Squares;
