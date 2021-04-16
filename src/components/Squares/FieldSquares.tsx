import React, { useEffect, useState } from "react";
import style from "./Squares.module.css";
import {
  Button,
  Col,
  Form,
  Input,
  Popover,
  Row,
  Select,
  Space,
  Switch,
} from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { squareStatusType } from "../../type";
const { Option } = Select;
interface PropType {
  currentData: any;
  name: any;
  restField: any;
  remove: any;
  form: any;
  floor: any;
  blockIndex: number;
  floorIndex: number;
  squareStatus: squareStatusType;
  setSquareStatus: any;
}

const FieldSquares = ({
  currentData,
  name,
  restField,
  remove,
  form,
  floor,
  blockIndex,
  floorIndex,
  squareStatus,
  setSquareStatus,
}: PropType) => {
  const [valueSaved, setValueSaved] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean | null>(null);
  const owner = form.getFieldValue(`owner`);

  const defaultValue =
    currentData?.squares &&
    currentData?.squares[blockIndex] &&
    currentData?.squares[blockIndex][floorIndex] &&
    currentData?.squares[blockIndex][floorIndex][name];

  const defaultCheckbox = defaultValue?.auxiliaryArea ? true : false;

  useEffect(() => {
    defaultValue && setValueSaved(true);
    defaultValue && setStatus(defaultCheckbox);
  }, []);

  const saveChangesHandler = (name: number) => {
    form
      .validateFields([
        [`squares`, blockIndex, floorIndex, name, `squareName`],
        [`squares`, blockIndex, floorIndex, name, `typeOfPremises`],
        [`squares`, blockIndex, floorIndex, name, `areaSize`],
        [`squares`, blockIndex, floorIndex, name, `owner`],
        [`squares`, blockIndex, floorIndex, name, `initialCost`],
      ])
      .then(() => {
        setValueSaved(true);

        const auxiliaryArea = form.getFieldValue([
          `squares`,
          blockIndex,
          floorIndex,
          name,
          `auxiliaryArea`,
        ]);

        if (auxiliaryArea === status) return;
        //меняем статус
        if (defaultValue || status !== null) {
          if (auxiliaryArea) {
            const newSquareStatus = {
              ...squareStatus,
              inaccessibleAreas: squareStatus.inaccessibleAreas + 1,
              freeAreas: squareStatus.freeAreas - 1,
            };
            setStatus(true);
            setSquareStatus(newSquareStatus);
          } else {
            const newSquareStatus = {
              ...squareStatus,
              freeAreas: squareStatus.freeAreas + 1,
              inaccessibleAreas: squareStatus.inaccessibleAreas - 1,
            };
            setStatus(false);
            setSquareStatus(newSquareStatus);
          }
          return;
        }
        //добавляем статус в первый раз
        if (auxiliaryArea) {
          const newSquareStatus = {
            ...squareStatus,
            inaccessibleAreas: squareStatus.inaccessibleAreas + 1,
          };
          setStatus(true);
          setSquareStatus(newSquareStatus);
        } else {
          const newSquareStatus = {
            ...squareStatus,
            freeAreas: squareStatus.freeAreas + 1,
          };
          setStatus(false);
          setSquareStatus(newSquareStatus);
        }
      });
  };

  const popoverContent = (name: any, remove: any) => {
    return !valueSaved ? (
      <div className={style.editing} onClick={() => remove(name)}>
        Удалить
      </div>
    ) : (
      <div>
        <div className={style.editing} onClick={() => setValueSaved(false)}>
          Изменить
        </div>
        <div className={style.editing} onClick={() => remove(name)}>
          Удалить
        </div>
      </div>
    );
  };

  return (
    <Row>
      <Col span={1} style={{ textAlign: "center" }}>
        <Popover content={() => popoverContent(name, remove)} trigger="click">
          <MenuUnfoldOutlined />
        </Popover>
      </Col>
      <Col span={3}>
        <Form.Item
          {...restField}
          name={[name, "squareName"]}
          rules={[{ required: true, message: "Введите название площади" }]}
        >
          {!valueSaved ? (
            <Input
              placeholder="Введите название площади"
              className={style.input}
            />
          ) : (
            <Input className={style.input} readOnly={true} bordered={false} />
          )}
        </Form.Item>
      </Col>
      <Col span={3}>
        <Form.Item
          {...restField}
          name={[name, "typeOfPremises"]}
          rules={[{ required: true, message: "Выберите тип помещения" }]}
        >
          {!valueSaved ? (
            <Select style={{ width: 150 }} placeholder="Выберите тип помещения">
              <Option value="Офис">Офис</Option>
              <Option value="Торговое">Торговое</Option>
              <Option value="Склад">Склад</Option>
              <Option value="Производственное">Производственное</Option>
              <Option value="Жилое">Жилое</Option>
              <Option value="Парковочное место">Парковочное место</Option>
              <Option value="Служебное">Служебное</Option>
              <Option value="Свободного назначения">Торговое</Option>
            </Select>
          ) : (
            <Input className={style.input} readOnly={true} bordered={false} />
          )}
        </Form.Item>
      </Col>
      <Col span={3}>
        <Form.Item
          {...restField}
          name={[name, "areaSize"]}
          rules={[{ required: true, message: "Введите площадь, м2" }]}
        >
          {!valueSaved ? (
            <Input
              placeholder="Введите площадь, м2"
              className={style.input}
              type="number"
            />
          ) : (
            <Input className={style.input} readOnly={true} bordered={false} />
          )}
        </Form.Item>
      </Col>
      <Col span={3}>
        <Form.Item
          {...restField}
          name={[name, "owner"]}
          rules={[{ required: true, message: "Выберите имя собственника" }]}
        >
          {!valueSaved ? (
            <Select
              style={{ width: 150 }}
              placeholder="Выберите имя собственника"
            >
              <Option value={owner}>{owner}</Option>
              <Option value="имя">имя</Option>
            </Select>
          ) : (
            <Input className={style.input} readOnly={true} bordered={false} />
          )}
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item {...restField} name={[name, "auxiliaryArea"]}>
          <Switch disabled={valueSaved} defaultChecked={defaultCheckbox} />
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item
          {...restField}
          name={[name, "initialCost"]}
          initialValue={floor.cost}
        >
          {!valueSaved ? (
            <Input className={style.input} type="number" />
          ) : (
            <Input className={style.input} readOnly={true} bordered={false} />
          )}
        </Form.Item>
      </Col>
      <Col span={3}>
        {!valueSaved && (
          <Button
            type="primary"
            className={style.button}
            onClick={() => saveChangesHandler(name)}
          >
            Сохранить
          </Button>
        )}
      </Col>
    </Row>
  );
};
export default FieldSquares;
