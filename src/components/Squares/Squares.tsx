import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Menu,
  Popover,
  Space,
  Input,
  Row,
  Col,
  Select,
} from "antd";
import {
  MenuUnfoldOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UpOutlined,
} from "@ant-design/icons";
import style from "./Squares.module.css";
import FieldSquares from "./FieldSquares";
import Floor from "../BlocksAndFloors/Block/Floor";

interface PropType {
  form: any;
}

const Squares = ({ form }: PropType) => {
  const blocksAndFloors = form.getFieldValue(`blocks`);
  console.log(blocksAndFloors);

  return (
    <div className={style.wrapper}>
      {blocksAndFloors &&
        blocksAndFloors.map((block: any) => {
          if (block?.floors) {
            return block.floors?.map((floor: any) => (
              <Form.List name="squares">
                {(fields, { add, remove }) => (
                  <>
                    <Row>
                      <UpOutlined style={{ marginRight: 25 }} />
                      <div style={{ marginRight: 50 }}>
                        {" "}
                        Блок {block?.block}
                      </div>
                      <div style={{ marginRight: 50 }}>
                        {" "}
                        Этаж {floor?.floor}
                      </div>
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Добавить площадь
                        </Button>
                      </Form.Item>
                    </Row>
                    <Row>
                      <Col>Название</Col>
                      <Col>Тип помещения</Col>
                      <Col>Площадь</Col>
                      <Col>Сщбственник</Col>
                      <Col>Вспомогательная площадь</Col>
                      <Col>Первоначальная стоимость</Col>
                    </Row>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <FieldSquares
                        key={key}
                        i={key}
                        name={name}
                        restField={restField}
                        remove={remove}
                        form={form}
                        floor={floor}
                      />
                    ))}
                  </>
                )}
              </Form.List>
            ));
          }
        })}
    </div>
  );
};

export default Squares;
