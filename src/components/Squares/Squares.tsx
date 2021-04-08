import React, { useState } from "react";
import { Button, Form, Row, Col } from "antd";
import { DownOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import style from "./Squares.module.css";
import FieldSquares from "./FieldSquares";
import { FormListFieldData } from "antd/lib/form/FormList";

interface PropType {
  form: any;
}
interface SquarePropType {
  form: any;
  blockIndex: any;
  floorIndex: any;
  fields: FormListFieldData[];
  add: any;
  remove: any;
  block: any;
  floor: any;
}

const Squares = ({ form }: PropType) => {
  const blocksAndFloors = form.getFieldValue(`blocks`);

  return (
    <div className={style.wrapper}>
      {blocksAndFloors &&
        blocksAndFloors.map((block: any, blockIndex: number) => {
          if (block?.floors) {
            return block.floors?.map((floor: any, floorIndex: number) => (
              <Form.List name={[`squares`, blockIndex, floorIndex]}>
                {(fields, { add, remove }) => (
                  <Sqwuare
                    form={form}
                    blockIndex={blockIndex}
                    floorIndex={floorIndex}
                    fields={fields}
                    add={add}
                    remove={remove}
                    block={block}
                    floor={floor}
                  ></Sqwuare>
                )}
              </Form.List>
            ));
          }
        })}
    </div>
  );
};

const Sqwuare = ({
  form,
  blockIndex,
  floorIndex,
  fields,
  add,
  remove,
  block,
  floor,
}: SquarePropType) => {
  const [visible, setVisible] = useState<boolean>(true);

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
          <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
            Добавить площадь
          </Button>
        </Form.Item>
      </Row>
      {visible && (
        <>
          <Row style={{ marginBottom: 35 }}>
            <Col span={1}></Col>
            <Col span={3}>Название</Col>
            <Col span={3}>Тип помещения</Col>
            <Col span={3}>Площадь</Col>
            <Col span={3}>Собственник</Col>
            <Col span={4}>Вспомогательная площадь</Col>
            <Col span={4}>Первоначальная стоимость</Col>
            <Col span={3}></Col>
          </Row>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <FieldSquares
              key={key}
              name={name}
              restField={restField}
              remove={remove}
              form={form}
              floor={floor}
              blockIndex={blockIndex}
              floorIndex={floorIndex}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Squares;
