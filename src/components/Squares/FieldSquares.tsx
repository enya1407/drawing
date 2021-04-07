import React, { useEffect, useState } from "react";
import style from "./Squares.module.css";
import { Button, Form, Input, Popover, Select, Space } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
const { Option } = Select;
interface PropType {
  i: any;
  name: any;
  restField: any;
  remove: any;
  form: any;
  floor: any;
}
interface fieldType {
  existingField: number[];
  savedField: number[];
  floorsVisible: number[];
}

const FieldSquares = ({
  i,
  name,
  restField,
  remove,
  form,
  floor,
}: PropType) => {
  const [valueEnteredBlock, setValueEnteredBlock] = useState<fieldType>({
    existingField: [],
    savedField: [],
    floorsVisible: [],
  });

  const owner = form.getFieldValue(`owner`);

  const deleteButtonHandler = (name: any, remove: any) => {
    console.log(name);
    remove(name);

    const newExistingFieldArr = [...valueEnteredBlock.existingField];
    newExistingFieldArr.sort().pop();

    const newSavedFieldArr = [
      ...valueEnteredBlock.savedField.filter((el) => el !== name),
    ];
    newSavedFieldArr.map((el: number, i: number) => {
      if (el > name) {
        newSavedFieldArr[i] = el - 1;
      }
    });

    console.log(newSavedFieldArr);

    const newFloorsVisibleArr = [
      ...valueEnteredBlock.floorsVisible.filter((el) => el !== name),
    ];
    newFloorsVisibleArr.map((el: number, i: number) => {
      if (el > name) {
        newFloorsVisibleArr[i] = el - 1;
      }
    });

    setValueEnteredBlock({
      existingField: newExistingFieldArr,
      savedField: newSavedFieldArr,
      floorsVisible: newFloorsVisibleArr,
    });
  };
  const changeButtonHandler = (name: number) => {
    const newSavedFieldArr = valueEnteredBlock.savedField.filter(
      (el) => el !== name
    );
  };
  const saveChangesHandler = (key: number) => {
    const newSavedFieldArr = [...valueEnteredBlock.savedField, key];
    setValueEnteredBlock({
      ...valueEnteredBlock,
      savedField: newSavedFieldArr,
    });
  };
  const popoverContent = (name: any, remove: any) => {
    return (
      <div>
        <div
          className={style.editing}
          onClick={() => changeButtonHandler(name)}
        >
          Изменить
        </div>
        <div
          className={style.editing}
          onClick={() => deleteButtonHandler(name, remove)}
        >
          Удалить
        </div>
      </div>
    );
  };

  return (
    <Space
      key={i}
      style={{ display: "flex", marginBottom: 8 }}
      align="baseline"
    >
      <Popover content={() => popoverContent(name, remove)} trigger="click">
        <MenuUnfoldOutlined />
      </Popover>
      <Form.Item
        {...restField}
        name={[name, "squareName"]}
        rules={[{ required: true, message: "Missing first name" }]}
      >
        {!valueEnteredBlock.savedField.includes(name) ? (
          <Input
            placeholder="Введите название площади"
            className={style.input}
          />
        ) : (
          <Input className={style.input} readOnly={true} bordered={false} />
        )}
      </Form.Item>
      <Form.Item
        {...restField}
        name={[name, "typeOfPremises"]}
        rules={[{ required: true, message: "Missing last name" }]}
      >
        {!valueEnteredBlock.savedField.includes(name) ? (
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
      <Form.Item
        {...restField}
        name={[name, "areaSize"]}
        rules={[{ required: true, message: "Missing first name" }]}
      >
        {!valueEnteredBlock.savedField.includes(name) ? (
          <Input placeholder="Введите площадь, м2" className={style.input} />
        ) : (
          <Input className={style.input} readOnly={true} bordered={false} />
        )}
      </Form.Item>
      <Form.Item
        {...restField}
        name={[name, "owner"]}
        rules={[{ required: true, message: "Missing first name" }]}
      >
        {!valueEnteredBlock.savedField.includes(name) ? (
          <Select style={{ width: 150 }} defaultValue={owner}>
            <Option value={owner}>{owner}</Option>
          </Select>
        ) : (
          <Input className={style.input} readOnly={true} bordered={false} />
        )}
      </Form.Item>
      <Form.Item
        {...restField}
        name={[name, "auxiliaryArea"]}
        rules={[{ required: true, message: "Missing first name" }]}
      >
        <Input type="checkbox" />
        Вспомогательная площадь
      </Form.Item>
      <Form.Item
        {...restField}
        name={[name, "initialCost"]}
        rules={[{ required: true, message: "Missing first name" }]}
      >
        {!valueEnteredBlock.savedField.includes(name) ? (
          <Input defaultValue={floor.cost} className={style.input} />
        ) : (
          <Input className={style.input} readOnly={true} bordered={false} />
        )}
      </Form.Item>
      {!valueEnteredBlock.savedField.includes(name) && (
        <Button
          type="primary"
          className={style.button}
          onClick={() => saveChangesHandler(name)}
        >
          Сохранить
        </Button>
      )}
    </Space>
  );
};
export default FieldSquares;
